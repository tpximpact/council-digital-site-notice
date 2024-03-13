import { DataClient } from "../../../src/lib/dataService";
import { SanityClient } from "../../../src/lib/sanityClient";
import { OpenDataClient } from "../../../src/lib/openDataClient";
import { loadEnvConfig } from "@next/env";

jest.mock("../../../src/lib/sanityClient");
jest.mock("../../../src/lib/openDataClient");

describe("DataClient", () => {
  loadEnvConfig(process.cwd());
  beforeEach(() => {
    process.env.NEXT_PUBLIC_DATA_PROVIDER = "OpenData";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllSiteNotices", () => {
    it("should return combined site notices from SanityClient and OpenDataClient when integration method is OpenData", async () => {
      const sanityClient = new SanityClient();
      const openDataClient = new OpenDataClient();
      const dataClient = new DataClient(sanityClient, openDataClient);
      const resultData = {
        results: [{ id: "1", applicationNumber: "123" }],
        total: 1,
      };
      const openDataPosts = [
        { application_number: "123", development_description: "Test" },
      ];
      await sanityClient.getActiveApplications.mockResolvedValue(resultData);
      await openDataClient.getOpenDataApplications.mockResolvedValue(
        openDataPosts,
      );

      const response = await dataClient.getAllSiteNotices();

      expect(sanityClient.getActiveApplications).toHaveBeenCalled();
      expect(openDataClient.getOpenDataApplications).toHaveBeenCalledWith(
        resultData.results,
      );
      expect(response.results.length).toBe(1);
      expect(response.results[0].description).toBe("Test");
      expect(response.total).toBe(1);
    });
    it("should return all site notices from SanityClient when integration method is not OpenData", async () => {
      process.env.NEXT_PUBLIC_DATA_PROVIDER = "blah";

      const sanityClient2 = new SanityClient();
      const openDataClient2 = new OpenDataClient();
      const dataClient2 = new DataClient(sanityClient2, openDataClient2);
      const resultData = {
        results: [{ id: "1", applicationNumber: "123" }],
        total: 1,
      };
      await sanityClient2.getActiveApplications.mockResolvedValue(resultData);

      const response = await dataClient2.getAllSiteNotices();

      expect(sanityClient2.getActiveApplications).toHaveBeenCalled();
      expect(openDataClient2.getOpenDataApplications).not.toHaveBeenCalled();
      expect(response).toEqual(resultData);
    });
    describe("getAllSiteNotices by location", () => {
      it("should filter and sort site notices by location when provided", async () => {
        const sanityClient = new SanityClient();
        const openDataClient = new OpenDataClient();
        const dataClient = new DataClient(sanityClient, openDataClient);

        const location = { latitude: 40.7128, longitude: -74.006 };

        const sanityResultData = {
          results: [
            { _id: "1", applicationNumber: "123", distance: 1000 },
            { _id: "2", applicationNumber: "456", distance: 5000 },
          ],
          total: 2,
        };

        jest
          .spyOn(sanityClient, "getActiveApplicationsByLocation")
          .mockResolvedValue(sanityResultData);

        const response = await dataClient.getAllSiteNotices(
          undefined,
          undefined,
          location,
        );

        expect(
          sanityClient.getActiveApplicationsByLocation,
        ).toHaveBeenCalledWith(undefined, undefined, location);
        expect(response.results.length).toBe(2);
        expect(response.results[0]._id).toBe("1");
        expect(response.results[1]._id).toBe("2");
        expect(response.total).toBe(2);
      });
    });
  });
});
