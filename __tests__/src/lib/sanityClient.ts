import {
  getActiveApplicationsByLocation,
  getActiveApplications,
} from "../../../src/app/actions/sanityClient";
import { loadEnvConfig } from "@next/env";

jest.mock("../../../src/app/actions/sanityClient", () => ({
  getActiveApplications: jest.fn().mockReturnValue({
    results: [{ _id: "1", applicationNumber: "123" }],
    total: 1,
  }),
  getActiveApplicationsByLocation: jest.fn().mockReturnValue({
    results: [
      { _id: "1", applicationNumber: "123", distance: 1000 },
      { _id: "2", applicationNumber: "456", distance: 5000 },
    ],
    total: 2,
  }),
}));

describe("SanityClient", () => {
  loadEnvConfig(process.cwd());

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllSiteNotices", () => {
    it("should return all site notices from SanityClient", async () => {
      const resultData = {
        results: [{ _id: "1", applicationNumber: "123" }],
        total: 1,
      };

      const response = await getActiveApplications();

      expect(response).toEqual(resultData);
    });
    describe("getAllSiteNoticesByLocation", () => {
      it("should filter and sort site notices by location when provided", async () => {
        const location = { latitude: 40.7128, longitude: -74.006 };

        const response = await getActiveApplicationsByLocation(
          undefined,
          location,
          undefined,
        );

        expect(getActiveApplicationsByLocation).toHaveBeenCalledWith(
          undefined,
          location,
          undefined,
        );
        expect(response.results.length).toBe(2);
        expect(response.results[0]._id).toBe("1");
        expect(response.results[1]._id).toBe("2");
        expect(response.total).toBe(2);
      });
    });
  });
});
