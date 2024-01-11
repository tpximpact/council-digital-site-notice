
const TextArea = ({label, onChange, value, id, hint}: {label: string, value:string, onChange: (value: any) => void, id:any, hint: string}) => {
    return(
        <>
            <h3 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--l" htmlFor={id} role="definition">
            {label}
            </label>
            </h3>
            <p className="govuk-body" style={{color: '#505A5F'}}>{hint}</p>
            <textarea className={`govuk-textarea`} id={id} name="moreDetail" rows={5} aria-describedby="more-detail-hint" value={value} onChange={(e) => onChange(e.target.value)}></textarea>
        </>
    )
}

export default TextArea