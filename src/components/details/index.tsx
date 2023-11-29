import { ReactNode } from "react";

const Details = ({summary, color, className, description}:{summary: string, color?: string, className?: string, description: ReactNode}) => {
    return(
        <details className={`govuk-details ${className}`} data-module="govuk-details">
        <summary className="govuk-details__summary" style={{color: color}}>
            <span className="govuk-details__summary-text" role="definition">
            {summary}
            </span>
        </summary>
        <div className="govuk-details__text">
            {description}
        </div>
        </details>
    )
}

export default Details;