import Link from "next/link";

const Banner = ({ globalConfig }: any) => {
  const feedbackUrl = globalConfig?.feedbackUrl;

  return (
    <div className="govuk-phase-banner">
      <p className="govuk-phase-banner__content">
        <strong className="govuk-tag govuk-phase-banner__content__tag">
          Beta
        </strong>
        <span className="govuk-phase-banner__text">
          This is a new service - your{" "}
          {feedbackUrl ? (
            <Link
              className="govuk-link"
              href={feedbackUrl}
              rel="noopener noreferrer"
            >
              feedback
            </Link>
          ) : (
            "feedback"
          )}{" "}
          will help us to improve it.
        </span>
      </p>
    </div>
  );
};

export default Banner;
