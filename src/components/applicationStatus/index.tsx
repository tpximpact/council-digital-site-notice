"use client";

import { PlanningApplication } from "../../../sanity/sanity.types";
import {
  aplicationStageStyle,
  applicationStageMessage,
} from "@/app/lib/application";

const ApplicationStatus = ({
  data,
  consultationDeadline,
}: {
  data: PlanningApplication;
  consultationDeadline: string;
}) => {
  const singleApplicationStatus =
    data?.applicationStage?.status[
      data?.applicationStage?.stage.toLowerCase() as keyof typeof data.applicationStage.status
    ];

  const checkStage =
    parseFloat(consultationDeadline) <= 0 &&
    data?.applicationStage?.stage === "Consultation" &&
    singleApplicationStatus === "in progress"
      ? "Assessment"
      : data?.applicationStage?.stage;

  return (
    <div className="dsn-application-status">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <p className="dsn-application-status__heading">{checkStage}</p>
          {data?.enableComments &&
            parseFloat(consultationDeadline) > 0 &&
            data?.applicationStage?.stage == "Consultation" && (
              <p className="govuk-body">
                {consultationDeadline}{" "}
                {parseFloat(consultationDeadline) > 1 ? "days" : "day"} left
              </p>
            )}
        </div>
        <div className="govuk-grid-column-one-half">
          <span
            className={`dsn-tag dsn-tag--${aplicationStageStyle(singleApplicationStatus ?? "")}`}
          >
            {singleApplicationStatus}
          </span>
        </div>
      </div>

      <p className="govuk-body">
        {applicationStageMessage(checkStage, singleApplicationStatus ?? "")}
      </p>
    </div>
  );
};

export default ApplicationStatus;
