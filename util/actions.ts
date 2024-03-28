"use server";

import { revalidateTag } from "next/cache";
import { client } from "./client";
import { sendEmail, createEmailData } from "./sendService";
import { savefeedbackToGoogleSheet } from "./google";
import { cookies } from "next/headers";

export async function getGlobalContent() {
  const info = await client.fetch('*[_type == "global-content"][0]', {
    next: { tags: ["globalContent"] },
  });
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
