/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../../lib/application";
import { urlFor, getGlobalContent } from "../../../../actions/sanityClient";
import { PlanningApplication } from "../../../../../../sanity/sanity.types";
import Link from "next/link";

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
          <div className="dsn-comment-head">
            {application?.image_head && (
              <div
                className="dsn-comment-head__image"
                style={{
                  backgroundImage: application?.image_head
                    ? `url(${urlFor(application?.image_head).url()})`
                    : "none",
                }}
              ></div>
            )}

            <div className="dsn-comment-head__content">
              {application?.name ||
                (application?.address && (
                  <Link
                    className="govuk-heading-s"
                    href={`/planning-applications/${application?._id}`}
                  >
                    {application?.name || application?.address} Name
                  </Link>
                ))}
              {application?.applicationNumber && (
                <span>{application?.applicationNumber}</span>
              )}
            </div>
          </div>
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
