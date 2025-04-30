import { getSessionStorage } from "../src/app/lib/application";

describe("sessionStorage", () => {
  const mockApplicationId = "mockId";
  beforeAll(() => {
    sessionStorage.clear();
    sessionStorage.setItem(
      `topics_${mockApplicationId}`,
      JSON.stringify([1, 2, 3]),
    );
    sessionStorage.setItem(
      `feelings_${mockApplicationId}`,
      JSON.stringify(undefined),
    );
  });

  it("should return defaultValue", async () => {
    const storage = getSessionStorage({
      key: `feelings_${mockApplicationId}`,
      defaultValue: {},
    });
    expect(storage).toEqual({});
  }),
    it("should return default when it's not storage", async () => {
      const storage = getSessionStorage({
        key: `comments_${mockApplicationId}`,
        defaultValue: {},
      });
      expect(storage).toEqual({});
    });
  it("should return some storage", async () => {
    const storage = getSessionStorage({
      key: `topics_${mockApplicationId}`,
      defaultValue: {},
    });
    expect(storage).toEqual([1, 2, 3]);
  });
});
