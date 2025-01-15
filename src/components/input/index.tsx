const Input = ({
  label,
  hint,
  onChange,
  value,
  type,
  style,
  isError,
  messageError,
  id,
  autocomplete,
  headingLevel,
}: {
  messageError?: string;
  isError?: boolean;
  style?: any;
  label: string;
  hint?: string;
  onChange: (value: any) => void;
  value?: string;
  type: string;
  id: string;
  autocomplete: string;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  const HeadingTag = headingLevel || "div"; // Default to 'div' if no headingLevel is provided

  const Label = () => (
    <label
      className={`govuk-label ${headingLevel ? "govuk-label--l" : ""} ${isError ? "govuk-error-message" : ""}`}
      htmlFor={id}
      style={{ ...style }}
    >
      {label}
    </label>
  );

  return (
    <div
      className={`govuk-form-group ${isError ? "govuk-form-group--error" : ""}`}
    >
      {headingLevel && (
        <HeadingTag className="govuk-label-wrapper">
          <Label />
        </HeadingTag>
      )}
      {!headingLevel && <Label />}
      {hint && <div className="govuk-hint">{hint}</div>}
      {isError && <div className="govuk-error-message">{messageError}</div>}
      <input
        className={`govuk-input ${isError && `govuk-input--error`}`}
        id={id}
        name="eventName"
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        autoComplete={autocomplete}
      />
    </div>
  );
};

export default Input;
