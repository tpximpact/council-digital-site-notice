import "@testing-library/jest-dom";
import { phoneRegex, postCodeRegex } from "../../util/regex";

describe("phoneRegex", () => {
  // Valid Cases
  test.each(["+44 1234 567 890", "01234 567 890", "+44 123 456 7890"])(
    'matches valid phone number "%s"',
    (number) => {
      expect(number).toMatch(phoneRegex);
    },
  );

  // Invalid Cases
  test.each(["1234 567 890", "abcd efgh ijkl"])(
    'does not match invalid phone number "%s"',
    (number) => {
      expect(number).not.toMatch(phoneRegex);
    },
  );
});

describe("postCodeRegex", () => {
  // Valid Cases
  test.each([
    "GIR 0AA",
    "AB1 2CD",
    "AB12 3CD",
    "A1B 2CD",
    "AB1C 2DE",
    "W1A 1HQ",
    "EC1A 1BB",
  ])('matches valid postcode "%s"', (code) => {
    expect(code).toMatch(postCodeRegex);
  });

  // Invalid Cases
  test.each(["GIR0AA", "ABCD 123", "123 ABC", "AB 123", "A12 B34"])(
    'does not match invalid postcode "%s"',
    (code) => {
      expect(code).not.toMatch(postCodeRegex);
    },
  );
});
