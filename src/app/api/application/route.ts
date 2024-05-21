// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createApplication,
  updateApplication,
  checkExistingReference,
} from "@/app/actions/sanityClient";
import { validatePlanningParams } from "@/app/actions/validator";
import { verifyApiKey } from "../../lib/apiKey";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { validateUniformData } from "@/app/actions/uniformValidator";

/**
 * @swagger
 * /api/application:
 *   post:
 *     summary: Insert new planning application
 *     security:
 *      - apiKey: []
 *     description: Inserts a new planning application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             applicationNumber: string
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
 *             applicationNumber: 00/12345/ABC
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

/**
 * @swagger
 * /api/application:
 *   put:
 *     summary: Insert new planning application
 *     parameters:
 *      - in: query
 *        name: body
 *        schema:
 *          type: object
 *          example:
 *             _id: g5ft6pk79js
 *             applicationNumber: 00/12345/ABC
 *             applicationType: Full Planning Permission
 *             isActive: true
 *             _type: planning-application
 *        description: Update planning application
 *     responses:
 *       200:
 *         description: returns updated planing applications
           content:
             application/json:
              schema:
 *              details: any
         401:
          description: Not authorized
 */

// export async function GET(req: Request) {
//   // Verify API key
//   const headersList = headers();
//   const referer = headersList.get("authorization");
//   const apiKey = referer as string;
//   const isValidApiKey = verifyApiKey(apiKey);
//   if (!isValidApiKey) {
//     return new Response("Invalid API key", {
//       status: 401,
//     });
//   }
//   const validationErrors = await validatePlanningParams(req.body as any);
//   if (validationErrors.errors.length > 0) {
//     return new Response(`${validationErrors}`, {
//       status: validationErrors.status,
//     });
//   }
//   const {
//     applicationNumber,
//     description,
//     address,
//     applicationType,
//     height,
//     consultationDeadline,
//   } = req.body as any;
//   const data = {
//     applicationNumber,
//     description,
//     address,
//     applicationType,
//     height,
//     consultationDeadline,
//     isActive: true,
//     _type: "planning-application",
//   };
//   try {
//     await createApplication(data);
//     new Response("Success", { status: validationErrors.status });
//   } catch (error) {
//     new Response("An error occurred while creating the application", {
//       status: 500,
//     });
//   }
// }

export async function PUT(req: NextRequest) {
  const errors: string[] = [];
  const success: string[] = [];
  // Verify API key
  const referer = req.headers.get("x-api-key");
  const apiKey = referer as string;
  const isValidApiKey = verifyApiKey(apiKey);

  if (!isValidApiKey) {
    return new Response("Invalid API key", {
      status: 401,
    });
  }

  const body = req.nextUrl.searchParams as any;
  const bodyObj = Object.fromEntries(body);

  // validate
  const validationErrors = await validateUniformData(bodyObj as any);
  if (validationErrors.errors.length > 0) {
    return new Response(`${validationErrors.errors[0]}`, {
      status: validationErrors.status,
    });
  }
  const applicationNumber = req.nextUrl.searchParams.get(
    "applicationNumber",
  ) as string;
  const _id = req.nextUrl.searchParams.get("_id") as string;
  const application = await checkExistingReference(applicationNumber);
  try {
    if (application && application._id) {
      await updateApplication(_id, bodyObj);
      success.push(`${bodyObj.applicationNumber} updated`);
    } else {
      await createApplication(bodyObj);
      success.push(`Application ${bodyObj.applicationNumber} created`);
    }
    return NextResponse.json({ data: { success } });
  } catch (error) {
    errors.push(validationErrors.errors[0].message);
    new Response("An error occurred while creating the application", {
      status: 500,
    });
  }
  return NextResponse.json({ bodyObj });
}
