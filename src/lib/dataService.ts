import { SanityClient } from "./sanityClient";

type resultsType = {
  _id: string;
  applicationNumber: string;
}[];

type siteNoticeResponse = {
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

//   async getPaginatedSiteNotices(
//     lastId?: string,
//     itemsPerPage?: number,
//   ): Promise<siteNoticeResponse> {
//     const resultData = await this.sanityClient.getActiveApplications(
//       lastId,
//       itemsPerPage,
//     );
//     let openDataPosts = [];
//     if (this.integrationMethod == "OpenData") {
//       openDataPosts = await this.openDataClient.getOpenDataApplications(
//         resultData.results,
//       );
//       const combinedResults = await this.getActiveApplicationsCombined(
//         resultData.results,
//         openDataPosts,
//       );
//       return {
//         results: combinedResults,
//         total: resultData.total,
//       };
//     }
//     return resultData;
//   }

//   private async getActiveApplicationsCombined(
//     resultData: any[],
//     openDataPosts: any[],
//   ): Promise<resultsType> {
//     const developments = resultData.map((siteNotice: any) => {
//       if (
//         !openDataPosts ||
//         !Array.isArray(openDataPosts) ||
//         openDataPosts.length === 0
//       ) {
//         return siteNotice;
//       }
//       const matchedData = openDataPosts.find(
//         (development: any) =>
//           development.application_number === siteNotice.applicationNumber,
//       );
//       if (matchedData) {
//         return {
//           ...siteNotice,
//           applicationType: matchedData.application_type,
//           description: matchedData.development_description,
//           address: matchedData.development_address,
//           name: siteNotice.name
//             ? siteNotice.name
//             : matchedData.development_address,
//           location: { lng: matchedData.longitude, lat: matchedData.latitude },
//         };
//       }

//       return siteNotice;
//     });

//     return developments;
//   }
// }
