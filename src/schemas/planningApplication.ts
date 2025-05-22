import { z } from "zod";
import { planningApplicationStageSchema } from "./planningApplicationStage";

export const planningApplicationSchema = z
  .object({
    // Required fields
    applicationNumber: z.string().min(1, "Application number cannot be empty"),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
      alt: z.number().optional(),
    }),
    applicationStage: planningApplicationStageSchema,
    address: z.string().min(1, "Address cannot be empty"),

    // Optional fields
    planningId: z.string().optional(),
    applicationType: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    enableComments: z.boolean().optional(),
    consultationDeadline: z.string().optional(),
    height: z.number().optional(),
    constructionTime: z.string().optional(),
    proposedLandUse: z
      .object({
        classB: z.boolean().optional(),
        classC: z.boolean().optional(),
        classE: z.boolean().optional(),
        classF: z.boolean().optional(),
        suiGeneris: z.boolean().optional(),
        suiGenerisDetail: z.string().optional(),
      })
      .refine(
        (data) => {
          // If suiGeneris is true, suiGenerisDetail must be a non-empty string
          if (
            data.suiGeneris &&
            (!data.suiGenerisDetail || data.suiGenerisDetail.trim() === "")
          ) {
            return false;
          }
          // If suiGeneris is false, suiGenerisDetail should not be present
          if (!data.suiGeneris && data.suiGenerisDetail !== undefined) {
            return false;
          }
          return true;
        },
        {
          message:
            "suiGenerisDetail must be provided when suiGeneris is true, and must not be present when suiGeneris is false",
        },
      )
      .optional(),
    applicationDocumentsUrl: z.string().optional(),
    applicationUpdatesUrl: z.string().optional(),

    // Conditional fields
    showOpenSpace: z.boolean().optional(),
    openSpaceArea: z.number().optional(),

    showHousing: z.boolean().optional(),
    housing: z
      .object({
        residentialUnits: z.number(),
        affordableResidentialUnits: z.number(),
      })
      .optional(),

    showCarbon: z.boolean().optional(),
    carbonEmissions: z.number().optional(),

    showAccess: z.boolean().optional(),
    access: z.string().optional(),

    showJobs: z.boolean().optional(),
    jobs: z
      .object({
        min: z.number(),
        max: z.number(),
      })
      .optional(),

    // isActive with default value
    isActive: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.showOpenSpace && isEmptyOrNull(data.openSpaceArea)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Open space area is required when show open space is true",
        path: ["openSpaceArea"],
      });
    }

    if (data.showHousing && isEmptyOrNull(data.housing)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Housing details are required when show housing is true",
        path: ["housing"],
      });
    }

    if (data.showCarbon && isEmptyOrNull(data.carbonEmissions)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Carbon emissions value is required when show carbon is true",
        path: ["carbonEmissions"],
      });
    }

    if (data.showAccess && isEmptyOrNull(data.access)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Access description is required when show access is true",
        path: ["access"],
      });
    }

    if (data.showJobs && isEmptyOrNull(data.jobs)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Jobs information is required when show jobs is true",
        path: ["jobs"],
      });
    }
  });

// Infer the TypeScript type from the Zod schema
export type ApiPlanningApplication = z.infer<typeof planningApplicationSchema>;

export const planningApplicationsSchema = z.array(planningApplicationSchema);

const isEmptyOrNull = (value: any) => {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim() === "";
  return false;
};
