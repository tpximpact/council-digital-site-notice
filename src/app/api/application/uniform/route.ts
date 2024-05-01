import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyApiKey } from "@/app/lib/apiKey";
import { validateUniformData } from "@/app/actions/validators/uniformValidator";
import {
  createApplication,
  updateApplication,
  checkExistingReference,
} from "@/app/actions/actions";

export async function POST(req: Request) {
  const errors: string[] = [];
  const success: string[] = [];
  const authorization = headers().get("authorization") as string;
  console.log("KEY", authorization);
  const isValidApiKey = verifyApiKey(authorization);
  if (!isValidApiKey) {
    return new Response("Invalid API key", {
      status: 401,
    });
  }

  const data = await req.json();

  const validationErrors = await validateUniformData(data);
  console.log(validationErrors);
  if (validationErrors.errors.length > 0) {
    return new Response(JSON.stringify({ errors: validationErrors.errors }), {
      status: validationErrors.status,
      headers: { "Content-Type": "application/json" },
    });
  }
  const applicationData = {
    applicationNumber: data["DCAPPL[REFVAL]"],
    description: data["DCAPPL[BLPU_CLASS_DESC]"],
    applicationType: data["DCAPPL[Application Type_D]"],
    isActive: true,
    _type: "planning-application",
  };
  try {
    console.log("DATA", data);

    //if applicationId exists update otherwise create
    const application = await checkExistingReference(data["DCAPPL[REFVAL]"]);
    console.log("ID", application);
    if (application && application._id) {
      console.log("EXISTS");
      await updateApplication(application._id, applicationData);
      success.push(`Applciation ${data["DCAPPL[REFVAL]"]} updated`);
    } else {
      console.log("CREATES");
      await createApplication(applicationData);
      success.push(`Applciation ${data["DCAPPL[REFVAL]"]} created`);
    }
    return NextResponse.json({ data: { success } });
  } catch (error) {
    errors.push(validationErrors.errors[0].message);
    new Response("An error occurred while creating the application", {
      status: 500,
    });
  }
  return NextResponse.json({ data });
}
