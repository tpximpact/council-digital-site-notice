import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-container">
      <div className="error-title">
        <h1 className="govuk-heading-l">
          The page you are looking for is no longer available
        </h1>
      </div>
      <p className="govuk-body">
        Due to a site update the planning application you are looking for may
        have moved.
      </p>
      <p className="govuk-body">
        Please try searching for the planning application in our new list.
      </p>
      <Link className="govuk-button" href="/">
        Find planning applications near you
      </Link>
    </div>
  );
}
