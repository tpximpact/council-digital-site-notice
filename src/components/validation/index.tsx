function Validation ({message, invalidPostCode, optionalValidation, consentError}: any) {
    return(
        <div className="impact-validation">
        <p className="govuk-body-l govuk-!-font-weight-bold">There is a problem</p>
        <p className="govuk-body govuk-!-font-weight-bold error-message">{message}</p>
        <p className={`govuk-body govuk-!-font-weight-bold error-message`}>{invalidPostCode}</p>
        <p className={`govuk-body govuk-!-font-weight-bold error-message`}>{optionalValidation}</p>
        <p className={`govuk-body govuk-!-font-weight-bold error-message `}>{consentError}</p>
    </div>
    )
}

export default Validation