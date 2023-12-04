
const TextArea = ({label, onChange, value}: {label: string, value:string, onChange: (value: any) => void}) => {
    console.log({value})
    return(
        <>
            <h3 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--s" htmlFor="more-detail" role="definition">
            {label}
            </label>
            </h3>
            <textarea className={`govuk-textarea`} id="more-detail" name="moreDetail" rows={5} aria-describedby="more-detail-hint" defaultValue={value} onChange={(e) => onChange(e.target.value)}></textarea>
        </>
    )
}

export default TextArea