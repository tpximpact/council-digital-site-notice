import {
  checkExistingReference,
  updateApplication,
  createApplication,
} from "@/app/actions/sanityClient";
import {
  validateUniformData,
  isUniformIntegrationEnabled,
} from "@/app/actions/uniformValidator";
import { verifyApiKey } from "@/app/lib/apiKey";
import { NextRequest, NextResponse } from "next/server";
import { checkAllowedUpdateFields } from "../../checkAllowedUpdateFields";

interface ApplicationError {
  application: any;
  error: string;
}

interface ApplicationResult {
  success: string[];
  errors: ApplicationError[];
}

/**
 * @swagger
 * /api/applications/uniform:
 *   put:
 *     summary: Update multiple planning applications or create new ones if they don't exist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 DCAPPL[REFVAL]:
 *                   type: string
 *                 DCAPPL[KeyVal]:
 *                  type: string
 *                 DCAPPL[PROPOSAL]:
 *                   type: string
 *                 DCAPPL[DCAPPTYP_CNCODE_CODETEXT]:
 *                   type: string
 *                 DCAPPL[ADDRESS]:
 *                   type: string
 *                 DCAPPL[Application_Documents_URL]:
 *                   type: string
 *                 DCAPPL[DATEEXPNEI]:
 *                   type: string
 *                 DCAPPL[BLD_HGT]:
 *                   type: number
 *                 DCAPPL[DCGLAUSE]:
 *                   type: object
 *                   properties:
 *                     classB:
 *                       type: boolean
 *                       default: false
 *                     classC:
 *                       type: boolean
 *                       default: false
 *                     classE:
 *                       type: boolean
 *                       default: false
 *                     classF:
 *                       type: boolean
 *                       default: false
 *                     suiGeneris:
 *                       type: boolean
 *                       default: false
 *           example:
 *               - "DCAPPL[REFVAL]": "1234/5678/A"
 *                 "DCAPPL[KeyVal]": "123"
 *                 "DCAPPL[PROPOSAL]": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
 *                 "DCAPPL[DCAPPTYP_CNCODE_CODETEXT]": "Full Planning Permission"
 *                 "DCAPPL[ADDRESS]": "1 Test Street, Test Town, Test County, Test Postcode"
 *                 "DCAPPL[Application_Documents_URL]": "https://www.test.com"
 *                 "DCAPPL[DATEEXPNEI]": "2025-01-01"
 *                 "DCAPPL[BLD_HGT]": 2.5
 *                 "DCAPPL[DCGLAUSE]": {"classB": true, "classC": false, "classE": false, "classF": false, "suiGeneris": false}
 *               - "DCAPPL[REFVAL]": "9876/5432/A"
 *                 "DCAPPL[KeyVal]": "123"
 *                 "DCAPPL[PROPOSAL]": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
 *                 "DCAPPL[DCAPPTYP_CNCODE_CODETEXT]": "Full Planning Permission"
 *                 "DCAPPL[ADDRESS]": "2 Test Street, Test Town, Test County, Test Postcode"
 *                 "DCAPPL[Application_Documents_URL]": "https://www.test.com"
 *                 "DCAPPL[DATEEXPNEI]": "2025-01-01"
 *                 "DCAPPL[BLD_HGT]": 2.5
 *                 "DCAPPL[DCGLAUSE]": {"classB": true, "classC": false, "classE": false, "classF": false, "suiGeneris": false}
 *     responses:
 *       '200':
 *         description: Returns updated planning applications
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                example: 
 *                  data: {
 *                    success: [
                        "Application 1234/5678/A no update needed",
                        "Application 9876/5432/A updated"
                      ]}
 *       '400':
 *         description: Invalid request body or missing required fields
 *       '401':
 *         description: Not authorized
 *       '403':
 *         description: Forbidden
 *       '207':
 *         description: Some applications were updated or created, while others failed
 *       '500':
 *         description: An error occurred while updating the applications
 */
export async function PUT(req: NextRequest) {
  const isUniformEnabled = await isUniformIntegrationEnabled();

  if (!isUniformEnabled)
    return new NextResponse("Uniform integration is not enabled", {
      status: 403,
    });
  // Verify API key
  const referer = req.headers.get("x-api-key");
  const apiKey = referer as string;
  const isValidApiKey = verifyApiKey(apiKey);
  if (!isValidApiKey) {
    return new NextResponse("Invalid API key", { status: 401 });
  }

  const body = await req.json();

  if (!Array.isArray(body)) {
    return new NextResponse("Invalid request body. Expected an array.", {
      status: 400,
    });
  }

  const results: ApplicationResult = { success: [], errors: [] };

  for (const application of body) {
    const validationErrors = await validateUniformData(application);
    if (validationErrors.errors.length > 0) {
      results.errors.push({
        application,
        error: validationErrors.errors[0].message,
      });
      continue;
    }

    if (!application || typeof application !== "object") {
      results.errors.push({
        application,
        error: "Invalid application data",
      });
      continue;
    }
    const applicationData = {
      applicationNumber: application["DCAPPL[REFVAL]"],
      planningId: application["DCAPPL[KeyVal]"],
      description: application["DCAPPL[PROPOSAL]"],
      applicationType: application["DCAPPL[DCAPPTYP_CNCODE_CODETEXT]"],
      isActive: true,
      _type: "planning-application",
      address: application["DCAPPL[ADDRESS]"],
      applicationDocumentsUrl: application["DCAPPL[Application_Documents_URL]"],
      consultationDeadline: application["DCAPPL[DATEEXPNEI]"],
      height: application["DCAPPL[BLD_HGT]"],
      proposedLandUse: application["DCAPPL[DCGLAUSE]"],
    };

    const { applicationNumber, ...updateData } = applicationData;

    if (!applicationNumber) {
      results.errors.push({
        application,
        error: "Missing required field: applicationNumber",
      });
      continue;
    }

    try {
      const existingApplication =
        await checkExistingReference(applicationNumber);
      if (existingApplication && existingApplication._id) {
        // Application found, check if update is needed
        if (checkAllowedUpdateFields(existingApplication, updateData)) {
          // Update the application
          await updateApplication(existingApplication._id, updateData);
          results.success.push(`Application ${applicationNumber} updated`);
        } else {
          results.success.push(
            `Application ${applicationNumber} no update needed`,
          );
        }
      } else {
        // Application not found, create a new one
        const newApplication = {
          applicationNumber,
          ...updateData,
        };
        await createApplication(newApplication);
        results.success.push(`Application ${applicationNumber} created`);
      }
    } catch (error) {
      console.error("Error updating application:", error);
      results.errors.push({
        application,
        error: "An error occurred while updating the application",
      });
    }
  }

  // Handle different response scenarios
  if (results.success.length === 0 && results.errors.length === 0) {
    return new NextResponse("No applications provided", { status: 400 });
  } else if (results.success.length === 0 && results.errors.length > 0) {
    return new NextResponse(
      JSON.stringify({ data: { errors: results.errors } }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } else if (results.errors.length > 0) {
    return new NextResponse(JSON.stringify({ data: results }), {
      status: 207,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return NextResponse.json({ data: { success: results.success } });
  }
}
