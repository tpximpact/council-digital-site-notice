function Validation({
  message,
  invalidPostCode,
  optionalValidation,
  consentError,
}: any) {
  const errors = [
    message,
    invalidPostCode,
    optionalValidation,
    consentError,
  ].filter(Boolean);
  if (errors.length > 0) {
    return (
      <div className="govuk-error-summary" data-module="govuk-error-summary">
        <div role="alert">
          <h2 className="govuk-error-summary__title">There is a problem</h2>
          <div className="govuk-error-summary__body">
            <ul className="govuk-list govuk-error-summary__list">
              {errors.map((error, index) => (
                <li key={index} className="govuk-error-message">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Validation;
