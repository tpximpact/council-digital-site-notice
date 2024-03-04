/* this class will take sanityClient and openDataClient as parameters 
   and will be used to fetch data from the API's and combin the outputs */
export class DataClient {
  private sanityClient: any;
  private openDataClient: any;

  constructor(sanityClient: any, openDataClient: any) {
    this.sanityClient = sanityClient;
    this.openDataClient = openDataClient;
  }

  async getSiteNotices(): Promise<any[]> {
    const resultData = await this.sanityClient.getActiveApplications();
    let openDataPosts = [];
    if (process.env.NEXT_PUBLIC_DATA_PROVIDER == "OpenData") {
      openDataPosts =
        await this.openDataClient.getOpenDataApplications(resultData);
      console.log("openDataPosts", openDataPosts);
    }
    return this.getActiveApplicationsCombined(resultData, openDataPosts);
  }

  private async getActiveApplicationsCombined(
    resultData: any[],
    openDataPosts: any[],
  ) {
    const developments = resultData.map((siteNotice: any) => {
      if (
        !openDataPosts ||
        !Array.isArray(openDataPosts) ||
        openDataPosts.length === 0
      ) {
        return siteNotice;
      }
      const matchedData = openDataPosts.find(
        (development: any) =>
          development.application_number === siteNotice.applicationNumber,
      );
      console.log("matchedData", matchedData);
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
}
