const Checkbox = ({label, id, onChange, checked, labelClass, isError, messageError}:{messageError?: string, isError?: boolean, labelClass?: string, label: string, id: string, onChange:(e:any) => void, checked:boolean}) => {
    return(
    <div className={`govuk-form-group ${isError && 'govuk-form-group--error'}`}>
      <div className="govuk-checkboxes" data-module="govuk-checkboxes">
        <div className="govuk-checkboxes__item">
        <input className={`govuk-checkboxes__input`} id={id} name="checkbox" type="checkbox" value="carcasses" role="checkbox" data-testid="checkbox" onChange={(e) => onChange(e)} checked={checked}/>
        <label className={`govuk-label govuk-checkboxes__label ${labelClass}`} htmlFor={id}>
            {label}
          </label>
  
        </div>
  </div>
  {
  isError &&  <p id="nationality-error" className="govuk-error-message">
  {messageError}
</p>
}
  </div>
  )
}

export default Checkbox

