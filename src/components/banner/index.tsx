import { useEffect, useState } from "react";
const Banner = () => {
  const [feedbackUrl, setFeedbackUrl] = useState("");
  useEffect(() => {
    const globalInfo = localStorage.getItem("globalInfo");

    if (globalInfo !== null) {
      setFeedbackUrl(JSON.parse(globalInfo)?.feedbackUrl);
    }
  }, []);
  return (
    <div className={feedbackUrl && `govuk-phase-banner`}>
      {" "}
      {feedbackUrl && (
        <p className="govuk-phase-banner__content">
          <strong
            className="govuk-tag govuk-phase-banner__content__tag"
            role="tag"
          >
            Beta
          </strong>
          <span className="govuk-phase-banner__text">
            This is a new service – your{" "}
            <a
              className="govuk-link"
              href={feedbackUrl}
              role="link"
              target="_blank"
            >
              feedback
            </a>{" "}
            will help us to improve it.
          </span>
        </p>
      )}
    </div>
  );
};

export default Banner;
