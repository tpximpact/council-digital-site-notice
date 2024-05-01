import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyApiKey } from "@/app/lib/apiKey";
import { validateUniformData } from "@/app/actions/validators/uniformValidator";
import {
  createApplication,
  updateApplication,
  checkExistingReference,
} from "@/app/actions/actions";
import { UniformValidationType } from "@/app/actions/validators/uniformValidator";
import { Data } from "@/app/lib/type";

type ApplicationData = {
  applicationNumber: string;
  description: string;
  applicationType: string;
  isActive: boolean;
  _type: string;
};

export async function POST(req: NextRequest) {
  const errors: string[] = [];
  const success: string[] = [];
  const authorization = headers().get("authorization") as string;
  const isValidApiKey = verifyApiKey(authorization);
  if (!isValidApiKey) {
    return new Response("Invalid API key", {
      status: 401,
    });
  }

  const dataArray = (await req.json()) as Array<UniformValidationType>;

  for (const data of dataArray) {
    console.log("DATA", data);
    const validationErrors = await validateUniformData(data);
    console.log(validationErrors);

    if (validationErrors.errors.length > 0) {
      errors.push(validationErrors.errors[0].message);
    }

    try {
      //if applicationId exists update otherwise create
      await createOrUpdateSanityRecord(data, success);
    } catch (error) {
      errors.push("An error occurred while creating the application");
    }
  }

  return NextResponse.json({ data: { success, errors } });
}

async function createOrUpdateSanityRecord(
  data: {
    "DCAPPL[REFVAL]": string;
    "DCAPPL[BLPU_CLASS_DESC]"?: string | undefined;
    "DCAPPL[Application Type_D]"?: string | undefined;
  },
  success: string[],
) {
  const applicationData: ApplicationData = {
    applicationNumber: data["DCAPPL[REFVAL]"],
    description: data["DCAPPL[BLPU_CLASS_DESC]"] ?? "",
    applicationType: data["DCAPPL[Application Type_D]"] ?? "",
    isActive: true,
    _type: "planning-application",
  };

  const application = await checkExistingReference(data["DCAPPL[REFVAL]"]);

  if (application && application._id) {
    console.log("EXISTS");

    // if values in the application are different from the data, update
    if (checkAllowedUpdateFields(application, data)) {
      await updateApplication(application._id, applicationData);
      success.push(`Applciation ${data["DCAPPL[REFVAL]"]} updated`);
    } else {
      success.push(`Applciation ${data["DCAPPL[REFVAL]"]} no update needed`);
    }
  } else {
    console.log("CREATES");
    await createApplication(applicationData);
    success.push(`Applciation ${data["DCAPPL[REFVAL]"]} created`);
  }
}

function checkAllowedUpdateFields(
  application: Data,
  data: {
    "DCAPPL[REFVAL]": string;
    "DCAPPL[BLPU_CLASS_DESC]"?: string | undefined;
    "DCAPPL[Application Type_D]"?: string | undefined;
  },
) {
  return (
    application.applicationType !== data["DCAPPL[Application Type_D]"] ||
    application.description !== data["DCAPPL[BLPU_CLASS_DESC]"]
  );
}
