// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createApplication } from "@/app/actions/actions";
import { validatePlanningParams } from "@/app/actions/validator";
import { verifyApiKey } from "../../lib/apiKey";
import type { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * @swagger
 * /api/application:
 *   post:
 *     summary: Insert new planning application
 *     description: Inserts a new planning application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             reference: string
 *             description: string
 *             address: string
 *             applicationType: string
 *             height: string
 *             developmentType: string
 *             consultationDeadline: string
 *             openSpaceGardens: boolean
 *             affordableHousing: string
 *             c02Emissions: string
 *             airQuality: string
 *           example:
 *             reference: 00/12345/ABC
 *             description: Lorem ipsum dolor sit amet, consectetur adipiscing elit
 *             address: 123 Example Street Name Town Name City
 *             applicationType: Full Planning Permission
 *             height: 14
 *             developmentType: Change of Use
 *             consultationDeadline: 31/12/2023 12:00:00 am
 *             openSpaceGardens: true
 *     responses:
 *       200:
 *         message: Success
 */

export async function GET(req: Request) {
  // Verify API key
  const headersList = headers();
  const referer = headersList.get("authorization");
  const apiKey = referer as string;
  const isValidApiKey = verifyApiKey(apiKey);
  if (!isValidApiKey) {
    return new Response("Invalid API key", {
      status: 401,
    });
  }
  const validationErrors = await validatePlanningParams(req.body as any);
  if (validationErrors.errors.length > 0) {
    return new Response(`${validationErrors}`, {
      status: validationErrors.status,
    });
  }
  const {
    applicationNumber,
    description,
    address,
    applicationType,
    height,
    consultationDeadline,
  } = req.body as any;
  const data = {
    applicationNumber,
    description,
    address,
    applicationType,
    height,
    consultationDeadline,
    isActive: true,
    _type: "planning-application",
  };
  try {
    await createApplication(data);
    new Response("Success", { status: validationErrors.status });
  } catch (error) {
    new Response("An error occurred while creating the application", {
      status: 500,
    });
  }
}
