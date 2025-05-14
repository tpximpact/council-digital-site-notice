import React, { useState } from "react";

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  hint?: string;
  maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  id,
  hint,
  maxLength = 3000,
}: TextAreaProps) => {
  const [error, setError] = useState<string | null>(null);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedContent = e.clipboardData.getData("text");
    const newValue = value + pastedContent;

    if (newValue.length > maxLength) {
      e.preventDefault();
      const trimmedContent = pastedContent.slice(0, maxLength - value.length);
      onChange(value + trimmedContent);
      setError(
        "Your input was trimmed because it exceeded the maximum length.",
      );
    } else {
      onChange(value + pastedContent);
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (error && newValue.length <= maxLength) {
      setError(null);
    }

    onChange(newValue);
  };

  return (
    <div
      className={`govuk-form-group ${error ? "govuk-form-group--error" : ""}`}
    >
      <h1 className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--l" htmlFor={id}>
          {label}
        </label>
      </h1>
      {hint && <p className="govuk-hint">{hint}</p>}

      {error && (
        <p id={`${id}-more-detail-error`} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {error}
        </p>
      )}
      <textarea
        className={`govuk-textarea${error ? " govuk-textarea--error" : ""}`}
        id={id}
        name="moreDetail"
        rows={5}
        aria-describedby={`${id}${error ? ` ${id}-more-detail-error` : ""}`}
        autoComplete="off"
        required={true}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        maxLength={maxLength}
      ></textarea>
      <p
        className="govuk-hint"
        id={`${id}-more-detail-character-count`}
        aria-live="polite"
      >
        {value.length} / {maxLength} characters
      </p>
    </div>
  );
};

export default TextArea;
