/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../../lib/application";
import { getGlobalContent, urlFor } from "../../../../actions/sanityClient";
import { PlanningApplication } from "../../../../../../sanity/sanity.types";
import CommentHead from "@/components/commentHead";
import PageWrapper from "@/components/pageWrapper";

const FeedbackMessage = () => {
  const [globalConfig, setGlobalConfig] = useState<any>();
  const [application, setAplication] = useState<PlanningApplication>();
  const [formId, setFormId] = useState<string | null>();

  useEffect(() => {
    (async () => {
      const fetchGlobalConfig: any = await getGlobalContent();
      setGlobalConfig(fetchGlobalConfig);
      const initialValue = getLocalStorage({
        key: "application",
        defaultValue: {},
      });
      setAplication(initialValue);

      const formId = localStorage.getItem("formId");
      setFormId(formId);
    })();
  }, []);

  return (
    <PageWrapper isCentered={true}>
      <div className="govuk-panel govuk-panel--confirmation">
        <h1 className="govuk-panel__title">Comment submitted</h1>
        <div className="govuk-panel__body">
          {formId
            ? `Your reference number ${formId}`
            : "Reference Number Unavailable"}
        </div>
      </div>

      {application && <CommentHead application={application} />}

      {application?.applicationUpdatesUrl && (
        <Link
          href={application?.applicationUpdatesUrl}
          className="govuk-button govuk-!-font-size-16"
          target="_blank"
        >
          Sign up for updates about this application
        </Link>
      )}

      <br />
      <br />
      <br />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-m">
            Discover other planning applications in your area
          </h1>
          <p className="govuk-body">
            If you’re interested in learning more about planning applications in
            your area, you can view all currently active applications and
            provide comments on them.
          </p>
          <nav>
            <Link
              href="/"
              className="govuk-button govuk-button--secondary govuk-!-font-size-16"
            >
              View local planning applications
            </Link>
          </nav>
        </div>
      </div>
      <br />
      <br />
      {globalConfig?.howToGetInvolveUrl && (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-m">
              Get involved in {globalConfig?.councilName}’s Local Plan
            </h1>
            <p className="govuk-body">
              You can have a big impact on developments in your local community
              by getting involved in {globalConfig?.councilName}'s planning
              policy.{" "}
            </p>
            <Link
              href={globalConfig?.howToGetInvolveUrl}
              className="govuk-button govuk-button--secondary govuk-!-font-size-16"
            >
              Find out how you can get involved
            </Link>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default FeedbackMessage;
