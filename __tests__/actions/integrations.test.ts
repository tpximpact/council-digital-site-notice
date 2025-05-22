import { fetchOpenApiData } from "@/actions/integrations";

global.fetch = jest.fn();

describe("fetchOpenApiData", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...OLD_ENV, OPEN_API_URL: "https://mock.api/open" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("throws if applicationNumber is missing", async () => {
    await expect(fetchOpenApiData("")).rejects.toThrow(
      "Application number is required.",
    );
  });

  it("throws if OPEN_API_URL is not defined", async () => {
    delete process.env.OPEN_API_URL;
    await expect(fetchOpenApiData("A123")).rejects.toThrow(
      "OPEN_API_URL is not defined.",
    );
  });

  it("throws if fetch response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    await expect(fetchOpenApiData("A123")).rejects.toThrow(
      "Failed to fetch data from OpenAPI",
    );
  });

  it("throws if no data is found", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    await expect(fetchOpenApiData("A123")).rejects.toThrow(
      "No data found for the given application number",
    );
  });

  it("returns data if fetch is successful and data exists", async () => {
    const mockData = [{ id: 1, application_number: "A123" }];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    const result = await fetchOpenApiData("A123");
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://mock.api/open.json?$where=application_number='A123'",
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    );
  });
});
