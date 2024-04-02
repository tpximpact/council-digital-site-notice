// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createApplication } from "../../../../util/actions/actions";
import { validatePlanningParams } from "../../../../util/actions/validator";
import { ValidationResult } from "../../../../models/validationResult";
import { verifyApiKey } from "../../../../util/helpers/apiKey";
import { headers } from "next/headers";

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Insert array of new planning application
 *     description: Inserts a new planning application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: array
 *            items:
 *              reference: string
 *              description: string
 *              address: string
 *              applicationType: string
 *              applicationStage: string
 *              height: string
 *              developmentType: string
 *              consultationDeadline: string
 *              openSpaceGardens: boolean
 *              affordableHousing: string
 *              c02Emissions: string
 *              airQuality: string
 *           example:
 *              - reference: 00/12345/ABC
 *                description: Lorem ipsum dolor sit amet, consectetur adipiscing elit
 *                address: 123 Example Street Name Town Name City
 *                applicationType: Full Planning Permission
 *                applicationStage: PCO
 *                height: 14
 *                developmentType: Change of Use
 *                consultationDeadline: 31/12/2023 12:00:00 am
 *                openSpaceGardens: true
 *     responses:
 *       200:
 *         message: Success
 */

export async function GET(req: Request) {
  const headersList = headers();
  const referer = headersList.get("authorization");

  // Verify API key
  const apiKey = referer as string;
  const isValidApiKey = verifyApiKey(apiKey);
  if (!isValidApiKey) {
    return new Response("Invalid API key", {
      status: 401,
    });
  }
  let successApplications = [];
  let failedCreationApplcaitons = [];
  let failedValidationApplcaitons = [];

  for (let key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      const {
        applicationNumber,
        description,
        address,
        applicationType,
        applicationStage,
        height,
        consultationDeadline,
      } = req.body as any;

      const validationErrors = await validatePlanningParams(req.body as any);
      if (validationErrors.errors.length > 0) {
        failedValidationApplcaitons.push(
          `An error occurred while validating the application ${applicationNumber}`,
        );
        continue;
      }

      const data = {
        applicationNumber,
        description,
        address,
        applicationType,
        applicationStage,
        height,
        consultationDeadline,
        isActive: false,
        _type: "planning-application",
      };

      try {
        await createApplication(data);
        successApplications.push(`Applciation ${applicationNumber} created`);
      } catch (error) {
        failedCreationApplcaitons.push(
          `An error occurred while creating the application ${applicationNumber}`,
        );
      }
    }
  }

  let status = 200;
  let message = "Success";

  if (successApplications.length == 0) {
    status = 400;
    message = "An error has occured";
  } else if (
    failedCreationApplcaitons.length > 0 ||
    failedValidationApplcaitons.length > 0
  ) {
    status = 207;
    message = "Partial success";
  }
  return new Response(message, {});
}
