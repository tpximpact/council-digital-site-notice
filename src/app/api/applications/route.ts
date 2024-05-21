// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  checkExistingReference,
  createApplication,
  updateApplication,
} from "@/app/actions/sanityClient";
import { validatePlanningParams } from "@/app/actions/validator";
import { ValidationResult } from "../../../../models/validationResult";
import { verifyApiKey } from "../../lib/apiKey";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/applications:
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
 *                 _id:
 *                   type: string
 *                 applicationNumber:
 *                   type: string
 *                 description:
 *                   type: string
 *             example:
 *               - _id: abc123
 *                 applicationNumber: 0850/1235/C
 *                 description: Lorem ipsum dolor sit amet, consectetur adipiscing elit
 *                 address: 123 Example Street Name Town Name City
 *                 applicationType: Full Planning Permission
 *                 height: 14
 *                 developmentType: Change of Use
 *                 consultationDeadline: 31/12/2023 12:00:00 am
 *                 openSpaceGardens: true
 *               - _id: def456
 *                 applicationNumber: 0034/6789/F
 *                 description: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
 *                 address: 123 Example Street Name Town Name City
 *                 applicationType: Full Planning Permission
 *                 height: 14
 *                 developmentType: Change of Use
 *                 consultationDeadline: 31/12/2023 12:00:00 am
 *                 openSpaceGardens: true
 *     responses:
 *       200:
 *         description: Returns updated planning applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: any
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: An error occurred while updating the applications
 */

export async function PUT(req: NextRequest) {
  // Verify API key
  const referer = req.headers.get("x-api-key");
  const apiKey = referer as string;
  const isValidApiKey = verifyApiKey(apiKey);

  if (!isValidApiKey) {
    return new Response("Invalid API key", { status: 401 });
  }

  const body = await req.json();

  if (!Array.isArray(body)) {
    return new NextResponse("Invalid request body. Expected an array.", {
      status: 400,
    });
  }

  const updatedApplications = [];

  for (const application of body) {
    if (!application || typeof application !== "object") {
      return new NextResponse("Invalid application data", { status: 400 });
    }

    const { applicationNumber, ...updateData } = application;

    if (!applicationNumber) {
      return new NextResponse("Missing required field: applicationNumber", {
        status: 400,
      });
    }

    try {
      const existingApplication =
        await checkExistingReference(applicationNumber);

      if (existingApplication) {
        // Application found, update it
        const updatedApplication = await updateApplication(
          existingApplication._id,
          updateData,
        );
        updatedApplications.push(updatedApplication);
      } else {
        // Application not found, create a new one
        const newApplication = {
          _type: "planning-application",
          applicationNumber,
          ...updateData,
        };
        const createdApplication = await createApplication(newApplication);
        updatedApplications.push(createdApplication);
      }
    } catch (error) {
      console.error("Error updating application:", error);
      return new NextResponse(
        "An error occurred while updating the application",
        {
          status: 500,
        },
      );
    }
  }

  return NextResponse.json(updatedApplications);
}
