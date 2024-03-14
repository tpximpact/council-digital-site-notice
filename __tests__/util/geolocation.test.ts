import { getLocationFromPostcode } from "../../util/geolocation";
import { distanceInMiles } from "../../util/geolocation";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

describe("getLocationFromPostcode", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches location data for a valid postcode", async () => {
    const mockResult = { result: { latitude: 51.5074, longitude: -0.1278 } };
    fetchMock.mockResponseOnce(JSON.stringify(mockResult));

    const location = await getLocationFromPostcode("SW1A 1AA");
    expect(location).toEqual(mockResult.result);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.postcodes.io/postcodes/SW1A 1AA",
    );
  });

  it("returns null for an invalid postcode", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: "Invalid postcode" }));

    const location = await getLocationFromPostcode("INVALID");
    expect(location).toBeNull();
  });

  it("returns null for a postcode that does not match the regex", async () => {
    const location = await getLocationFromPostcode("12345");
    expect(location).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("distanceInMiles", () => {
  it("calculates the distance between two points correctly", () => {
    const point1 = { latitude: 51.5074, longitude: -0.1278 };
    const point2 = { latitude: 52.52, longitude: 13.405 };
    const expectedDistance = "578.86";

    const distance = distanceInMiles(point1, point2);
    expect(distance).toEqual(expectedDistance);
  });
});
