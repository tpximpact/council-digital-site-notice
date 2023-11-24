// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createApplication, checkExistingReference } from "../../../util/client";

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

const validateParams = async (req: NextApiRequest, res: NextApiResponse) => {
  const { reference } = req.body;

  if (!reference) {
    res.status(400).json({
      error: { message: "Reference parameter is required" },
    });
    return false;
  }

  // Check if the reference already exists in the database
  const existingApplication = await checkExistingReference(reference);
  if (existingApplication) {
    res.status(400).json({
      error: { message: "Reference must be unique" },
    });
    return false;
  }

  return true;
};

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

  if (!validateParams(req, res)) {
    return;
  }

  const { reference } = req.body;

  const data = {
    reference: reference,
    isActive: true,
    _type: "planning-application",
  };

  try {
    await createApplication(data);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({
      error: { message: "An error occurred while creating the application" },
    });
  }
}
