const Input = ({
  label,
  hint,
  onChange,
  value,
  type,
  style,
  isError,
  messageError,
}: {
  messageError?: string;
  isError?: boolean;
  style?: any;
  label: string;
  hint?: string;
  onChange: (value: any) => void;
  value?: string;
  type: string;
}) => {
  return (
    <div className={`govuk-form-group ${isError && "govuk-form-group--error"}`}>
      <h1 className="govuk-label-wrapper">
        <label
          className={`govuk-label govuk-label--l ${isError && "govuk-error-message"}`}
          htmlFor={label}
          role="definition"
          style={{ ...style }}
        >
          {label}
        </label>
      </h1>
      {hint && <div className="govuk-hint">{hint}</div>}
      {isError && <div className="govuk-error-message">{messageError}</div>}
      <input
        className={`govuk-input ${isError && `govuk-input--error`}`}
        id={label}
        name="eventName"
        type={type}
        role="textbox"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Input;
