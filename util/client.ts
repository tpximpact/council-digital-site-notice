import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  parse,
  getYear,
  getMonth,
  getDate,
  formatDistanceStrict,
} from "date-fns";
import { groq } from "next-sanity";
import { getLocationFromPostcode } from "./geolocation";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-11-15",
  token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
});

const builder = imageUrlBuilder(client);

export async function getActiveApplications() {
  const posts = await client.fetch( '*[_type == "planning-application" && isActive == true] {_id}');
  return posts;
}

export async function getActiveApplicationsPagination({_id, itemsPerPage, location}: {_id?: string; itemsPerPage: number; location?: any;}) {

  var cmsData = await getCMSApplicationsPagination({ _id, itemsPerPage, location });

  if (process.env.NEXT_PUBLIC_DATA_PROVIDER == "OpenData") {
    let openDataPosts = getOpenDataApplicationsPagination({ cmsData, location })
    return openDataPosts;
  } 
  else {
    return cmsData;
  }
}


export async function getCMSApplicationsPagination({ _id, itemsPerPage, location,}: {_id?: any; itemsPerPage: number; location: any;}) : Promise<any[]> {
  let posts;

  if (_id === undefined) {
    posts = await client.fetch(`*[_type == "planning-application" && isActive == true] | order(_id) [0...${itemsPerPage}] {...}`);
  } else {
    posts = await client.fetch(`*[_type == "planning-application" && isActive == true && _id >= $_id] | order(_id) [0...${itemsPerPage}] {...}`,
     { _id });
  }

  return posts;
}

export async function getOpenDataApplicationsPagination({cmsData, location,}: {cmsData: any[], location: any;}) {

  // Helper method to convert a JS array to a string for a SOQL query
  const arrayToSoqlString = (arr: any[]) => "'" + arr.toString().replace(/,/g, "','") + "'";
  const limit = 50;

  // Then fetch the matching data from Camden's API
  const ids = cmsData.map((development: any) => development.applicationNumber);

  let whereQuery = `application_number in(${arrayToSoqlString(ids)})`;
  let orderQuery = `registered_date DESC, last_uploaded DESC`;

  if(location != null) {
    orderQuery = `distance_in_meters(location, 'POINT (${location.longitude} ${location.latitude})')`;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}.json?$limit=${limit}&$where=${whereQuery}&$order=${orderQuery}`);
  const data = await res.json();

  // Build up the array of developments from the CMS data and the data from Camden's API, mapping from Camden's API so we know we're only showing
  // developments that exist in M3 and the Planning Explorer
  const developments = data.map((development: any) => {
    const siteNotice = cmsData.find(
      (el: any) => el.applicationNumber == development.application_number
    );

    // Skip if there's no CMS data
    if (!siteNotice) {
      return;
    }

    return {
      development_address: development.development_address,
      name: siteNotice.name
        ? siteNotice.name
        : development.development_description,
      _id: siteNotice._id,
    };
  });

  return developments;
}

export async function getApplicationById(id: string) {
  const query = '*[_type == "planning-application" && _id == $_id]';
  const post = await client.fetch(query, { _id: id });

  if (process.env.NEXT_PUBLIC_DATA_PROVIDER == "OpenData") {
    // Then fetch the matching data from Camden's API
    const ids = post.map(
      (development: any) => development.applicationNumber
    );
    const arrayToSoqlString = (arr: []) =>
      "'" + arr.toString().replace(/,/g, "','") + "'";
    let whereQuery = `application_number in(${arrayToSoqlString(ids)})`;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}.json?$where=${whereQuery}`
    );
    const data = await res.json();

    // Build up the array of developments from the CMS data and the data from Camden's API, mapping from Camden's API so we know we're only showing
    // developments that exist in M3 and the Planning Explorer
    const developments = data.map((development: any) => {
      const siteNotice = post.find(
        (el: any) => el.applicationNumber == development.application_number
      );

      // Skip if there's no CMS data
      if (!siteNotice) {
        return;
      }
      return {
        ...development,
        ...post[0],
        _id: siteNotice._id,
      };
    });

    return developments;
  } else {
    return post;
  }
}

export async function createApplication(post: any) {
  const result = client.create(post);
  return result;
}

export async function updateApplicationToNotActive(_id: string) {
  const result = client.patch(_id).set({ isActive: false }).commit();
  return result;
}

export async function checkExistingReference(
  reference: string
): Promise<{ exists: boolean }> {
  const query = '*[_type == "planning-application" && reference == $reference]';
  const posts = await client.fetch(query, { reference });
  return { exists: posts.length > 0 };
}

export function urlFor(source: any) {
  return builder.image(source);
}

export async function addFeedback(data: any) {
  console.log({ data });
}
