import { sendEmail, createEmailData } from "../../../../util/sendService";
import { savefeedbackToGoogleSheet } from "../../../../util/google";

export async function POST(req: Request) {
  try {
    const { applicationNumber, feeling, comment, postcode } = await req.json();
    const emailData = await createEmailData(
      applicationNumber,
      feeling,
      comment,
      postcode,
    );
    await sendEmail(emailData);

    await savefeedbackToGoogleSheet(req.body);
    return Response.json({
      status: 200,
    });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
