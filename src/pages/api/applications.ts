// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createPost } from "../../../util/client";

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

  const { title, description } = req.body;

  const data = {
    title: title,
    description: description,
    isActive: true,
    _type: "post",
  };

  var result = await createPost(data).then((data) => {
    return res.status(200).json({ message: "Success" });
  });
}
