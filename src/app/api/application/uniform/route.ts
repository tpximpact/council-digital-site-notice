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
} from "@/app/actions/uniformValidator";

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
 *                "DCAPPL[REFVAL]": "25553/5377/HSE"
 *                "DCAPPL[BLPU_CLASS_DESC]": "Residential, Dwellings, Semi-Detached"
 *                "DCAPPL[Application Type_D]": "Householder Application"
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
                        "25553/5377/HSE updated"
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

  const applicationData = {
    applicationNumber: data["DCAPPL[REFVAL]"],
    description: data["DCAPPL[BLPU_CLASS_DESC]"],
    applicationType: data["DCAPPL[Application Type_D]"],
    isActive: true,
    _type: "planning-application",
  };

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
      await updateApplication(existingApplication._id, applicationData);
      results.success.push(`${data["DCAPPL[REFVAL]"]} updated`);
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
