"use server";

import { sendEmail, createEmailData } from "./email";
import { savefeedbackToGoogleSheet } from "./email";
import { postCodeRegex } from "../lib/application";
import { cookies } from "next/headers";

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

export async function distanceInMiles(point1: any, point2: any) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = point1.latitude * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = point2.latitude * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (point2.longitude - point1.longitude) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2),
      ),
    );

  return d.toFixed(2);
}

export async function getLocationFromPostcode(postcode: string) {
  if (postCodeRegex.test(postcode)) {
    const postcodeRes = await fetch(
      `https://api.postcodes.io/postcodes/${postcode}`,
    );
    const postcodeData = await postcodeRes.json();

    if (postcodeData.error) {
      console.log(postcodeData.error);
      return null;
    }

    return postcodeData.result;
  }
  return null;
}

export async function getOpenApiUrl() {
  return process.env.OPEN_API_URL || "";
}
