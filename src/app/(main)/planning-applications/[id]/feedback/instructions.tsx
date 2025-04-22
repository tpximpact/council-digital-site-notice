/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { getSessionStorage } from "../../../../lib/application";
import { getGlobalContent } from "../../../../actions/sanityClient";
import { PlanningApplication } from "../../../../../../sanity/sanity.types";
import CommentHead from "@/components/commentHead";
import PageCenter from "@/components/pageCenter";

function Instructions({ applicationId }: { applicationId: string }) {
  const [application, setApplication] = useState<PlanningApplication>();
  const [councilName, setCouncilName] = useState();

  useEffect(() => {
    (async () => {
      const globalConfig: any = await getGlobalContent();
      const getStorage = getSessionStorage({
        key: `application_${applicationId}`,
        defaultValue: {},
      });
      setApplication(getStorage);
      setCouncilName(globalConfig?.councilName);
    })();
  }, [applicationId]);

  return (
    <div className="dsn-impact">
      <PageCenter>
        <h2 className="dsn-impact__heading">Tell us what you think</h2>
        {application && (
          <CommentHead application={application} isInverted={true} />
        )}
        <p className="dsn-impact__body">
          Your feedback helps us improve developments so they meet the needs of
          people in {councilName}. It's important you let us know what you
          think.
        </p>
      </PageCenter>
    </div>
  );
}

export default Instructions;
