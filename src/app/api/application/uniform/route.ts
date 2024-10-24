import { verifyApiKey } from "../../../lib/apiKey";
import { NextRequest, NextResponse } from "next/server";
import { isUniformIntegrationEnabled } from "@/app/actions/uniformValidator";
import { processApplication } from "../../handlers/handler";

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
 *                     description: "Required when suiGeneris is true, must not be present when suiGeneris is false"
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
  if (!isUniformEnabled) {
    return new NextResponse("Uniform integration is not enabled", {
      status: 403,
    });
  }
  // Verify API key
  const referer = req.headers.get("x-api-key");
  const apiKey = referer as string;
  const isValidApiKey = verifyApiKey(apiKey);

  if (!isValidApiKey) {
    return NextResponse.json("Invalid API key", {
      status: 401,
    });
  }

  const body = await req.json();

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return new NextResponse("Invalid request body. Expected an object.", {
      status: 400,
    });
  }

  const result = await processApplication(body);

  if (result.error) {
    return NextResponse.json(
      { data: { errors: [{ application: body, error: result.error }] } },
      { status: 400 },
    );
  }

  return NextResponse.json({ data: { success: [result.success] } });
}
