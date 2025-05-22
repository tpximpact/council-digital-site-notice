"use server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

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
      // console.error("Missing required environment variables");
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
    // console.log("Google sheet saved successfully");
    return true;
  } catch (e) {
    // console.error("Error: ", e);
    return false;
  }
}
