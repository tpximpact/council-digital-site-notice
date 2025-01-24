import { ReactNode } from "react";

const Details = ({
  summary,
  className,
  description,
  isInverted,
}: {
  summary: string;
  className?: string;
  description: ReactNode;
  isInverted?: boolean;
}) => {
  return (
    <details
      className={`govuk-details ${className} ${isInverted ? "govuk-details--inverted" : ""}`}
      data-module="govuk-details"
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">{description}</div>
    </details>
  );
};

export default Details;
