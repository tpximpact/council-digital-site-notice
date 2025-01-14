"use server";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import sgMail from "@sendgrid/mail";
import { EmailJSON } from "@sendgrid/helpers/classes/email-address";

export async function savefeedbackToGoogleSheet(data: any): Promise<boolean> {
  try {
    const {
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_SERVICE_PRIVATE_KEY,
      COMMENT_SPREADSHEET_ID,
    } = process.env;

    if (
      !GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !GOOGLE_SERVICE_PRIVATE_KEY ||
      !COMMENT_SPREADSHEET_ID
    ) {
      console.error("Missing required environment variables");
      return false;
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      COMMENT_SPREADSHEET_ID,
      serviceAccountAuth,
    );
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow(data);
    console.log("Google sheet saved successfully");
    return true;
  } catch (e) {
    console.error("Error: ", e);
    return false;
  }
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailOptions {
  to: string;
  from: EmailJSON;
  subject: string;
  html: string;
}

export const createEmailData = async (
  applicationNumber: string,
  feeling: string,
  comment?: string,
  postcode?: string,
) => {
  return {
    to: process.env.FEEDBACK_TO_EMAIL!,
    from: {
      email: process.env.FEEDBACK_FROM_EMAIL!,
      name: "Camden Digital Site Notice",
    },
    subject: `New feedback for planning application ${applicationNumber}`,
    html: `<h1>New feedback for planning application ${applicationNumber}</h1>
        <h2>Feeling</h2>
        <p>${feeling}</p>
        <h2>Feedback</h2>
        <p>${comment ? comment : "Not provided"}</p>
        <h2>Postcode</h2>
        <p>${postcode ? postcode : "Not provided"}</p>`,
  };
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    await sgMail.send(options);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
