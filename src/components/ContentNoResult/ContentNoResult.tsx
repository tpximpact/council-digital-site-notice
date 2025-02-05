import Link from "next/link";

export const ContentNoResult = () => {
  return (
    <div className="govuk-grid-row" role="alert">
      <div className="govuk-grid-column-full">
        <h2 className="govuk-heading-s">No applications match your search</h2>
        <p className="govuk-body">
          You can try searching again, or{" "}
          <Link href={`/`} className="govuk-link govuk-link--no-visited-state">
            go back
          </Link>
        </p>
        <p className="govuk-body">
          If you are having problems with finding what you need, you can:
        </p>
        <ul className="govuk-list govuk-list--bullet">
          <li>Check you have spelled everything correctly</li>
          <li>Try being less specific with your search query</li>
        </ul>
      </div>
    </div>
  );
};
