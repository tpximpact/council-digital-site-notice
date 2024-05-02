import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { PlanningApplication } from "../../../sanity/sanity.types";
import { ImageUrlBuilder } from "sanity";

type sanityApplicationResponse = {
  results: {
    _id: string;
    applicationNumber: string;
    distance?: number;
  }[];
  total: number;
};

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

const imgBuilder = imageUrlBuilder(client);
export async function urlFor(source: any): Promise<ImageUrlBuilder> {
  return imgBuilder.image(source);
}

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

export async function getApplicationById(
  id: string,
): Promise<PlanningApplication> {
  const query = `*[_type == "planning-application" && (_id == "${id}" || planningId == "${id}") && isActive == true][0]`;
  const post = await sanityFetch<PlanningApplication>({ query });
  return post;
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

export async function getGlobalContent() {
  const info = await client.fetch('*[_type == "global-content"][0]');
  return info;
}
