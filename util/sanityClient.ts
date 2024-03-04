import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

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

  async getActiveApplications(): Promise<{ _id: string }[]> {
    const posts = await this.client.fetch(
      `*[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))] | order(_id) [0...2] {
                 _id, applicationNumber
            }`,
    );
    return posts;
  }

  async getActiveApplicationsCount(): Promise<number> {
    const count = await this.client.fetch(
      `count(*[_type == "planning-application" && isActive == true && !(_id in path("drafts.**"))])`,
    );
    return count;
  }
}
