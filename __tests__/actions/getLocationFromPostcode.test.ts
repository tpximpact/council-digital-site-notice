import { getLocationFromPostcode } from "@/actions/getLocationFromPostcode";
import { postCodeRegex } from "@/util";

jest.mock("@/util", () => ({
  postCodeRegex: {
    test: jest.fn(),
  },
}));

global.fetch = jest.fn();

describe("getLocationFromPostcode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null if postcode does not match regex", async () => {
    const { postCodeRegex } = require("@/util");
    postCodeRegex.test.mockReturnValue(false);

    const result = await getLocationFromPostcode("INVALID");
    expect(result).toBeNull();
    expect(postCodeRegex.test).toHaveBeenCalledWith("INVALID");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns null if API returns error", async () => {
    const { postCodeRegex } = require("@/util");
    postCodeRegex.test.mockReturnValue(true);

    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ error: "Not found" }),
    });

    const result = await getLocationFromPostcode("N1 1AA");
    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.postcodes.io/postcodes/N1 1AA",
    );
  });

  it("returns result if API returns valid data", async () => {
    const { postCodeRegex } = require("@/util");
    postCodeRegex.test.mockReturnValue(true);

    const mockResult = { lat: 51.5, lng: -0.1 };
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ result: mockResult }),
    });

    const result = await getLocationFromPostcode("N1 1AA");
    expect(result).toEqual(mockResult);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.postcodes.io/postcodes/N1 1AA",
    );
  });
});
