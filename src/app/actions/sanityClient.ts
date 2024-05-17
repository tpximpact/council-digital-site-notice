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

  return post;
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
    { cache: "force-cache", next: { revalidate: 86400 } },
  );
  return info;
}

export async function createApplication(post: any) {
  const result = client.create(post);
  return result;
}

export async function updateApplication(_id: string, body: any) {
  const bodyObj = Object.fromEntries(body);
  console.log(_id, bodyObj.description);
  const result = await client
    .patch(_id)
    .set({ decription: bodyObj.description })
    .commit();
  console.log({ result });
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

export async function checkExistingReferenceAndUpdate(
  body: any,
  applicationNumber: string,
) {
  const query =
    '*[_type == "planning-application" && applicationNumber == $applicationNumber]';
  const posts = await client.fetch(query, {
    applicationNumber,
  });
  // if is an obj
  if (typeof body === "object") {
    const bodyObj = Object.fromEntries(body);
    const res = Object.keys(bodyObj).filter(
      (key) => bodyObj[key] !== posts[0][key], // think about obj array, can come more than one?
    );
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // if is an array
}
