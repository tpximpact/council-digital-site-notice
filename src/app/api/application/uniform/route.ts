import {
  createApplication,
  updateApplication,
  checkExistingReference,
} from "@/app/actions/sanityClient";
import { verifyApiKey } from "../../../lib/apiKey";
import { NextRequest, NextResponse } from "next/server";
import {
  validateUniformData,
  applicationNumberValidation,
  isUniformIntegrationEnabled,
} from "@/app/actions/uniformValidator";
import { checkAllowedUpdateFields } from "../../checkAllowedUpdateFields";

interface ApplicationError {
  application: any;
  error: string;
}

interface ApplicationResult {
  success: string[];
  errors: ApplicationError[];
}

/**
 * @swagger
 * /api/application/uniform:
 *   put:
 *     summary: Insert a new planning application or update one if it already exists
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNumber:
 *                 type: string
 *                 example: "1234/5678/A"
 *               planningId:
 *                 type: string
 *                 example: "123"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               applicationType:
 *                 type: string
 *                 example: "Householder Application"
 *               name:
 *                 type: string
 *                 example: "The Test Building"
 *               description:
 *                 type: string
 *                 example: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
 *               address:
 *                 type: string
 *                 example: "1 Test Street, Test Town, Test County, Test Postcode"
 *               applicationStage:
 *                 type: object
 *                 properties:
 *                   stage:
 *                     type: string
 *                     enum: ["consultation", "assessment", "decision", "appeal"]
 *                     description: "The current stage of the application"
 *                   status:
 *                     type: object
 *                     description: "The status within the current stage. Only one property should be present, corresponding to the current stage."
 *                     properties:
 *                       consultation:
 *                         type: string
 *                         enum: ["in progress", "extended"]
 *                       assessment:
 *                         type: string
 *                         enum: ["in progress"]
 *                       decision:
 *                         type: string
 *                         enum: ["approved", "pending approval", "rejected"]
 *                       appeal:
 *                         type: string
 *                         enum: ["in progress", "unsuccessful", "successful"]
 *               enableComments:
 *                 type: boolean
 *                 example: true
 *               consultationDeadline:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *               height:
 *                 type: number
 *                 example: 2.5
 *               constructionTime:
 *                 type: string
 *                 example: "2024-2026"
 *               location:
 *                 type: object
 *                 description: "Geographical location of the application site"
 *                 required:
 *                   - lat
 *                   - lng
 *                 properties:
 *                   lat:
 *                     type: number
 *                     description: "Latitude"
 *                   lng:
 *                     type: number
 *                     description: "Longitude"
 *                   alt:
 *                     type: number
 *                     description: "Altitude (optional)"
 *               proposedLandUse:
 *                 type: object
 *                 properties:
 *                   classB:
 *                     type: boolean
 *                   classC:
 *                     type: boolean
 *                   classE:
 *                     type: boolean
 *                   classF:
 *                     type: boolean
 *                   suiGeneris:
 *                     type: boolean
 *                   suiGenerisDetail:
 *                     type: string
 *               applicationDocumentsUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://www.test.com"
 *               applicationUpdatesUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://www.test.com"
 *               showOpenSpace:
 *                 type: boolean
 *                 example: true
 *               openSpaceArea:
 *                 type: number
 *                 example: 100
 *               showHousing:
 *                 type: boolean
 *                 example: true
 *               housing:
 *                 type: object
 *                 properties:
 *                   residentialUnits:
 *                     type: number
 *                     example: 100
 *                   affordableResidentialUnits:
 *                     type: number
 *                     example: 50
 *               showCarbon:
 *                 type: boolean
 *                 example: true
 *               carbonEmissions:
 *                 type: number
 *                 example: 100
 *               showAccess:
 *                 type: boolean
 *                 example: true
 *               access:
 *                 type: string
 *                 example: "There is a path parallel to the development."
 *               showJobs:
 *                 type: boolean
 *                 example: true
 *               jobs:
 *                 type: object
 *                 properties:
 *                   min:
 *                     type: number
 *                     example: 5
 *                   max:
 *                     type: number
 *                     example: 10
 *             example:
 *               planningId: "123"
 *               isActive: true
 *               applicationNumber: "1234/5678/A"
 *               applicationType: "Householder Application"
 *               name: "The Test Building"
 *               description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
 *               address: "1 Test Street, Test Town, Test County, Test Postcode"
 *               applicationStage: { "stage": "Consultation", "status": { "consultation": "in progress" } }
 *               enableComments: true
 *               consultationDeadline: "2025-01-01"
 *               height: 2
 *               constructionTime: "2024-2026"
 *               location: { "lat": 51.5074, "lng": -0.1278, "alt": 10 }
 *               proposedLandUse: {"classB": false, "classC": false, "classE": false, "classF": false, "suiGeneris": true, "suiGenerisDetail": "Unique use case description"}
 *               applicationDocumentsUrl: "https://www.test.com"
 *               applicationUpdatesUrl: "https://www.test.com"
 *               showOpenSpace: true
 *               openSpaceArea: 100
 *               showHousing: true
 *               housing: { "residentialUnits": 100, "affordableResidentialUnits": 50 }
 *               showCarbon: true
 *               carbonEmissions: 100
 *               showAccess: true
 *               access: "There is a path parallel to the development."
 *               showJobs: true
 *               jobs: { "min": 5, "max": 10 }
 *     responses:
 *       200:
 *         description: Returns updated planning applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: array
 *                       items:
 *                         type: string
 *               example:
 *                 data:
 *                   success:
 *                     - "1234/5678/A updated"
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Not authorized
 *       500:
 *         description: An error occurred while updating the applications
 */
export async function PUT(req: NextRequest) {
  const isUniformEnabled = await isUniformIntegrationEnabled();

  if (!isUniformEnabled)
    return new NextResponse("Uniform integration is not enabled", {
      status: 403,
    });
  // Verify API key
  const referer = req.headers.get("x-api-key");
  const apiKey = referer as string;
  const isValidApiKey = verifyApiKey(apiKey);

  if (!isValidApiKey) {
    return NextResponse.json("Invalid API key", {
      status: 401,
    });
  }
  const data = await req.json();
  const results: ApplicationResult = { success: [], errors: [] };

  // validate
  const validationErrors = await validateUniformData(data as any);
  if (validationErrors.errors.length > 0) {
    results.errors = validationErrors.errors.map((error) => ({
      application: data,
      error: error.message,
    }));
    return NextResponse.json(
      { data: { errors: results.errors } },
      {
        status: validationErrors.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!data || typeof data !== "object") {
    results.errors.push({
      application: data,
      error: "Invalid request body. Expected an object.",
    });
    return NextResponse.json(
      { data: { errors: results.errors } },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const applicationData = {
    applicationNumber: data["applicationNumber"],
    _type: "planning-application",
    isActive: data["isActive"],
    planningId: data["planningId"],
    applicationType: data["applicationType"],
    name: data["name"],
    description: data["description"],
    address: data["address"],
    applicationStage: data["applicationStage"],
    enableComments: data["enableComments"],
    consultationDeadline: data["consultationDeadline"],
    height: data["height"],
    constructionTime: data["constructionTime"],
    location: data["location"],
    proposedLandUse: data["proposedLandUse"],
    applicationDocumentsUrl: data["applicationDocumentsUrl"],
    applicationUpdatesUrl: data["applicationUpdatesUrl"],
    showOpenSpace: data["showOpenSpace"],
    openSpaceArea: data["openSpaceArea"],
    showHousing: data["showHousing"],
    housing: data["housing"],
    showCarbon: data["showCarbon"],
    carbonEmissions: data["carbonEmissions"],
    showAccess: data["showAccess"],
    access: data["access"],
    showJobs: data["showJobs"],
    jobs: data["jobs"],
  };

  const { applicationNumber, ...updateData } = applicationData;

  const checkApplicationNumber =
    await applicationNumberValidation(applicationData);

  if (checkApplicationNumber.errors.length > 0) {
    results.errors = checkApplicationNumber.errors.map((error) => ({
      application: data,
      error: error.message,
    }));
    return NextResponse.json(
      { data: { errors: results.errors } },
      {
        status: checkApplicationNumber.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const existingApplication = await checkExistingReference(
      data["applicationNumber"],
    );
    if (existingApplication && existingApplication._id) {
      // Application found, now update it
      if (checkAllowedUpdateFields(existingApplication, updateData)) {
        // Update the application
        await updateApplication(existingApplication._id, updateData);
        results.success.push(`Application ${applicationNumber} updated`);
      } else {
        results.success.push(
          `Application ${applicationNumber} no update needed`,
        );
      }
    } else {
      await createApplication(applicationData);
      results.success.push(`Application ${data["applicationNumber"]} created`);
    }
    return NextResponse.json({ data: { success: results.success } });
  } catch (error) {
    results.errors.push({
      application: data,
      error: "An error occurred while creating the application",
    });
    return NextResponse.json(
      { data: { errors: results.errors } },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
