"use server";

import { sendEmail, createEmailData } from "./email";
import { savefeedbackToGoogleSheet } from "./googleSheet";

export async function saveComments(data: any) {
  try {
    const { applicationNumber, feeling, comment, postcode } = data;

    const emailData = await createEmailData(
      applicationNumber,
      feeling,
      comment,
      postcode,
    );
    await sendEmail(emailData);

    await savefeedbackToGoogleSheet(data);

    return {
      message: "Email sent & google sheet saved successfully",
      status: 200,
      ok: true,
    };
  } catch (err) {}
  return {
    message: "Failed to store comments",
    status: 500,
    ok: false,
  };
}
