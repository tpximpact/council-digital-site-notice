/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../../lib/application";
import { getGlobalContent } from "../../../../actions/sanityClient";
import { PlanningApplication } from "../../../../../../sanity/sanity.types";
import CommentHead from "@/components/commentHead";

function Instructions() {
  const [application, setApplication] = useState<PlanningApplication>();
  const [councilName, setCouncilName] = useState();

  useEffect(() => {
    (async () => {
      const globalConfig: any = await getGlobalContent();
      const getStorage = getLocalStorage({
        key: "application",
        defaultValue: {},
      });
      setApplication(getStorage);
      setCouncilName(globalConfig?.councilName);
    })();
  }, []);

  return (
    <>
      <div className="govuk-panel govuk-panel--information">
        <h1 className="govuk-panel__title">Tell us what you think</h1>
        <div className="govuk-panel__body">
          {application && (
            <CommentHead application={application} isInverted={true} />
          )}
          <p className="govuk-body">
            Your feedback helps us improve developments so they meet the needs
            of people in {councilName}. It's important you let us know what you
            think.
          </p>
        </div>
      </div>
    </>
  );
}

export default Instructions;
