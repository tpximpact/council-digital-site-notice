// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createPost } from "../../../util/client";

/**
 * @swagger
 * /api/applications:
 *   post:
 *     description: inserts a new planning application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             applicationId: string
 *           example:
 *             applicationId: AAA_BBB_CCC_DDD
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

  const { applicationId } = req.body;

  const data = {
    applicationId: applicationId,
    _type: "planning-application",
  };

  var result = await createPost(data).then((data) => {
    return res.status(200).json({ message: "Success" });
  });
}
