"use server";
import { checkExistingReference } from "../actions";
import { z } from "zod";
import { ValidationResult } from "../../../../models/validationResult";

const PlanningValidation = z.object({
  applicationNumber: z.string().min(1),
  description: z.string().optional(),
  address: z.string().optional(),
  applicationType: z.string().optional(),
  applicationStage: z.string().optional(),
  height: z.number().optional(),
  consultationDeadline: z.date().optional(),
});
const ReferenceResult = z.object({
  exists: z.boolean().refine((value) => value == false, {
    message: "Reference must be unique",
    path: ["exists"],
  }),
});

type PlanningValidationType = z.infer<typeof PlanningValidation>;

export async function validatePlanningParams(
  data: PlanningValidationType,
): Promise<ValidationResult> {
  const { applicationNumber, description } = data;
  let validationResult: ValidationResult = { status: 200, errors: [] };

  try {
    PlanningValidation.parse(data);

    // Check if the applicationNumber already exists in the database only if it's been supplied
    const existingApplication = await checkExistingReference(applicationNumber);
    ReferenceResult.parse(existingApplication);
  } catch (error) {
    if (error instanceof z.ZodError) {
      validationResult.errors = error.errors.map((err) => {
        if (err.path.length > 0) {
          return {
            message: `Invalid value for field '${err.path[0]}': ${err.message}`,
          };
        } else {
          return { message: err.message };
        }
      });
      validationResult.status = 400;
    } else {
      validationResult.errors.push({ message: "Unexpected error occurred" });
      validationResult.status = 500;
    }
  }

  return validationResult;
}
