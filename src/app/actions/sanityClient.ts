import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";
const token = process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
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

export async function getActiveApplications(
  offSet: number = 0,
  itemsPerPage?: number,
): Promise<sanityApplicationResponse> {
  try {
    const query = `{
        "results": *[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))] | order(_id) 
          ${itemsPerPage ? `[${offSet}...${offSet + itemsPerPage}]` : ""} {
            _id, 
            image_head, 
            name, 
            applicationNumber, 
            applicationName, 
            address
          },
        "total": count(*[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))])
      }`;

    const response = await sanityFetch<sanityApplicationResponse>({ query });
    return response;
  } catch (error) {
    throw new Error("Error fetching data from Sanity");
  }
}

export async function getApplicationById(id: string) {
  const query =
    '*[_type == "planning-application" && (_id == $_id || planningId == $_id) && isActive == true]';
  const post = await client.fetch(query, { _id: id, planningId: id });

  if (process.env.NEXT_PUBLIC_DATA_PROVIDER == "OpenData") {
    // Then fetch the matching data from Camden's API
    const ids = post.map((development: any) => development.applicationNumber);
    const arrayToSoqlString = (arr: []) =>
      "'" + arr.toString().replace(/,/g, "','") + "'";
    let whereQuery = `application_number in(${arrayToSoqlString(ids)})`;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}.json?$where=${whereQuery}`,
    );
    const data = await res.json();

    //todo fixed for demo - this can be improved
    if (data.length == 0) {
      return post;
    } else {
      // Build up the array of developments from the CMS data and the data from Camden's API, mapping from Camden's API so we know we're only showing
      // developments that exist in M3 and the Planning Explorer
      const developments = data.map((development: any) => {
        const siteNotice = post.find(
          (el: any) => el.applicationNumber == development.application_number,
        );

        // Skip if there's no CMS data
        if (!siteNotice) {
          return;
        }

        let application = {
          ...siteNotice,
          applicationType: development.application_type,
          description: development.development_description,
          address: development.development_address,
          name: siteNotice.name
            ? siteNotice.name
            : development?.development_address,
          location: { lng: development.longitude, lat: development.latitude },
          applicationDocumentsUrl: `http://camdocs.camden.gov.uk/HPRMWebDrawer/PlanRec?q=recContainer:%22${siteNotice.applicationNumber}%22`,
        };

        return application;
      });
      return developments;
    }
  } else {
    return post;
  }
}

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
        *[_type == "planning-application" && defined(location) && isActive == true && !(_id in path("drafts.**"))] | order(geo::distance(location, geo::latLng(${location.latitude}, ${location.longitude}))) ${itemsPerPage ? `[${offSet}...${offSet + itemsPerPage}]` : ""} 
           {
            _id, 
            image_head, 
            name, 
            applicationNumber, 
            applicationName, 
            address,
            "distance": geo::distance(location, geo::latLng(${location.latitude}, ${location.longitude}))
          },
        "total": count(*[_type == "planning-application" && defined(location) && isActive == true && !(_id in path("drafts.**"))]),
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
    { cache: "force-cache" },
  );
  return info;
}

export async function createApplication(post: any) {
  const result = client.create(post);
  return result;
}

export async function checkExistingReference(
  applicationNumber: string,
): Promise<{ exists: boolean }> {
  const query =
    '*[_type == "planning-application" && applicationNumber == $applicationNumber]';
  const posts = await client.fetch(query, { applicationNumber });
  return { exists: posts.length > 0 };
}
