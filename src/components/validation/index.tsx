function Validation ({message}: any) {
    return(
        <div className="impact-validation">
        <p className="govuk-body-l govuk-!-font-weight-bold">There is a problem</p>
        <p className="govuk-body govuk-!-font-weight-bold">{message}</p>
    </div>
    )
}

export default Validation