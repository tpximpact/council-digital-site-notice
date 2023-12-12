
const TextArea = ({label, onChange, value, id}: {label: string, value:string, onChange: (value: any) => void, id:any}) => {
    return(
        <>
            <h3 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--s" htmlFor={id} role="definition">
            {label}
            </label>
            </h3>
            <textarea className={`govuk-textarea`} id={id} name="moreDetail" rows={5} aria-describedby="more-detail-hint" value={value} onChange={(e) => onChange(e.target.value)}></textarea>
        </>
    )
}

export default TextArea