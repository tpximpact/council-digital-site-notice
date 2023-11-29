// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createApplication } from "../../../util/client";
import { validatePlanningParams } from "../../../util/validator";

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Insert new planning application
 *     description: Inserts a new planning application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             reference: string
 *           example:
 *             reference: AAA_BBB_CCC_DDD
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

  const validationErrors = await validatePlanningParams(req.body);
  if (validationErrors.errors.length > 0) {
    return res.status(validationErrors.status).json(
      validationErrors
    );
  }

  const { reference, description } = req.body;

  const data = {
    reference,
    description,
    isActive: true,
    _type: "planning-application",
  };

  try {
    await createApplication(data);
    res.status(validationErrors.status).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({
      error: { message: "An error occurred while creating the application" },
    });
  }
}
