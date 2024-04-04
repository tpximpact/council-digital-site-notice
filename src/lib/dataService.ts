import { SanityClient } from "./sanityClient";

type resultsType = {
  _id: string;
  applicationNumber: string;
}[];

export type siteNoticeResponse = {
  results: resultsType;
  total: number;
};

export class DataClient {
  private sanityClient: SanityClient;

  constructor(sanityClient: SanityClient) {
    this.sanityClient = sanityClient;
  }

  async getAllSiteNotices(
    // lastId?: string,
    offSet?: number,
    itemsPerPage?: number,
    location?: { latitude: number; longitude: number },
  ): Promise<siteNoticeResponse> {
    let resultData;
    if (location) {
      resultData = await this.sanityClient.getActiveApplicationsByLocation(
        // lastId,
        offSet,
        location,
        itemsPerPage,
      );
    } else {
      resultData = await this.sanityClient.getActiveApplications(
        // lastId,
        offSet,
        itemsPerPage,
      );
    }
    return resultData;
  }
}
