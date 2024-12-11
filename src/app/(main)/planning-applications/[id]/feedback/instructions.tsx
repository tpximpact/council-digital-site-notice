/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../../lib/application";
import { getGlobalContent } from "../../../../actions/sanityClient";
import { PlanningApplication } from "../../../../../../sanity/sanity.types";
import CommentHead from "@/components/commentHead";
import PageCenter from "@/components/pageCenter";

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
    <div className="dsn-impact">
      <PageCenter>
        <h1 className="dsn-impact__heading">Tell us what you think</h1>
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
