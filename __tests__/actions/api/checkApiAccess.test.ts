jest.mock("@/actions/sanityClient", () => ({
  getGlobalContent: jest.fn(),
}));

const OLD_ENV = process.env;

describe("checkApiAccess", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, OUR_API_KEY: "test-key" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("returns 401 if apiKey is missing", async () => {
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    const result = await checkApiAccess(undefined);
    expect(result).toEqual({ status: 401, message: "Invalid API key" });
  });

  it("returns 401 if apiKey is invalid", async () => {
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    const result = await checkApiAccess("wrong-key");
    expect(result).toEqual({ status: 401, message: "Invalid API key" });
  });

  it("returns 403 if uniform integration is not enabled", async () => {
    const { getGlobalContent } = require("@/actions/sanityClient");
    getGlobalContent.mockResolvedValue({ integrations: "" });
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    const result = await checkApiAccess("test-key");
    expect(result).toEqual({
      status: 403,
      message: "Uniform integration is not enabled",
    });
  });

  it("returns null if apiKey is valid and integration is enabled", async () => {
    const { getGlobalContent } = require("@/actions/sanityClient");
    getGlobalContent.mockResolvedValue({ integrations: "uniformAPI" });
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    const result = await checkApiAccess("test-key");
    expect(result).toBeNull();
  });
});
