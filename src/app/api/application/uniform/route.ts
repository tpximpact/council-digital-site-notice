import {
  createApplication,
  updateApplication,
  checkExistingReference,
} from "@/app/actions/sanityClient";
import { verifyApiKey } from "../../../lib/apiKey";
import { NextRequest, NextResponse } from "next/server";
import {
  validateUniformData,
  applicationNumberValidation,
  isUniformIntegrationEnabled,
} from "@/app/actions/uniformValidator";
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
 * /api/application/uniform:
 *   put:
 *     summary: Insert a new planning application or update one if it already exists
 *     requestBody:
 *        required: true
 *        content:
 *            schema:
 *              type: object
 *              example:
 *                "DCAPPL[KeyVal]": "123"
 *                "DCAPPL[REFVAL]": "1234/5678/A"
 *                "DCAPPL[DCAPPTYP_CNCODE_CODETEXT]": "Householder Application"
 *                "DCAPPL[PROPOSAL]": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
 *                "DCAPPL[ADDRESS]": "1 Test Street, Test Town, Test County, Test Postcode"
 *                "DCAPPL[Application_Documents_URL]": "https://www.test.com"
 *                "DCAPPL[DATEEXPNEI]": "2025-01-01"
 *                "DCAPPL[BLD_HGT]": 2.5
 *                "DCAPPL[DCGLAUSE]": {"classB": true, "classC": false, "classE": false, "classF": false, "suiGeneris": false}
 *     responses:
 *       200:
 *         description: returns updated planning applications
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                example: 
 *                  data: {
 *                    success: [
                        "1234/5678/A updated"
                      ]}
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Not authorized
 *       500:
 *         description: An error occurred while updating the applications
 *
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
    return NextResponse.json("Invalid API key", {
      status: 401,
    });
  }
  const data = await req.json();
  const results: ApplicationResult = { success: [], errors: [] };

  // validate
  const validationErrors = await validateUniformData(data as any);
  if (validationErrors.errors.length > 0) {
    results.errors = validationErrors.errors.map((error) => ({
      application: data,
      error: error.message,
    }));
    return NextResponse.json(
      { data: { errors: results.errors } },
      {
        status: validationErrors.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!data || typeof data !== "object") {
    results.errors.push({
      application: data,
      error: "Invalid request body. Expected an object.",
    });
    return NextResponse.json(
      { data: { errors: results.errors } },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  console.log(data, "data");

  const applicationData = {
    applicationNumber: data["DCAPPL[REFVAL]"],
    planningId: data["DCAPPL[KeyVal]"],
    description: data["DCAPPL[PROPOSAL]"],
    applicationType: data["DCAPPL[DCAPPTYP_CNCODE_CODETEXT]"],
    isActive: true,
    _type: "planning-application",
    address: data["DCAPPL[ADDRESS]"],
    applicationDocumentsUrl: data["DCAPPL[Application_Documents_URL]"],
    consultationDeadline: data["DCAPPL[DATEEXPNEI]"],
    height: data["DCAPPL[BLD_HGT]"],
    proposedLandUse: data["DCAPPL[DCGLAUSE]"],
  };

  const { applicationNumber, ...updateData } = applicationData;

  const checkApplicationNumber =
    await applicationNumberValidation(applicationData);

  if (checkApplicationNumber.errors.length > 0) {
    results.errors = checkApplicationNumber.errors.map((error) => ({
      application: data,
      error: error.message,
    }));
    return NextResponse.json(
      { data: { errors: results.errors } },
      {
        status: checkApplicationNumber.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const existingApplication = await checkExistingReference(
      data["DCAPPL[REFVAL]"],
    );
    if (existingApplication && existingApplication._id) {
      // Application found, now update it
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
      await createApplication(applicationData);
      results.success.push(`Application ${data["DCAPPL[REFVAL]"]} created`);
    }
    return NextResponse.json({ data: { success: results.success } });
  } catch (error) {
    results.errors.push({
      application: data,
      error: "An error occurred while creating the application",
    });
    return NextResponse.json(
      { data: { errors: results.errors } },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
