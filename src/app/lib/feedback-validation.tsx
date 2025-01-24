import { phoneRegex, postCodeRegex } from "./application";

export function messageError(personalDetailsForm: {
  name?: string;
  address?: string;
  postcode?: string;
}) {
  const { name = "", address = "", postcode = "" } = personalDetailsForm;

  const errors = [
    name === "" && "name",
    address === "" && "address",
    postcode === "" && "postcode",
  ].filter(Boolean) as string[]; // ensure errors is always an array of strings

  if (errors.length === 0) {
    return false;
  }

  const errorMessage =
    errors.length === 1
      ? errors[0]
      : `${errors.slice(0, -1).join(", ")} and ${errors[errors.length - 1]}`;

  // Capitalize the first word
  const capitalizedErrorMessage =
    errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

  return `${capitalizedErrorMessage} cannot be empty`;
}
export const postcodeValidation = (postcode: string) => {
  return postcode !== "" && postCodeRegex.test(postcode);
};

export function postcodeMessageError(personalDetailsForm: any) {
  const postcode = personalDetailsForm["postcode"];
  const postcodeValid = postCodeRegex.test(postcode);

  return postcode !== "" && !postcodeValid && "Postcode is invalid";
}

export function optionalValidation(personalDetailsForm: any) {
  const phoneValidation =
    personalDetailsForm["phone"] !== ""
      ? phoneRegex.test(personalDetailsForm["phone"]) == false
        ? "Telephone Number"
        : ""
      : "";
  const emailValidation =
    personalDetailsForm["email"] !== ""
      ? personalDetailsForm["email"]?.includes("@") == false
        ? "Email"
        : ""
      : "";
  const validationMessageArr = [phoneValidation, emailValidation].filter(
    (el) => el !== "",
  );

  const messageValidationArrSize: any = {
    1: `${validationMessageArr[0]} is invalid`,
    2: `${validationMessageArr[0]} and ${validationMessageArr[1]} are invalid`,
  };
  return messageValidationArrSize[validationMessageArr.length];
}

export const emailValidation = (emailForm: string) => {
  return (
    (emailForm !== "" && emailForm?.includes("@")) ||
    emailForm == undefined ||
    emailForm == ""
  );
};

export const phoneValidation = (phoneForm: string) => {
  return (
    (phoneForm !== "" && phoneRegex.test(phoneForm)) ||
    phoneForm == undefined ||
    phoneForm == ""
  );
};

export const isErrorValidation = (personalDetailsForm: any) => {
  const postcode = personalDetailsForm["postcode"];
  const validPostCode = postcode !== "" && postCodeRegex.test(postcode);

  return (
    personalDetailsForm["name"] !== "" &&
    personalDetailsForm["address"] !== "" &&
    validPostCode
  );
};

export const isConsentValidation = (personalDetailsForm: any) => {
  return personalDetailsForm["consent"];
};

export const isOptionValidation = (personalDetailsForm: any) => {
  const phoneForm = personalDetailsForm["phone"];
  const emailForm = personalDetailsForm["email"];

  return phoneValidation(phoneForm) && emailValidation(emailForm)
    ? true
    : false;
};
