const Details = ({summary, color, className, description}:{summary: string, color: string, className: string, description: string}) => {
    return(
        <details className={`govuk-details ${className}`} data-module="govuk-details">
        <summary className="govuk-details__summary" style={{color: color}}>
            <span className="govuk-details__summary-text" role="definition">
            {summary}
            </span>
        </summary>
        <div className="govuk-details__text">
            {description}
            We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.
        </div>
        </details>
    )
}

export default Details;