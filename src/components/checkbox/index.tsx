const Checkbox = ({label, id, onChange}:{label: string, id: string, onChange:(e:any) => void}) => {
    return(
      <div className="govuk-checkboxes__item">
        <input className="govuk-checkboxes__input" id={id} name="checkbox" type="checkbox" value="carcasses" role="checkbox" data-testid="checkbox" onClick={(e) => onChange(e)}/>
        <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
          {label}
        </label>
      </div>
    )
}

export default Checkbox