import { getLocalStorage } from "../util/helpers/application";

describe("localstorage", () => {
  beforeAll(() => {
    localStorage.clear();
    localStorage.setItem("topics", JSON.stringify([1, 2, 3]));
    localStorage.setItem("feelings", JSON.stringify(undefined));
  });

  it("should return defaultValue", async () => {
    const storage = getLocalStorage({
      key: "feelings",
      defaultValue: {},
    });
    expect(storage).toEqual({});
  }),
    it("should return default when it's not storage", async () => {
      const storage = getLocalStorage({
        key: "comments",
        defaultValue: {},
      });
      expect(storage).toEqual({});
    });
  it("should return some storage", async () => {
    const storage = getLocalStorage({
      key: "topics",
      defaultValue: {},
    });
    expect(storage).toEqual([1, 2, 3]);
  });
});
