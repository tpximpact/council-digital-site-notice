import { createConsentCookies, getConsentCookies } from "@/actions/cookies";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("cookies actions", () => {
  let mockCookieStore: any;

  beforeEach(() => {
    mockCookieStore = {
      set: jest.fn(),
      get: jest.fn(),
    };
    const { cookies } = require("next/headers");
    cookies.mockResolvedValue(mockCookieStore);
  });

  describe("createConsentCookies", () => {
    it("sets isShowCookie to false and isConsentCookie to value", async () => {
      await createConsentCookies(true);
      expect(mockCookieStore.set).toHaveBeenCalledWith("isShowCookie", "false");
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "isConsentCookie",
        "true",
        expect.objectContaining({
          path: "/",
          maxAge: 31536000,
          sameSite: "strict",
        }),
      );
    });

    it("sets isConsentCookie to false when value is false", async () => {
      await createConsentCookies(false);
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "isConsentCookie",
        "false",
        expect.any(Object),
      );
    });
  });

  describe("getConsentCookies", () => {
    it("returns defaults if cookies are undefined", async () => {
      mockCookieStore.get.mockReturnValue(undefined);
      const result = await getConsentCookies();
      expect(result).toEqual({ isShowCookie: true, isConsentCookie: false });
    });

    it("returns correct values when cookies are set", async () => {
      mockCookieStore.get.mockImplementation((key: string) => {
        if (key === "isShowCookie") return { value: "false" };
        if (key === "isConsentCookie") return { value: "true" };
        return undefined;
      });
      const result = await getConsentCookies();
      expect(result).toEqual({ isShowCookie: false, isConsentCookie: true });
    });

    it("parses string 'true' and 'false' correctly", async () => {
      mockCookieStore.get.mockImplementation((key: string) => {
        if (key === "isShowCookie") return { value: "true" };
        if (key === "isConsentCookie") return { value: "false" };
        return undefined;
      });
      const result = await getConsentCookies();
      expect(result).toEqual({ isShowCookie: true, isConsentCookie: false });
    });
  });
});
