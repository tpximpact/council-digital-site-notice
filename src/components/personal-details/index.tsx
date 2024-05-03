"use client";
import { useEffect, useState } from "react";
import { Button, BackLink } from "@/components/button";
import Details from "@/components/details";
import Input from "@/components/input";
import Validation from "@/components/validation";
import Checkbox from "@/components/checkbox";
import { descriptionDetail } from "@/app/lib/description";
import {
  messageError,
  optionalValidation,
  isErrorValidation,
  isConsentValidation,
  isOptionValidation,
  postcodeMessageError,
  emailValidation,
  phoneValidation,
  postcodeValidation,
} from "../../app/lib/feedback-validation";
import { PersonalDetailsForm } from "../../app/lib/type";
import { getLocalStorage } from "../../app/lib/application";
// import { getGlobalContent } from "../../app/actions/actions";
import { getGlobalContent } from "../../app/actions/sanityClient";

const PersonalDetails = ({
  onChangeQuestion,
  setQuestion,
}: {
  onChangeQuestion: () => void;
  setQuestion: (value: number) => void;
}) => {
  const [globalConfig, setGlobalConfig] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);
  const [id, setId] = useState();
  const [personalDetailsForm, setPersonalDetailsForm] =
    useState<PersonalDetailsForm>({
      name: "",
      address: "",
      postcode: "",
      email: "",
      phone: "",
      consent: false,
    });
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);

  const [isNameError, setIsNameErros] = useState<boolean>(false);
  const [isAddressError, setIsAddressErros] = useState<boolean>(false);
  const [isPostcodeError, setIsPostcodeErros] = useState<boolean>(false);
  const [isEmailError, setIsEmailErros] = useState<boolean>(false);
  const [isPhoneError, setIsPhoneErros] = useState<boolean>(false);
  const [isConsentError, setIsConsentErros] = useState<boolean>(false);
  const [generalMessage, setGeneralMessage] = useState<any>("");
  const [invalidPostcodeMessage, setInvalidPostcodeMessage] = useState<any>("");
  const [optionalValidationMessage, setOptionalValidationMessage] =
    useState<any>("");
  const [consentErrorMessage, setConsentErrorMessage] = useState<any>("");

  const backComponent =
    selectedCheckbox && selectedCheckbox[selectedCheckbox?.length - 1];

  useEffect(() => {
    (async () => {
      const fetchGlobalConfig: any = await getGlobalContent();
      setGlobalConfig(fetchGlobalConfig);

      const applicationStorage = getLocalStorage({
        key: "application",
        defaultValue: {},
      });
      setId(applicationStorage?._id);

      const personalDetailsStorage = getLocalStorage({
        key: "personalDetails",
        defaultValue: {},
      });
      personalDetailsStorage?.id === applicationStorage?._id &&
        setPersonalDetailsForm(personalDetailsStorage?.value);

      const selectedCheckboxStorage = getLocalStorage({
        key: "topics",
        defaultValue: {},
      });
      selectedCheckboxStorage?.id === applicationStorage?._id &&
        setSelectedCheckbox(selectedCheckboxStorage?.value);
    })();
  }, []);

  const onChangeDetails = (value: any, key: string) => {
    setPersonalDetailsForm({ ...personalDetailsForm, [key]: value });
    localStorage.setItem(
      "personalDetails",
      JSON.stringify({ id, value: { ...personalDetailsForm, [key]: value } }),
    );
  };

  const nextPage = () => {
    const errorValidation = isErrorValidation(personalDetailsForm);
    const errorConsent = isConsentValidation(personalDetailsForm);
    const optionValidation = isOptionValidation(personalDetailsForm);

    if (errorValidation && errorConsent && optionValidation) {
      setIsError(false);
      onChangeQuestion();
    } else {
      setIsError(true);
      personalDetailsForm?.name == ""
        ? setIsNameErros(true)
        : setIsNameErros(false);
      personalDetailsForm?.address == ""
        ? setIsAddressErros(true)
        : setIsAddressErros(false);
      setGeneralMessage(messageError(personalDetailsForm));
      !postcodeValidation(personalDetailsForm.postcode)
        ? setIsPostcodeErros(true)
        : setIsPostcodeErros(false);
      setInvalidPostcodeMessage(postcodeMessageError(personalDetailsForm));
      !emailValidation(personalDetailsForm?.email)
        ? setIsEmailErros(true)
        : setIsEmailErros(false);
      !phoneValidation(personalDetailsForm?.phone)
        ? setIsPhoneErros(true)
        : setIsPhoneErros(false);
      setOptionalValidationMessage(optionalValidation(personalDetailsForm));
      !personalDetailsForm["consent"]
        ? setIsConsentErros(true)
        : setIsConsentErros(false);
      setConsentErrorMessage(
        !personalDetailsForm["consent"] && `You need to check the consent box`,
      );
    }
  };

  return (
    <section className="wrap-personal-details">
      <BackLink content="Back" onClick={() => setQuestion(backComponent)} />
      <h1 className="govuk-heading-l">Your details</h1>
      <Input
        label="Name"
        onChange={(value: any) => onChangeDetails(value, "name")}
        value={personalDetailsForm?.name}
        type="text"
        isError={isNameError}
        messageError="Your name is required"
      />
      <Input
        label="Address"
        onChange={(value: any) => onChangeDetails(value, "address")}
        value={personalDetailsForm?.address}
        type="text"
        isError={isAddressError}
        messageError="Your address is required"
      />
      <Input
        label="Postcode"
        onChange={(value: any) => onChangeDetails(value, "postcode")}
        value={personalDetailsForm?.postcode}
        type="text"
        isError={isPostcodeError}
        messageError={`${personalDetailsForm?.postcode == "" ? "Your postcode is required" : "Invalid postcode"}`}
      />
      <Input
        label="Email address"
        hint="Optional"
        onChange={(value: any) => onChangeDetails(value, "email")}
        value={personalDetailsForm?.email}
        type="email"
        isError={isEmailError}
        messageError="Invalid email"
      />
      <Input
        label="Telephone number"
        hint="Optional"
        onChange={(value: any) => onChangeDetails(value, "phone")}
        value={personalDetailsForm?.phone}
        type="tel"
        isError={isPhoneError}
        messageError="Invalid telephone number"
      />
      <div>
        <Checkbox
          labelClass="consent-label"
          label={`I consent to ${globalConfig?.councilName} Council using my data for the purposes of assessing this planning application`}
          isError={isConsentError}
          messageError="You need to consent"
          id="consent"
          onChange={(e) => onChangeDetails(e.target.checked, "consent")}
          checked={personalDetailsForm?.consent}
        />
      </div>
      {isError && (
        <Validation
          message={generalMessage}
          invalidPostCode={invalidPostcodeMessage}
          optionalValidation={optionalValidationMessage}
          consentError={consentErrorMessage}
        />
      )}

      <Details
        summary="How we handle your data"
        description={descriptionDetail["consent"]}
      />
      <Button content="Next" onClick={() => nextPage()} />
    </section>
  );
};

export default PersonalDetails;
