// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createApplication } from "../../../util/client";
import { validatePlanningParams } from "../../../util/validator";
import { ValidationResult } from "../../../models/validationResult";
import { verifyApiKey } from "../../../util/apiKey";

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
 *              commentDeadline: string
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
 *                commentDeadline: 31/12/2023 12:00:00 am
 *                openSpaceGardens: true
 *     responses:
 *       200:
 *         message: Success
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      error: { message: `Method ${method} Not Allowed` },
    });
    return;
  }

  // Verify API key
  const apiKey = req.headers.authorization as string;
  const isValidApiKey = verifyApiKey(apiKey);
  if (!isValidApiKey) {
    res.status(401).json({
      error: { message: "Invalid API key" },
    });
    return;
  }

  console.log("YO")
  
  let successApplications = [];
  let failedCreationApplcaitons = [];
  let failedValidationApplcaitons = [];

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      const {
        reference,
        description,
        address,
        applicationType,
        applicationStage,
        height,
        developmentType,
        commentDeadline,
        openSpaceGardens,
      } = req.body[key];

      const validationErrors = await validatePlanningParams(req.body[key]);
      if (validationErrors.errors.length > 0) {
        failedValidationApplcaitons.push(
          `An error occurred while validating the application ${reference}`
        );
        continue;
      }

      const data = {
        reference,
        description,
        address,
        applicationType,
        applicationStage,
        height,
        developmentType,
        commentDeadline,
        openSpaceGardens,
        isActive: true,
        _type: "planning-application",
      };

      try {
        await createApplication(data);
        successApplications.push(`Applciation ${reference} created`);
      } catch (error) {
        failedCreationApplcaitons.push(
          `An error occurred while creating the application ${reference}`
        );
      }
    }
  }

  let status = 200;
  let message = "Success";

  if (successApplications.length == 0) {
    status = 400;
    message = "An error has occured";
  } else if (failedCreationApplcaitons.length > 0 || failedValidationApplcaitons.length > 0) {
    status = 207;
    message = "Partial success";
  }

  return res.status(status).json({
    message: message,
    data: {
      successfullyCreated: successApplications,
    },
    errors: {
      failedCreation: failedCreationApplcaitons,
      failedValidation: failedValidationApplcaitons,
    },
  });
}