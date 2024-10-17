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
}) => {
  return (
    <div className={`govuk-form-group ${isError && "govuk-form-group--error"}`}>
      <h1 className="govuk-label-wrapper">
        <label
          className={`govuk-label govuk-label--l ${isError && "govuk-error-message"}`}
          htmlFor={id}
          style={{ ...style }}
        >
          {label}
        </label>
      </h1>
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
