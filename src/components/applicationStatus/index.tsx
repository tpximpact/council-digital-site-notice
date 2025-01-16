"use client";
import { PlanningApplication } from "../../../sanity/sanity.types";
import {
  consultation,
  assessment,
  decision,
  appeal,
} from "../../../sanity/structure/helper";
import { calculateDaysRemaining, slugify } from "@/util";
import capitaliseFirstLetter from "@/util/capitaliseFirstLetter";

const decisionInformation: Record<string, Record<string, string>> = {
  consultation: {
    "in progress":
      "People in the local community can share feedback and comment on the proposed plans.",
    extended:
      "People in the local community can share feedback and comment on the proposed plans",
  },
  assessment: {
    "in progress":
      "Assessment of the application is being made by the appropriate authorities. People in the local community can still comment on the plans until a decision is made.",
  },
  decision: {
    approved: "This planning application has been approved.",
    "pending approval":
      "This planning application has been approved pending legal confirmation.",
    rejected: "This planning application has been rejected.",
  },
  appeal: {
    "in progress":
      "An appeal has been lodged to try to change the decision about this application.",
    unsuccessful:
      "The initial decision has been upheld in appeal, and the application is still rejected.",
    successful:
      "The initial decision has been overturned in appeal, and the application is now approved.",
  },
};

const statusMap: Record<string, string[]> = {
  consultation: consultation,
  assessment: assessment,
  decision: decision,
  appeal: appeal,
};

const checkValidity = (stage: string, status: string): boolean => {
  const validStatuses = statusMap[stage.toLowerCase()];
  return validStatuses ? validStatuses.includes(status) : false;
};

const ApplicationStatus = ({
  applicationStage,
  consultationDeadline,
}: {
  applicationStage: PlanningApplication["applicationStage"];
  consultationDeadline?: PlanningApplication["consultationDeadline"];
}) => {
  // if (stage === "Consultation" && !consultationDeadline) return null;
  if (!applicationStage) return null;
  let stage = applicationStage.stage;
  const status = Object.values(applicationStage.status)[0];
  const isValid = checkValidity(stage, status);

  const daysRemaining = consultationDeadline
    ? calculateDaysRemaining(consultationDeadline)
    : undefined;

  // If consultation stage and consultation deadline has passed, move to assessment stage
  if (
    stage === "Consultation" &&
    status === "in progress" &&
    daysRemaining !== undefined &&
    daysRemaining <= 0
  ) {
    stage = "Assessment";
  }

  if (!isValid) return null;
  return (
    <div className="dsn-application-status">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <p className="dsn-application-status__heading">
            {capitaliseFirstLetter(stage)}
          </p>
          {/* show days remaining if consultation stage and days remaining is greater than 0 */}
          {stage === "Consultation" &&
            daysRemaining !== undefined &&
            daysRemaining > 0 && (
              <p className="govuk-body">
                <time dateTime={consultationDeadline}>{daysRemaining}</time>{" "}
                {daysRemaining === 1 ? "day" : "days"} left
              </p>
            )}
        </div>
        <div className="govuk-grid-column-one-half">
          <span className={`dsn-tag dsn-tag--${slugify(status)}`}>
            {status}
          </span>
        </div>
      </div>

      {decisionInformation[stage.toLowerCase()][status] && (
        <p className="govuk-body dsn-application-status__decision-information">
          {decisionInformation[stage.toLowerCase()][status]}
        </p>
      )}
    </div>
  );
};

export default ApplicationStatus;
