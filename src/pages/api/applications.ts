// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createApplication } from "../../../util/client";

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
  }

  const { reference } = req.body;

  const data = {
    reference: reference,
    isActive: true,
    _type: "planning-application",
  };

  var result = await createApplication(data).then((data) => {
    return res.status(200).json({ message: "Success" });
  });
}
