import { SanityClient } from "../../../src/app/actions/sanityClient";
import { loadEnvConfig } from "@next/env";

jest.mock("../../../src/app/actions/sanityClient");

describe("SanityClient", () => {
  loadEnvConfig(process.cwd());

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllSiteNotices", () => {
    it("should return all site notices from SanityClient", async () => {
      const sanityClient = new SanityClient();
      const resultData = {
        results: [{ _id: "1", applicationNumber: "123" }],
        total: 1,
      };
      jest
        .spyOn(sanityClient, "getActiveApplications")
        .mockResolvedValue(resultData);

      const response = await sanityClient.getActiveApplications();

      expect(response).toEqual(resultData);
    });
    describe("getAllSiteNoticesByLocation", () => {
      it("should filter and sort site notices by location when provided", async () => {
        const sanityClient = new SanityClient();

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

        const response = await sanityClient.getActiveApplicationsByLocation(
          undefined,
          location,
          undefined,
        );

        expect(
          sanityClient.getActiveApplicationsByLocation,
        ).toHaveBeenCalledWith(undefined, location, undefined);
        expect(response.results.length).toBe(2);
        expect(response.results[0]._id).toBe("1");
        expect(response.results[1]._id).toBe("2");
        expect(response.total).toBe(2);
      });
    });
  });
});
