const Input = ({label, hint, onChange, value, type, style, locationError}:{locationError?:boolean, style?: any, label: string, hint?: string, onChange: (value: any) => void, value?: string, type: string}) => {
    return (
        <div className={`govuk-form-group ${ locationError && 'govuk-form-group--error'}`}>
        <h1 className="govuk-label-wrapper">
          <label className={`govuk-label govuk-label--l ${locationError && 'govuk-error-message'}`} htmlFor="event-name" role="definition" style={{...style}}>
              {label}
          </label>
        </h1>
        {
          hint && <div id="event-name-hint" className="govuk-hint">
          {hint}
        </div>
        }
        {
          locationError && <div id="message-error" className="govuk-error-message">
          Please enter a valid postcode
        </div>
        }
        <input className={`govuk-input ${ locationError && `govuk-input--error`}`} id="event-name" name="eventName" type={type} role="textbox" onChange={(e) => onChange(e.target.value)} defaultValue={value}/>
      </div>
    )
}

export default Input