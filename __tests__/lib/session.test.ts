import { getSessionStorage } from "@/lib/session";

describe("getSessionStorage", () => {
  beforeEach(() => {
    const sessionStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(global, "sessionStorage", {
      value: sessionStorageMock,
      writable: true,
      configurable: true,
    });
  });

  it("returns defaultValue if sessionStorage is empty", () => {
    (global.sessionStorage.getItem as jest.Mock).mockReturnValue(null);
    const result = getSessionStorage({ key: "foo", defaultValue: 42 });
    expect(result).toBe(42);
  });

  it("returns defaultValue if sessionStorage value is 'undefined'", () => {
    (global.sessionStorage.getItem as jest.Mock).mockReturnValue("undefined");
    const result = getSessionStorage({ key: "foo", defaultValue: "bar" });
    expect(result).toBe("bar");
  });

  it("returns parsed value if sessionStorage has valid JSON", () => {
    (global.sessionStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify({ a: 1 }),
    );
    const result = getSessionStorage({ key: "foo", defaultValue: {} });
    expect(result).toEqual({ a: 1 });
  });

  it("throws if sessionStorage has invalid JSON", () => {
    (global.sessionStorage.getItem as jest.Mock).mockReturnValue(
      "{not valid json}",
    );
    expect(() => getSessionStorage({ key: "foo", defaultValue: {} })).toThrow();
  });
});
