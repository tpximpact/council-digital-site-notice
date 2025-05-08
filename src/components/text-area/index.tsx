const TextArea = ({
  label,
  onChange,
  value,
  id,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: any) => void;
  id: any;
  hint?: string;
}) => {
  return (
    <>
      <h1 className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--l" htmlFor={id}>
          {label}
        </label>
      </h1>
      {hint && <p className="govuk-hint">{hint}</p>}
      <textarea
        className={`govuk-textarea`}
        id={id}
        name="moreDetail"
        rows={5}
        aria-describedby={id}
        autoComplete="off"
        required={true}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={3000}
      ></textarea>
    </>
  );
};

export default TextArea;
