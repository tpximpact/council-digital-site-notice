import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getGlobalContent } from "@/app/actions/sanityClient";
import { PlanningApplication } from "../../../sanity/sanity.types";
import PageCenter from "../pageCenter";
import ButtonStart from "../buttonStart";
import ApplicationStatus from "../applicationStatus";

function Process({ data }: { data: PlanningApplication }) {
  const [globalConfig, setGlobalConfig] = useState<any>();

  useEffect(() => {
    (async () => {
      const fetchGlobalConfig = await getGlobalContent();
      setGlobalConfig(fetchGlobalConfig);
    })();
  }, []);

  return (
    <PageCenter>
      <h2 className="govuk-heading-l">Where are we in the process?</h2>

      {globalConfig?.planningProcessUrl && data.applicationStage && (
        <p className="govuk-body">
          <Link
            className="govuk-link govuk-link--no-visited-state"
            href={globalConfig?.planningProcessUrl}
            target="_blank"
          >
            Find out more about the planning process
          </Link>
        </p>
      )}

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          {data.applicationStage && (
            <ApplicationStatus
              applicationStage={data.applicationStage}
              consultationDeadline={data.consultationDeadline ?? undefined}
            />
          )}
          &nbsp;
        </div>
        <div className="govuk-grid-column-one-half">
          {data?.applicationDocumentsUrl && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <Link
                  className="govuk-button govuk-button--secondary"
                  data-module="govuk-button"
                  href={data?.applicationDocumentsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View application documents and comments
                </Link>
              </div>
              <div className="govuk-grid-column-one-third">
                <Image
                  src="/assets/images/comments-and-docs.png"
                  width={64}
                  height={64}
                  alt=""
                />
              </div>
            </div>
          )}
          {globalConfig?.globalEnableComments && data?.enableComments && (
            <ButtonStart
              content="Comment on this application"
              href={`${data?._id}/feedback`}
              noSpacing={data?.applicationUpdatesUrl ? true : false}
            />
          )}
          {data?.applicationUpdatesUrl && (
            <p className="govuk-body">
              <Link
                href={data.applicationUpdatesUrl}
                className="govuk-link govuk-link--no-visited-state"
                target="_blank"
              >
                Sign up for updates about this application
              </Link>
            </p>
          )}
        </div>
      </div>
    </PageCenter>
  );
}

export default Process;
