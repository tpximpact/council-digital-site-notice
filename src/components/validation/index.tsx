function Validation ({message, invalidPostCode, optionalValidation, consentError}: any) {
    return(
        <div className="impact-validation">
        <p className="govuk-body-l govuk-!-font-weight-bold">There is a problem</p>
        <p className="govuk-body govuk-!-font-weight-bold">{message}</p>
        <p className={`govuk-body govuk-!-font-weight-bold ${(message && invalidPostCode) && `error-line`}`}>{invalidPostCode}</p>
        <p className={`govuk-body govuk-!-font-weight-bold ${((message || invalidPostCode) && optionalValidation) && `error-line`}`}>{optionalValidation}</p>
        <p className={`govuk-body govuk-!-font-weight-bold ${((message || invalidPostCode || optionalValidation) && consentError) && `error-line`}`}>{consentError}</p>
    </div>
    )
}

export default Validation