import {
  checkExistingReference,
  createApplication,
  updateApplication,
} from "@/app/actions/sanityClient";
import { validateUniformData } from "@/app/actions/uniformValidator";
import { checkAllowedUpdateFields } from "../checkAllowedUpdateFields";

export interface ProcessApplicationResponse {
  _id: string | null;
  applicationNumber: string | null;
  planningId: string | null;
  success: boolean;
  message?: string;
  error?: string;
}

async function processApplication(
  application: any,
): Promise<ProcessApplicationResponse> {
  const validationErrors = await validateUniformData(application);
  if (validationErrors.errors.length > 0) {
    return {
      _id: null,
      applicationNumber: application?.applicationNumber ?? null,
      planningId: application?.planningId ?? null,
      success: false,
      message: "Invalid data",
      error: validationErrors.errors[0].message,
    };
  }

  const applicationData = {
    applicationNumber: application["applicationNumber"],
    _type: "planning-application",
    isActive: application["isActive"],
    planningId: application["planningId"],
    applicationType: application["applicationType"],
    name: application["name"],
    description: application["description"],
    address: application["address"],
    applicationStage: application["applicationStage"],
    enableComments: application["enableComments"],
    consultationDeadline: application["consultationDeadline"],
    height: application["height"],
    constructionTime: application["constructionTime"],
    location: application["location"],
    proposedLandUse: application["proposedLandUse"],
    applicationDocumentsUrl: application["applicationDocumentsUrl"],
    applicationUpdatesUrl: application["applicationUpdatesUrl"],
    showOpenSpace: application["showOpenSpace"],
    openSpaceArea: application["openSpaceArea"],
    showHousing: application["showHousing"],
    housing: application["housing"],
    showCarbon: application["showCarbon"],
    carbonEmissions: application["carbonEmissions"],
    showAccess: application["showAccess"],
    access: application["access"],
    showJobs: application["showJobs"],
    jobs: application["jobs"],
  };

  const { applicationNumber, ...updateData } = applicationData;

  if (!applicationNumber) {
    return {
      _id: null,
      applicationNumber: applicationData?.applicationNumber ?? null,
      planningId: applicationData?.planningId ?? null,
      success: false,
      message: "Planning application not updated",
      error: "Missing required field: applicationNumber",
    };
  }

  try {
    const existingApplication = await checkExistingReference(applicationNumber);
    if (existingApplication && existingApplication._id) {
      if (checkAllowedUpdateFields(existingApplication, updateData)) {
        const updated = await updateApplication(
          existingApplication._id,
          updateData,
        );
        return {
          _id: updated._id,
          applicationNumber: updated?.applicationNumber ?? null,
          planningId: updated?.planningId ?? null,
          success: true,
          message: `Application ${applicationNumber} updated`,
        };
      }
      return {
        _id: existingApplication._id,
        applicationNumber: existingApplication?.applicationNumber ?? null,
        planningId: existingApplication?.planningId ?? null,
        success: true,
        message: `Application ${applicationNumber} no update needed`,
      };
    } else {
      const created = await createApplication(applicationData);
      return {
        _id: created._id,
        applicationNumber: created?.applicationNumber ?? null,
        planningId: created?.planningId ?? null,
        success: true,
        message: `Application ${applicationNumber} created`,
      };
    }
  } catch (error) {
    console.error("Error processing application:", error);
    return {
      _id: null,
      applicationNumber: applicationData?.applicationNumber ?? null,
      planningId: applicationData?.planningId ?? null,
      success: false,
      message: "Planning application not updated",
      error: "An error occurred while processing the application",
    };
  }
}

export async function processMultipleApplications(
  applications: any[],
): Promise<ProcessApplicationResponse[]> {
  const results = [];

  for (const application of applications) {
    const result = await processApplication(application);
    results.push(result);
  }

  return results;
}

export { processApplication };
