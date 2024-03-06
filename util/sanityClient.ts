import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type sanityApplicationResponse = {
  results: {
    _id: string;
    applicationNumber: string;
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
      token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
    });

    this.imgBuilder = imageUrlBuilder(this.client);
  }

  async urlFor(source: any) {
    return this.imgBuilder.image(source);
  }

  async getActiveApplications(
    // lastId?: string,
    itemsPerPage?: number,
    offSet?: number,
  ): Promise<sanityApplicationResponse> {
    console.log("JERE", itemsPerPage, offSet);
    // const query = `{
    //         "results": *[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))${
    //           lastId ? ` && _id > "${lastId}"` : ""
    //         }] | order(_id) ${itemsPerPage ? `[0...${itemsPerPage}]` : ""} {_id, image_head, name, applicationNumber, applicationName, address},
    //         "total": count(*[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))])
    // }`;
    const query = `{
            "results": *[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))] | order(_id) ${itemsPerPage ? `[${offSet}...${offSet + itemsPerPage}]` : ""} {_id, image_head, name, applicationNumber, applicationName, address},
            "total": count(*[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))]) 
    }`;
    console.log({ query });
    const posts = await this.client.fetch(query);
    console.log({ posts });
    return posts;
  }
  // '{\n            "results": *[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))] | order(_id) [6...6] {_id, image_head, name, applicationNumber, applicationName, address},\n            "total": count(*[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))]) \n    }';

  //   async getActiveApplicationsCount(): Promise<number> {
  //     const count = await this.client.fetch(
  //       `count(*[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))])`,
  //     );
  //     return count;
  //   }
}
