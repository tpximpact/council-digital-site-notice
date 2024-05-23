import {
  createApplication,
  updateApplication,
  checkExistingReference,
} from "@/app/actions/sanityClient";
import { verifyApiKey } from "../../../lib/apiKey";
import { NextRequest, NextResponse } from "next/server";
import { validateUniformData } from "@/app/actions/uniformValidator";

/**
 * @swagger
 * /api/application/uniform:
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
 *         description: returns updated planning applications
 *         content:
 *           application/json:
 *             schema:
 *               details: any
 *       401:
 *         description: Not authorized
 *       500:
 *         message: Internal Error
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

  const body = req.nextUrl.searchParams as any;
  const bodyObj = Object.fromEntries(body);

  // validate
  const validationErrors = await validateUniformData(bodyObj as any);
  if (validationErrors.errors.length > 0) {
    return new NextResponse(`${validationErrors.errors[0]}`, {
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
    return new NextResponse(
      "An error occurred while creating the application",
      {
        status: 500,
      },
    );
  }
}
