"use server";

import { revalidateTag } from "next/cache";
import { client } from "./client";
import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail, createEmailData } from "./sendService";
import { savefeedbackToGoogleSheet } from "./google";
import { cookies } from "next/headers";

export async function getGlobalContent() {
  const info = await client.fetch('*[_type == "global-content"][0]', {
    next: { tags: ["globalContent"] },
  });
  // revalidateTag("globalContent");
  return info;
}

export async function globalContentRevalidate() {
  revalidateTag("globalContent");
}

export async function createCookies(value: any) {
  const cookieStore = cookies();
  cookieStore.set("isShowCookie", "false"),
    cookieStore.set("isConsentCookie", value);
}

export async function handlerComments(
  // req: NextApiRequest,
  // res: NextApiResponse,
  { data }: any,
) {
  // if (req.method === "POST") {
  try {
    const stringData = JSON.parse(data);
    const { applicationNumber, feeling, comment, postcode } = stringData;
    const emailData = await createEmailData(
      applicationNumber,
      feeling,
      comment,
      postcode,
    );

    await sendEmail(emailData);

    await savefeedbackToGoogleSheet(data);

    // res
    //   .status(200)
    //   .json({ message: "Email sent & google sheet saved successfully" });
    return {
      message: "Email sent & google sheet saved successfully",
      status: 200,
    };
  } catch (error) {
    return { message: "Failed to store comments", status: 500 };
  }
  // } else {
  //   res.status(405).json({ message: "Method not allowed" });
}
// }
