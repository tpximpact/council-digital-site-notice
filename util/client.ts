import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-11-15",
  token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
});

const builder = imageUrlBuilder(client);

export async function getActiveApplications(): Promise<{ _id: string }[]> {
  const posts = await client.fetch(
    '*[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))] {_id}',
  );
  return posts;
}

export async function getActiveApplicationsPagination({
  _id,
  itemsPerPage,
  location,
}: {
  _id?: string;
  itemsPerPage: number;
  location?: any;
}) {
  var cmsData = await getCMSApplicationsPagination({
    _id,
    itemsPerPage,
    location,
  });

  if (process.env.NEXT_PUBLIC_DATA_PROVIDER == "OpenData") {
    let openDataPosts = await getOpenDataApplicationsPagination({
      cmsData,
      location,
    });
    return openDataPosts;
  } else {
    return cmsData;
  }
}

export async function getCMSApplicationsPagination({
  _id,
  itemsPerPage,
  location,
}: {
  _id?: any;
  itemsPerPage: number;
  location: any;
}): Promise<any[]> {
  let posts;

  let order = "order(_id)";

  if (location != null && process.env.NEXT_PUBLIC_DATA_PROVIDER == "CMS") {
    order = `order(geo::distance(location, geo::latLng(${location.latitude}, ${location.longitude})) asc)`;
  }

  if (_id === undefined) {
    posts = await client.fetch(
      `*[_type == "planning-application" && isActive == true && !(_id in path('drafts.**'))] | ${order} [0...${itemsPerPage}] {...}`,
    );
  } else {
    posts = await client.fetch(
      `*[_type == "planning-application" && isActive == true && _id >= $_id && !(_id in path('drafts.**'))] | ${order} [0...${itemsPerPage}] {...}`,
      { _id },
    );
  }

  return posts;
}

export async function getOpenDataApplicationsPagination({
  cmsData,
  location,
}: {
  cmsData: any[];
  location: any;
}) {
  const limit = 50;
  const arrayToSoqlString = (arr: any[]) =>
    "'" + arr.toString().replace(/,/g, "','") + "'";
  // Fetch the matching data from Camden's API
  const ids = cmsData.map((development: any) => development.applicationNumber);
  const whereQuery = `application_number in(${arrayToSoqlString(ids)})`;
  const orderQuery =
    location != null
      ? `distance_in_meters(location, 'POINT (${location.longitude} ${location.latitude})')`
      : `registered_date DESC, last_uploaded DESC`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}.json?$limit=${limit}&$where=${whereQuery}&$order=${orderQuery}`,
  );
  const data = await res.json();

  // Build up the array of developments from the CMS data and the data from Camden's API
  const developments = cmsData.map((siteNotice: any) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return siteNotice;
    }
    const matchedData = data.find(
      (development: any) =>
        development.application_number === siteNotice.applicationNumber,
    );

    if (matchedData) {
      return {
        ...siteNotice,
        applicationType: matchedData.application_type,
        description: matchedData.development_description,
        address: matchedData.development_address,
        name: siteNotice.name
          ? siteNotice.name
          : matchedData.development_address,
        location: { lng: matchedData.longitude, lat: matchedData.latitude },
      };
    }

    return siteNotice;
  });

  return developments;
}

export async function getApplicationById(id: string) {
  const query = '*[_type == "planning-application" && _id == $_id]';
  const post = await client.fetch(query, { _id: id });

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

export async function getGlobalContent() {
  const info = await client.fetch('*[_type == "global-content"][0]');
  return info;
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
  applicationNumber: string,
): Promise<{ exists: boolean }> {
  const query =
    '*[_type == "planning-application" && applicationNumber == $applicationNumber]';
  const posts = await client.fetch(query, { applicationNumber });
  return { exists: posts.length > 0 };
}

export function urlFor(source: any) {
  return builder.image(source);
}

export async function addFeedback(data: any) {
  console.log({ data });
}
