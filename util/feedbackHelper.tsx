import { phoneRegex, postCodeRegex } from "./regex";

export function messageError(personalDetailsForm: any) {
  const name = personalDetailsForm["name"] === "" ? "Name" : "";
  const address = personalDetailsForm["address"] === "" ? "Address" : "";
  const postcode = personalDetailsForm["postcode"] === "" ? "Postcode" : "";

  let messageArr = [name, address, postcode].filter((el) => el !== "");
  const messageArrSize: any = {
    1: messageArr[0],
    2: `${messageArr[0]} and ${messageArr[1]}`,
    3: `${messageArr[0]}, ${messageArr[1]} and ${messageArr[2]}`,
  };

  return (
    !!messageArr.length &&
    `${messageArrSize[messageArr.length]} can not be empty`
  );
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
