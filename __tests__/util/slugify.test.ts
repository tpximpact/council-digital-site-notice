import { slugify } from "@/util/slugify";

describe("slugify", () => {
  it("should convert a string to lowercase", () => {
    const result = slugify("Hello World");
    expect(result).toBe("hello-world");
  });

  it("should trim leading and trailing white space", () => {
    const result = slugify("  Hello World  ");
    expect(result).toBe("hello-world");
  });

  it("should replace spaces with hyphens", () => {
    const result = slugify("Hello World");
    expect(result).toBe("hello-world");
  });

  it("should remove consecutive hyphens", () => {
    const result = slugify("Hello   World");
    expect(result).toBe("hello-world");
  });

  it("should remove non-alphanumeric characters", () => {
    const result = slugify("Hello, World!");
    expect(result).toBe("hello-world");
  });

  it("should handle an empty string", () => {
    const result = slugify("");
    expect(result).toBe("");
  });

  it("should handle a string with only spaces", () => {
    const result = slugify("     ");
    expect(result).toBe("");
  });

  it("should handle a string with special characters only", () => {
    const result = slugify("!@#$%^&*()");
    expect(result).toBe("");
  });

  it("should handle a string with mixed characters", () => {
    const result = slugify("Hello World! 123");
    expect(result).toBe("hello-world-123");
  });

  it("should handle a string with multiple spaces and special characters", () => {
    const result = slugify("  Hello   World!  ");
    expect(result).toBe("hello-world");
  });
});
