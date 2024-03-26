import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail, createEmailData } from "../../util/sendService";
import { savefeedbackToGoogleSheet } from "../../util/google";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { applicationNumber, feeling, comment, postcode } = req.body;
      const emailData = await createEmailData(
        applicationNumber,
        feeling,
        comment,
        postcode,
      );
      await sendEmail(emailData);

      await savefeedbackToGoogleSheet(req.body);

      res
        .status(200)
        .json({ message: "Email sent & google sheet saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to store comments" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
