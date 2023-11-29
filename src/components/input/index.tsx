const Input = ({label}:{label: string}) => {
    return (
        <div className="govuk-form-group">
        <h1 className="govuk-label-wrapper">
          <label className="govuk-label govuk-label--m" htmlFor="event-name" role="definition">
              {label}
          </label>
        </h1>
        <input className="govuk-input" id="event-name" name="eventName" type="text" role="textbox"/>
      </div>
    )
}

export default Input