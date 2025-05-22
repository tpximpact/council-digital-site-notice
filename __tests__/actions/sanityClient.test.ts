import {
  getActiveApplications,
  getActiveApplicationById,
  getActiveApplicationsByLocation,
  getGlobalContent,
  getApplicationByApplicationNumber,
  createApplication,
  updateApplication,
  sanityFetch,
  clientWithToken,
} from "@/actions/sanityClient";

jest.mock("@/sanity/lib/client", () => ({
  client: {
    fetch: jest.fn(),
    withConfig: jest.fn().mockReturnThis(),
    create: jest.fn(),
    patch: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    commit: jest.fn(),
  },
}));

const mockClient = require("@/sanity/lib/client").client;

describe("sanityClient actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("sanityFetch", () => {
    it("calls client.fetch with correct args", async () => {
      mockClient.fetch.mockResolvedValue("result");
      const result = await sanityFetch({
        query: "query",
        params: { a: 1 },
        config: { b: 2 },
      });
      expect(mockClient.fetch).toHaveBeenCalledWith(
        "query",
        { a: 1 },
        { b: 2 },
      );
      expect(result).toBe("result");
    });
  });

  describe("getActiveApplications", () => {
    it("returns response from sanityFetch", async () => {
      const mockResponse = { results: [], total: 0 };
      mockClient.fetch.mockResolvedValue(mockResponse);
      const result = await getActiveApplications(0, 10);
      expect(result).toEqual(mockResponse);
    });

    it("throws on error", async () => {
      mockClient.fetch.mockRejectedValue(new Error("fail"));
      await expect(getActiveApplications()).rejects.toThrow(
        "Error fetching data from Sanity",
      );
    });
  });

  describe("getActiveApplicationById", () => {
    it("fetches by id", async () => {
      mockClient.fetch.mockResolvedValue({ _id: "id1" });
      const result = await getActiveApplicationById("id1");
      expect(mockClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining("$_id in [_id, planningId]"),
        { _id: "id1" },
      );
      expect(result).toEqual({ _id: "id1" });
    });
  });

  describe("getActiveApplicationsByLocation", () => {
    it("throws if location is missing", async () => {
      await expect(
        // @ts-expect-error
        getActiveApplicationsByLocation(0, undefined, 10),
      ).rejects.toThrow("Valid location is required.");
    });

    it("returns response and converts distance", async () => {
      mockClient.fetch.mockResolvedValue({
        results: [{ distance: 1609.34 }],
        total: 1,
      });
      const result = await getActiveApplicationsByLocation(
        0,
        { latitude: 51, longitude: -0.1 },
        10,
      );
      expect(result.results[0].distance).toBeCloseTo(1.0, 1);
    });

    it("throws on error", async () => {
      mockClient.fetch.mockRejectedValue(new Error("fail"));
      await expect(
        getActiveApplicationsByLocation(0, { latitude: 1, longitude: 2 }, 10),
      ).rejects.toThrow("Error fetching data from Sanity");
    });
  });

  describe("getGlobalContent", () => {
    it("fetches global content", async () => {
      mockClient.fetch.mockResolvedValue({ foo: "bar" });
      const result = await getGlobalContent();
      expect(mockClient.fetch).toHaveBeenCalledWith(
        '*[_type == "global-content"][0]',
        {},
        { next: { revalidate: 86400 } },
      );
      expect(result).toEqual({ foo: "bar" });
    });
  });

  describe("getApplicationByApplicationNumber", () => {
    it("returns first application if found", async () => {
      mockClient.fetch.mockResolvedValue([{ _id: "id1" }]);
      const result = await getApplicationByApplicationNumber("A1");
      expect(mockClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining("applicationNumber == $applicationNumber"),
        { applicationNumber: "A1" },
      );
      expect(result).toEqual({ _id: "id1" });
    });

    it("returns null if not found", async () => {
      mockClient.fetch.mockResolvedValue([]);
      const result = await getApplicationByApplicationNumber("A1");
      expect(result).toBeNull();
    });
  });

  describe("createApplication", () => {
    it("calls clientWithToken.create", async () => {
      clientWithToken.create = jest.fn().mockResolvedValue({ _id: "id1" });
      const result = await createApplication({ foo: "bar" });
      expect(clientWithToken.create).toHaveBeenCalledWith({ foo: "bar" });
      expect(result).toEqual({ _id: "id1" });
    });
  });

  describe("updateApplication", () => {
    it("calls patch/set/commit chain", async () => {
      const set = jest.fn().mockReturnThis();
      const commit = jest.fn().mockResolvedValue({ _id: "id1" });
      const patch = jest.fn(
        () =>
          ({
            set,
            commit,
          }) as any,
      ); // <-- Type cast here
      clientWithToken.patch = patch as any; // <-- And here

      const result = await updateApplication("id1", { foo: "bar" });
      expect(clientWithToken.patch).toHaveBeenCalledWith("id1");
      expect(set).toHaveBeenCalledWith({ foo: "bar" });
      expect(commit).toHaveBeenCalled();
      expect(result).toEqual({ _id: "id1" });
    });
  });
});
