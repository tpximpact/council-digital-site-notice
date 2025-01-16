import {
  checkExistingReference,
  createApplication,
  updateApplication,
} from "@/app/actions/sanityClient";
import { validateUniformData } from "@/app/actions/uniformValidator";
import { checkAllowedUpdateFields } from "../checkAllowedUpdateFields";

export interface ApplicationError {
  application: any;
  error: string;
}

export interface ApplicationResult {
  success: string[];
  errors: ApplicationError[];
}

async function processApplication(
  application: any,
): Promise<{ success?: string; error?: string }> {
  const validationErrors = await validateUniformData(application);
  if (validationErrors.errors.length > 0) {
    return { error: validationErrors.errors[0].message };
  }

  if (!application || typeof application !== "object") {
    return { error: "Invalid application data" };
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
    return { error: "Missing required field: applicationNumber" };
  }

  try {
    const existingApplication = await checkExistingReference(applicationNumber);
    if (existingApplication && existingApplication._id) {
      if (checkAllowedUpdateFields(existingApplication, updateData)) {
        await updateApplication(existingApplication._id, updateData);
        return { success: `Application ${applicationNumber} updated` };
      }
      return { success: `Application ${applicationNumber} no update needed` };
    } else {
      await createApplication(applicationData);
      return { success: `Application ${applicationNumber} created` };
    }
  } catch (error) {
    console.error("Error processing application:", error);
    return { error: "An error occurred while processing the application" };
  }
}

export async function processMultipleApplications(
  applications: any[],
): Promise<ApplicationResult> {
  const results: ApplicationResult = { success: [], errors: [] };

  for (const application of applications) {
    const result = await processApplication(application);
    if (result.error) {
      results.errors.push({
        application,
        error: result.error,
      });
    } else if (result.success) {
      results.success.push(result.success);
    }
  }

  return results;
}

export { processApplication };
