import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "../../../public/assets/icons";
import { DataDetails } from "../../../util/helpers/type";
import {
  aplicationStageStyle,
  applicationStageMessage,
} from "../../../util/helpers/application";
import { useEffect, useState } from "react";
import { globalContentRevalidate } from "../../../util/actions/actions";
function Process({
  data,
  consultationDeadline,
}: {
  data: DataDetails;
  consultationDeadline: string;
}) {
  const [globalConfig, setGlobalConfig] = useState<any>();

  useEffect(() => {
    (async () => {
      const fetchGlobalConfig = await globalContentRevalidate();
      setGlobalConfig(fetchGlobalConfig);
    })();
  }, []);

  const singleApplicationStatus =
    data?.applicationStage?.status[
      data?.applicationStage?.stage?.toLowerCase()
    ];
  const checkStage =
    parseFloat(consultationDeadline) <= 0 &&
    data?.applicationStage?.stage == "Consultation" &&
    singleApplicationStatus == "in progress"
      ? "Assessment"
      : data?.applicationStage?.stage;
  return (
    <section className="process-wrap">
      <h2 className="govuk-heading-l">Where are we in the process?</h2>
      {globalConfig?.planningProcessUrl && (
        <Link
          className="govuk-link govuk-link--no-visited-state"
          href={globalConfig?.planningProcessUrl}
          target="_blank"
        >
          Find out more about the planning process
        </Link>
      )}
      <div className="wrap-grid-button">
        <div className="process-grid">
          <p className="govuk-body govuk-!-font-weight-bold process-consultation">
            {checkStage}
          </p>
          <p
            className={`govuk-body process-consultation-result ${aplicationStageStyle(singleApplicationStatus)}`}
          >
            <span>{singleApplicationStatus?.toUpperCase()}</span>
          </p>
          {data?.enableComments &&
            parseFloat(consultationDeadline) > 0 &&
            data?.applicationStage?.stage == "Consultation" && (
              <p className="govuk-body application-days">
                {consultationDeadline}{" "}
                {parseFloat(consultationDeadline) > 1 ? "days" : "day"} left
              </p>
            )}

          <p
            className={`govuk-body ${data?.applicationStage?.stage !== "Consultation" ? "hiden-date" : "show-date"}`}
          >
            {applicationStageMessage(checkStage, singleApplicationStatus)}
          </p>
        </div>
        <div style={{ marginTop: "20px" }}>
          {data?.applicationDocumentsUrl && (
            <div className="wrap-secondary-button-image">
              <Link
                className="govuk-button govuk-button--secondary"
                data-module="govuk-button"
                href={data?.applicationDocumentsUrl}
                target="_blank"
              >
                View application documents and comments
              </Link>
              <Image
                src="/assets/images/comments-and-docs.png"
                width={64}
                height={64}
                alt="summary and comment icon"
                style={{ marginLeft: "20px" }}
              />
            </div>
          )}
          <div
            className={`${(data?.enableComments || data?.applicationDocumentsUrl) && "wrap-button"}`}
          >
            {data?.enableComments && (
              <Link
                className="govuk-button govuk-!-font-weight-bold"
                style={{ textDecoration: "none" }}
                href={`${data?._id}/feedback`}
              >
                Comment on this application <ArrowIcon />
              </Link>
            )}

            {data?.applicationUpdatesUrl && (
              <Link
                className="govuk-link process-link govuk-link--no-visited-state"
                target="_blank"
                href={data?.applicationUpdatesUrl}
              >
                Sign up for updates about this application
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
