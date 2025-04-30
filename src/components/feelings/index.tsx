import { useState } from "react";
import { Button, BackLink } from "@/components/button";
import { getSessionStorage } from "@/app/lib/application";

const Radio = ({
  fieldName,
  label,
  value,
  onChange,
  checked,
}: {
  fieldName: string;
  label: string;
  value: string;
  onChange: () => void;
  checked: boolean;
}) => {
  const id = `${fieldName}-${value}`;
  return (
    <div className="govuk-radios__item">
      <input
        className="govuk-radios__input"
        id={id}
        name={fieldName}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label className="govuk-label govuk-radios__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

const options = ["Opposed", "Neutral", "Support"];

function Feeling({
  applicationId,
  onChangeQuestion,
  setQuestion,
}: {
  applicationId: string;
  onChangeQuestion: () => void;
  setQuestion: (value: number) => void;
}) {
  const applicationStorage = getSessionStorage({
    key: `application_${applicationId}`,
    defaultValue: {},
  });
  const feelingStorage = getSessionStorage({
    key: `feeling_${applicationId}`,
    defaultValue: undefined,
  });

  const [isError, setIsError] = useState<boolean>(false);
  const [sentiment, setSentiment] = useState<string | undefined>(
    feelingStorage?.value,
  );
  const id = applicationStorage?._id || "";

  const selectSentiment = (value: string) => {
    setSentiment(value);
    setIsError(false);
    sessionStorage.setItem(
      `feeling_${applicationId}`,
      JSON.stringify({ id, value }),
    );
  };

  return (
    <section>
      <BackLink content="Back" onClick={() => setQuestion(0)} />
      <div
        className={`govuk-form-group ${isError && "govuk-form-group--error"}`}
      >
        <fieldset
          className="govuk-fieldset"
          {...(isError && { "aria-describedby": "sentiment-error" })}
        >
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">
              How do you feel about this development?
            </h1>
          </legend>
          {isError && (
            <p id="sentiment-error" className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span> Select how
              you feel about this development
            </p>
          )}
          <div className="govuk-radios" data-module="govuk-radios">
            {options.map((option) => (
              <Radio
                fieldName="sentiment"
                key={option}
                label={option}
                value={option}
                checked={sentiment === option}
                onChange={() => selectSentiment(option)}
              />
            ))}
          </div>
        </fieldset>
      </div>
      <Button
        content="Next"
        onClick={() => {
          sentiment ? onChangeQuestion() : setIsError(true);
        }}
      />
    </section>
  );
}

export default Feeling;
