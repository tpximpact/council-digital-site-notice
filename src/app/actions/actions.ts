"use server";

// import { client } from "./client";
import { sendEmail, createEmailData } from "./email";
import { savefeedbackToGoogleSheet } from "./email";
import { postCodeRegex } from "../lib/application";
import { cookies } from "next/headers";

// export const getGlobalContent = cache(async () => {
//   const info = await client.fetch('*[_type == "global-content"][0]');
//   console.log({ info });
//   return info;
// });

// export async function getApplicationById(id: string) {
//   const query =
//     '*[_type == "planning-application" && (_id == $_id || planningId == $_id) && isActive == true]';
//   const post = await client.fetch(query, { _id: id, planningId: id });

//   if (process.env.NEXT_PUBLIC_DATA_PROVIDER == "OpenData") {
//     // Then fetch the matching data from Camden's API
//     const ids = post.map((development: any) => development.applicationNumber);
//     const arrayToSoqlString = (arr: []) =>
//       "'" + arr.toString().replace(/,/g, "','") + "'";
//     let whereQuery = `application_number in(${arrayToSoqlString(ids)})`;
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}.json?$where=${whereQuery}`,
//     );
//     const data = await res.json();

//     //todo fixed for demo - this can be improved
//     if (data.length == 0) {
//       return post;
//     } else {
//       // Build up the array of developments from the CMS data and the data from Camden's API, mapping from Camden's API so we know we're only showing
//       // developments that exist in M3 and the Planning Explorer
//       const developments = data.map((development: any) => {
//         const siteNotice = post.find(
//           (el: any) => el.applicationNumber == development.application_number,
//         );

//         // Skip if there's no CMS data
//         if (!siteNotice) {
//           return;
//         }

//         let application = {
//           ...siteNotice,
//           applicationType: development.application_type,
//           description: development.development_description,
//           address: development.development_address,
//           name: siteNotice.name
//             ? siteNotice.name
//             : development?.development_address,
//           location: { lng: development.longitude, lat: development.latitude },
//           applicationDocumentsUrl: `http://camdocs.camden.gov.uk/HPRMWebDrawer/PlanRec?q=recContainer:%22${siteNotice.applicationNumber}%22`,
//         };

//         return application;
//       });
//       return developments;
//     }
//   } else {
//     return post;
//   }
// }

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
