import { capitaliseFirstLetter } from "@/util/capitaliseFirstLetter";

describe("capitaliseFirstLetter", () => {
  it("should capitalize the first letter of a single word", () => {
    const result = capitaliseFirstLetter("hello");
    expect(result).toBe("Hello");
  });

  it("should capitalize the first letter of a sentence", () => {
    const result = capitaliseFirstLetter("hello world");
    expect(result).toBe("Hello world");
  });

  it("should handle an empty string", () => {
    const result = capitaliseFirstLetter("");
    expect(result).toBe("");
  });

  it("should handle a string with mixed case", () => {
    const result = capitaliseFirstLetter("hElLo WoRLd");
    expect(result).toBe("Hello world");
  });

  it("should handle a string with numbers", () => {
    const result = capitaliseFirstLetter("123abc");
    expect(result).toBe("123abc");
  });

  it("should handle a string with special characters", () => {
    const result = capitaliseFirstLetter("!hello");
    expect(result).toBe("!hello");
  });

  it("should handle a string with leading and trailing spaces", () => {
    const result = capitaliseFirstLetter("  hello world  ");
    expect(result).toBe("  hello world  ");
  });
});
