// this class will take sanityClient and openDataClient as parameters and will be used to fetch data from the API's and combin the outputs
export class DataClient {
  private sanityClient: any;
  private openDataClient: any;

  constructor(sanityClient: any, openDataClient: any) {
    this.sanityClient = sanityClient;
    this.openDataClient = openDataClient;
  }

  async getActiveApplications(): Promise<any[]> {
    const cmsData = await this.sanityClient.getActiveApplications();
    const openDataPosts =
      await this.openDataClient.getOpenDataApplicationsPagination(cmsData);
    return openDataPosts;
  }
}
