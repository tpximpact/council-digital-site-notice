import {
  createApplication,
  updateApplication,
  checkExistingReference,
} from "@/app/actions/sanityClient";
import { verifyApiKey } from "../../../lib/apiKey";
import { NextRequest, NextResponse } from "next/server";
import { validateUniformData } from "@/app/actions/uniformValidator";

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
 *     summary: Insert new planning application
 *     requestBody:
 *        required: true
 *        content:
 *            schema:
 *              type: object
 *              example:
 *                "DCAPPL[REFVAL]": "25553/5377/HSE"
 *                "DCAPPL[BLPU_CLASS_DESC]": "Residential, Dwellings, Semi-Detached hello"
 *                "DCAPPL[Application Type_D]": "Householder Application"
 *     responses:
 *       200:
 *         description: returns updated planning applications
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Not authorized
 *       500:
 *         description: An error occurred while updating the applications
 *
 */

export async function PUT(req: NextRequest) {
  const errors: string[] = [];
  const success: string[] = [];
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
    return NextResponse.json(
      JSON.stringify({ errors: validationErrors.errors }),
      {
        status: validationErrors.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!data || typeof data !== "object") {
    return new NextResponse("Invalid request body. Expected an object.", {
      status: 400,
    });
  }

  const applicationData = {
    applicationNumber: data["DCAPPL[REFVAL]"],
    description: data["DCAPPL[BLPU_CLASS_DESC]"],
    applicationType: data["DCAPPL[Application Type_D]"],
    isActive: true,
    _type: "planning-application",
  };

  if (!applicationData?.applicationNumber) {
    return new NextResponse("Missing required field: applicationNumber", {
      status: 400,
    });
  }

  try {
    const existingApplication = await checkExistingReference(
      data["DCAPPL[REFVAL]"],
    );
    if (existingApplication && existingApplication._id) {
      // Application found, now update it
      await updateApplication(existingApplication._id, applicationData);
      success.push(`${data["DCAPPL[REFVAL]"]} updated`);
    } else {
      await createApplication(applicationData);
      success.push(`Application ${data["DCAPPL[REFVAL]"]} created`);
    }
    return NextResponse.json({ data: { success } });
  } catch (error) {
    errors.push(validationErrors.errors[0].message);
    new NextResponse("An error occurred while creating the application", {
      status: 500,
    });
  }
}
