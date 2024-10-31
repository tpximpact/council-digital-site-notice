import {
  checkExistingReference,
  updateApplication,
  createApplication,
} from "@/app/actions/sanityClient";
import {
  validateUniformData,
  isUniformIntegrationEnabled,
} from "@/app/actions/uniformValidator";
import { verifyApiKey } from "@/app/lib/apiKey";
import { NextRequest, NextResponse } from "next/server";
import { processMultipleApplications } from "../../handlers/handler";

/**
 * @swagger
 * /api/applications/uniform:
 *   put:
 *     summary: Update multiple planning applications or create new ones if they don't exist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 applicationNumber:
 *                   type: string
 *                 isActive:
 *                   type: boolean
 *                 planningId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 applicationType:
 *                   type: string
 *                 address:
 *                   type: string
 *                 applicationDocumentsUrl:
 *                   type: string
 *                 applicationUpdatesUrl:
 *                   type: string
 *                 consultationDeadline:
 *                   type: string
 *                 height:
 *                   type: number
 *                 proposedLandUse:
 *                   type: object
 *                   properties:
 *                     classB:
 *                       type: boolean
 *                       default: false
 *                     classC:
 *                       type: boolean
 *                       default: false
 *                     classE:
 *                       type: boolean
 *                       default: false
 *                     classF:
 *                       type: boolean
 *                       default: false
 *                     suiGeneris:
 *                       type: boolean
 *                       default: false
 *                     suiGenerisDetail:
 *                       type: string
 *                       description: "Required when suiGeneris is true, must not be present when suiGeneris is false"
 *                 applicationStage:
 *                   type: object
 *                   properties:
 *                     stage:
 *                       type: string
 *                       enum: ["Consultation", "Assessment", "Decision", "Appeal"]
 *                       description: "The current stage of the application"
 *                     status:
 *                       type: object
 *                       description: "The status within the current stage. Only one property should be present, corresponding to the current stage."
 *                       properties:
 *                         consultation:
 *                           type: string
 *                           enum: ["in progress", "extended"]
 *                         assessment:
 *                           type: string
 *                           enum: ["in progress"]
 *                         decision:
 *                           type: string
 *                           enum: ["approved", "pending approval", "rejected"]
 *                         appeal:
 *                           type: string
 *                           enum: ["in progress", "unsuccessful", "successful"]
 *                 location:
 *                   type: object
 *                   description: "Geographical location"
 *                   required:
 *                     - lat
 *                     - lng
 *                   properties:
 *                     lat:
 *                       type: number
 *                       description: "Latitude"
 *                     lng:
 *                       type: number
 *                       description: "Longitude"
 *                     alt:
 *                       type: number
 *                       description: "Altitude (optional)"
 *                 constructionTime:
 *                   type: string
 *                 enableComments:
 *                   type: boolean
 *                 showOpenSpace:
 *                   type: boolean
 *                 openSpaceArea:
 *                   type: number
 *                 showHousing:
 *                   type: boolean
 *                 housing:
 *                   type: object
 *                   properties:
 *                     residentialUnits:
 *                       type: number
 *                     affordableResidentialUnits:
 *                       type: number
 *                 showCarbon:
 *                   type: boolean
 *                 carbonEmissions:
 *                   type: number
 *                 showAccess:
 *                   type: boolean
 *                 access:
 *                   type: string
 *                 showJobs:
 *                   type: boolean
 *                 jobs:
 *                   type: object
 *                   properties:
 *                     min:
 *                       type: number
 *                     max:
 *                       type: number
 *           example:
 *             - applicationNumber: "1234/5678/A"
 *               isActive: true
 *               planningId: "123"
 *               name: "The Test Building"
 *               description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
 *               applicationType: "Full Planning Permission"
 *               address: "1 Test Street, Test Town, Test County, Test Postcode"
 *               location: {"lat": 51.5074, "lng": -0.1278}
 *               applicationDocumentsUrl: "https://www.test.com"
 *               applicationUpdatesUrl: "https://www.test.com/updates"
 *               consultationDeadline: "2025-01-01"
 *               height: 2
 *               proposedLandUse: {"classB": true, "classC": false, "classE": false, "classF": false, "suiGeneris": false}
 *               applicationStage: { "stage": "Consultation", "status": { "consultation": "in progress" } }
 *               constructionTime: "2024-2026"
 *               enableComments: true
 *               showOpenSpace: true
 *               openSpaceArea: 100
 *               showHousing: true
 *               housing: { "residentialUnits": 50, "affordableResidentialUnits": 15 }
 *               showCarbon: true
 *               carbonEmissions: 500
 *               showAccess: true
 *               access: "There is a path parallel to the development."
 *               showJobs: true
 *               jobs: { "min": 10, "max": 20 }
 *             - applicationNumber: "9876/5432/A"
 *               isActive: true
 *               planningId: "124"
 *               name: "Another Test Building"
 *               description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
 *               applicationType: "Full Planning Permission"
 *               address: "2 Test Street, Test Town, Test County, Test Postcode"
 *               location: {"lat": 51.5074, "lng": -0.1278, "alt": 10}
 *               applicationDocumentsUrl: "https://www.test.com"
 *               applicationUpdatesUrl: "https://www.test.com/updates"
 *               consultationDeadline: "2025-01-01"
 *               height: 2
 *               proposedLandUse: {"classB": false, "classC": false, "classE": false, "classF": false, "suiGeneris": true, "suiGenerisDetail": "Unique use case description"}
 *               applicationStage: { "stage": "Decision", "status": { "decision": "pending approval" } }
 *               constructionTime: "2025-2027"
 *               enableComments: false
 *               showOpenSpace: false
 *               showHousing: false
 *               showCarbon: true
 *               carbonEmissions: 300
 *               showAccess: false
 *               showJobs: true
 *               jobs: { "min": 5, "max": 15 }
 *     responses:
 *       '200':
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
 *                     - "Application 1234/5678/A no update needed"
 *                     - "Application 9876/5432/A updated"
 *       '400':
 *         description: Invalid request body or missing required fields
 *       '401':
 *         description: Not authorized
 *       '403':
 *         description: Forbidden
 *       '207':
 *         description: Some applications were updated or created, while others failed
 *       '500':
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
    return new NextResponse("Invalid API key", { status: 401 });
  }

  const body = await req.json();

  if (!Array.isArray(body)) {
    return new NextResponse("Invalid request body. Expected an array.", {
      status: 400,
    });
  }

  if (body.length === 0) {
    return new NextResponse("No applications provided", { status: 400 });
  }

  const results = await processMultipleApplications(body);

  if (results.success.length === 0 && results.errors.length > 0) {
    return NextResponse.json(
      { data: { errors: results.errors } },
      { status: 400 },
    );
  } else if (results.errors.length > 0) {
    return NextResponse.json({ data: results }, { status: 207 });
  }

  return NextResponse.json({ data: { success: results.success } });
}
