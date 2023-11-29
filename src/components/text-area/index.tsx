
const TextArea = ({label}: {label: string}) => {
    return(
        <>
            <h3 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--s" htmlFor="more-detail" role="definition">
            {label}
            </label>
            </h3>
            <textarea className={`govuk-textarea`} id="more-detail" name="moreDetail" rows={5} aria-describedby="more-detail-hint"></textarea>
        </>
    )
}

export default TextArea