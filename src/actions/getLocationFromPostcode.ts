"use server";

import { postCodeRegex } from "@/util";

export async function getLocationFromPostcode(postcode: string) {
  if (postCodeRegex.test(postcode)) {
    const postcodeRes = await fetch(
      `https://api.postcodes.io/postcodes/${postcode}`,
    );
    const postcodeData = await postcodeRes.json();

    if (postcodeData.error) {
      // console.log(postcodeData.error);
      return null;
    }

    return postcodeData.result;
  }
  return null;
}
