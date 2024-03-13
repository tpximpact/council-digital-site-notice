import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type sanityApplicationResponse = {
  results: {
    _id: string;
    applicationNumber: string;
    distance?: number;
  }[];
  total: number;
};

export class SanityClient {
  private client: any;
  private imgBuilder: any;

  constructor() {
    this.client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      useCdn: false,
      apiVersion: "2023-11-15",
      ignoreBrowserTokenWarning: true,
      token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
    });

    this.imgBuilder = imageUrlBuilder(this.client);
  }

  async urlFor(source: any) {
    return this.imgBuilder.image(source);
  }

  async getActiveApplications(
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

      const response = await this.client.fetch(query);
      return response;
    } catch (error) {
      throw new Error("Error fetching data from Sanity");
    }
  }

  async getActiveApplicationsByLocation(
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
      const response = await this.client.fetch(query);
      if (response.results) {
        response.results.forEach((result: { distance: number }) => {
          if (result.distance) {
            // convert the distance of each distance from meters to miles
            result.distance = result.distance * 0.000621371192;
            result.distance = Math.round(result.distance);
          }
        });
      }
      return response;
    } catch (error) {
      throw new Error("Error fetching data from Sanity");
    }
  }
}
