const Checkbox = ({label, id, onChange, checked}:{label: string, id: string, onChange:(e:any) => void, checked:boolean}) => {
    return(
      <div className="govuk-checkboxes__item">
        <input className="govuk-checkboxes__input" id={id} name="checkbox" type="checkbox" value="carcasses" role="checkbox" data-testid="checkbox" onChange={(e) => onChange(e)} checked={checked}/>
        <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
          {label}
        </label>
      </div>
    )
}

export default Checkbox