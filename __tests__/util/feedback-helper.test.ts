import {
  messageError,
  postcodeValidation,
  postcodeMessageError,
  optionalValidation,
  emailValidation,
  phoneValidation,
  isErrorValidation,
  isConsentValidation,
  isOptionValidation,
} from "../../util/feedbackHelper";

describe("Form Validation Tests", () => {
  describe("messageError", () => {
    it("should return correct error message for missing fields", () => {
      const personalDetailsForm = {
        name: "",
        address: "123 Main St",
        postcode: "",
      };
      const message = messageError(personalDetailsForm);
      expect(message).toBe("Name and Postcode can not be empty");
    });
  });

  describe("postcodeValidation", () => {
    it("returns true for a valid postcode", () => {
      expect(postcodeValidation("AB1 2CD")).toBeTruthy();
      expect(postcodeValidation("W1A 0AX")).toBeTruthy();
    });

    it("returns false for an invalid postcode", () => {
      expect(postcodeValidation("ABCD")).toBeFalsy();
      expect(postcodeValidation("1234")).toBeFalsy();
    });
  });

  describe("postcodeMessageError", () => {
    it('returns "Postcode is invalid" for an invalid postcode', () => {
      const form = { postcode: "INVALID" };
      expect(postcodeMessageError(form)).toBe("Postcode is invalid");
    });

    it("returns false for a valid postcode", () => {
      const form = { postcode: "AB1 2CD" };
      expect(postcodeMessageError(form)).toBeFalsy();
    });
  });

  describe("optionalValidation", () => {
    it("returns validation message for invalid phone number", () => {
      const form = { phone: "123", email: "test@example.com" };
      expect(optionalValidation(form)).toBe("Telephone Number is invalid");
    });

    it("returns validation message for invalid email", () => {
      const form = { phone: "", email: "invalidemail" };
      expect(optionalValidation(form)).toBe("Email is invalid");
    });

    it("returns validation message for both invalid phone and email", () => {
      const form = { phone: "123", email: "invalidemail" };
      expect(optionalValidation(form)).toBe(
        "Telephone Number and Email are invalid",
      );
    });

    it("returns undefined for valid phone and email", () => {
      const form = { phone: "+447911123456", email: "test@example.com" };
      expect(optionalValidation(form)).toBeUndefined();
    });
  });
  describe("emailValidation", () => {
    it("validates emails correctly", () => {
      expect(emailValidation("test@example.com")).toBeTruthy();
      expect(emailValidation("invalidemail")).toBeFalsy();
    });
  });

  describe("phoneValidation", () => {
    it("validates phone numbers correctly", () => {
      expect(phoneValidation("+447911123456")).toBeTruthy();
      expect(phoneValidation("12345")).toBeFalsy();
    });
  });

  describe("isErrorValidation", () => {
    it("validates form correctly", () => {
      const validForm = {
        name: "John Doe",
        address: "123 Main St",
        postcode: "AB1 2CD",
      };
      expect(isErrorValidation(validForm)).toBeTruthy();

      const invalidForm = {
        name: "",
        address: "",
        postcode: "INVALID",
      };
      expect(isErrorValidation(invalidForm)).toBeFalsy();
    });
  });

  describe("isConsentValidation", () => {
    it("checks consent correctly", () => {
      expect(isConsentValidation({ consent: true })).toBeTruthy();
      expect(isConsentValidation({ consent: false })).toBeFalsy();
    });
  });

  describe("isOptionValidation", () => {
    it("validates optional fields correctly", () => {
      const form = {
        phone: "+447911123456",
        email: "test@example.com",
      };
      expect(isOptionValidation(form)).toBeTruthy();
    });

    it("returns false for invalid optional fields", () => {
      const form = { phone: "12345", email: "invalidemail" };
      expect(isOptionValidation(form)).toBeFalsy();
    });
  });
});
