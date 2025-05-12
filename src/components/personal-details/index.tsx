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
import { getSessionStorage } from "../../app/lib/application";
import { getGlobalContent } from "../../app/actions/sanityClient";

const PersonalDetails = ({
  applicationId,
  onChangeQuestion,
  setQuestion,
}: {
  applicationId: string;
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

      const applicationStorage = getSessionStorage({
        key: `application_${applicationId}`,
        defaultValue: {},
      });
      setId(applicationStorage?._id);

      const personalDetailsStorage = getSessionStorage({
        key: `personalDetails_${applicationId}`,
        defaultValue: {},
      });
      personalDetailsStorage?.id === applicationStorage?._id &&
        setPersonalDetailsForm(personalDetailsStorage?.value);

      const selectedCheckboxStorage = getSessionStorage({
        key: `topics_${applicationId}`,
        defaultValue: {},
      });
      selectedCheckboxStorage?.id === applicationStorage?._id &&
        setSelectedCheckbox(selectedCheckboxStorage?.value);
    })();
  }, [applicationId]);

  const onChangeDetails = (value: any, key: string) => {
    setPersonalDetailsForm({ ...personalDetailsForm, [key]: value });
    sessionStorage.setItem(
      `personalDetails_${applicationId}`,
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
    <>
      <BackLink content="Back" onClick={() => setQuestion(backComponent)} />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-l">Your details</h1>
          <Input
            label="Name"
            onChange={(value: any) => onChangeDetails(value, "name")}
            value={personalDetailsForm?.name}
            type="text"
            isError={isNameError}
            messageError="Your name is required"
            autocomplete="name"
            id="name"
            required={true}
          />
          <Input
            label="Address"
            onChange={(value: any) => onChangeDetails(value, "address")}
            value={personalDetailsForm?.address}
            type="text"
            isError={isAddressError}
            messageError="Your address is required"
            autocomplete="street-address"
            id="address"
            required={true}
          />
          <Input
            label="Postcode"
            onChange={(value: any) => onChangeDetails(value, "postcode")}
            value={personalDetailsForm?.postcode}
            type="text"
            isError={isPostcodeError}
            messageError={`${personalDetailsForm?.postcode == "" ? "Your postcode is required" : "Invalid postcode"}`}
            autocomplete="postal-code"
            id="postcode"
            required={true}
          />
          <Input
            label="Email address"
            hint="Optional"
            onChange={(value: any) => onChangeDetails(value, "email")}
            value={personalDetailsForm?.email}
            type="email"
            isError={isEmailError}
            messageError="Invalid email"
            autocomplete="email"
            id="email"
            required={false}
          />
          <Input
            label="Telephone number"
            hint="Optional"
            onChange={(value: any) => onChangeDetails(value, "phone")}
            value={personalDetailsForm?.phone}
            type="tel"
            isError={isPhoneError}
            messageError="Invalid telephone number"
            autocomplete="tel"
            id="telephone"
            required={false}
          />

          <div
            className={`govuk-form-group ${isConsentError && "govuk-form-group--error"}`}
          >
            {isConsentError && (
              <p id="consent-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> You need
                to consent
              </p>
            )}
            <div className="govuk-checkboxes" data-module="govuk-checkboxes">
              <Checkbox
                value="consent"
                label={`I consent to ${globalConfig?.councilName} Council using my data for the purposes of assessing this planning application`}
                id="consent"
                onChange={(e) => onChangeDetails(e.target.checked, "consent")}
                checked={personalDetailsForm?.consent}
              />
            </div>
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
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
