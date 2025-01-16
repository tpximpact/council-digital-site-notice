import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { PlanningApplication } from "../../../sanity/sanity.types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";
const token = process.env.SANITY_SECRET_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const clientWithToken = client.withConfig({
  token,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function sanityFetch<T>({
  query,
  params = {},
  config = {},
}: {
  query: string;
  params?: any;
  config?: any;
}): Promise<T> {
  return client.fetch<T>(query, params, config);
}

type sanityApplicationResponse = {
  results: {
    _id: string;
    applicationNumber: string;
    distance?: number;
  }[];
  total: number;
};

/**
 * Only return results that have the required fields
 * @todo && !(applicationStage.stage == "Consultation" && !defined(consultationDeadline))
 */
const requiredFields = `&& defined(applicationNumber) 
                        && (defined(name) || defined(address)) 
                        && defined(applicationStage) 
                        && defined(location.lat) 
                        && defined(location.lng)`;

/**
 * Used on the search page to fetch all active applications to be paginated through
 * @param offSet
 * @param itemsPerPage
 * @returns
 */
export async function getActiveApplications(
  offSet: number = 0,
  itemsPerPage?: number,
): Promise<sanityApplicationResponse> {
  try {
    const query = `{
        "results": *[_type == "planning-application" && isActive == true ${requiredFields} && !(_id in path("drafts.**"))] | order(_id) 
          ${itemsPerPage ? `[${offSet}...${offSet + itemsPerPage}]` : ""} {
            _id, 
            image_head, 
            name, 
            applicationNumber, 
            applicationName, 
            address
          },
        "total": count(*[_type == "planning-application" && isActive == true ${requiredFields} && !(_id in path("drafts.**"))])
      }`;

    const response = await sanityFetch<sanityApplicationResponse>({ query });
    return response;
  } catch (error) {
    throw new Error("Error fetching data from Sanity");
  }
}

/**
 * Used on show page to fetch a single active application by id
 * @param id
 * @returns
 */
export async function getApplicationById(id: string) {
  const query = `*[_type == "planning-application" && (_id == $_id || planningId == $_id) && isActive == true ${requiredFields}]`;
  const post = await client.fetch(query, { _id: id, planningId: id });

  return post;
}

/**
 * Used on the search page to fetch all active applications to be paginated through
 * Adds distance to the response
 * @todo distance isn't in the PlanningApplication type
 * @param offSet
 * @param location
 * @param itemsPerPage
 * @returns
 */
export async function getActiveApplicationsByLocation(
  offSet: number = 0,
  location: { latitude: number; longitude: number },
  itemsPerPage?: number,
): Promise<sanityApplicationResponse> {
  if (!location) {
    throw new Error("Valid location is required.");
  }

  try {
    const query = `{
        "results": 
        *[_type == "planning-application" && defined(location) && isActive == true ${requiredFields} && !(_id in path("drafts.**"))] | order(geo::distance(location, geo::latLng(${location.latitude}, ${location.longitude}))) ${itemsPerPage ? `[${offSet}...${offSet + itemsPerPage}]` : ""} 
           {
            _id, 
            image_head, 
            name, 
            applicationNumber, 
            applicationName, 
            address,
            "distance": geo::distance(location, geo::latLng(${location.latitude}, ${location.longitude}))
          },
        "total": count(*[_type == "planning-application" && defined(location) && isActive == true ${requiredFields} && !(_id in path("drafts.**"))]),
      }`;
    const response = await sanityFetch<sanityApplicationResponse>({ query });
    if (response.results) {
      response.results.forEach((result) => {
        if (result.distance) {
          // convert the distance of each distance from meters to miles
          result.distance = result.distance * 0.000621371192;
          result.distance = parseFloat(result.distance.toFixed(1));
        }
      });
    }
    return response;
  } catch (error) {
    throw new Error("Error fetching data from Sanity");
  }
}

export async function getGlobalContent() {
  const info = await client.fetch(
    '*[_type == "global-content"][0]',
    {},
    { next: { revalidate: 86400 } },
  );
  return info;
}

export async function createApplication(post: any) {
  const result = await clientWithToken.create(post);
  return result;
}

export async function updateApplication(_id: string, body: any) {
  const result = await clientWithToken
    .patch(_id)
    .set({ ...body })
    .commit();
  return result;
}

export async function checkExistingReference(
  applicationNumber: string,
): Promise<PlanningApplication | null> {
  const query =
    '*[_type == "planning-application" && applicationNumber == $applicationNumber]';
  const application = await client.fetch(query, { applicationNumber });
  return application ? application[0] : null;
}
