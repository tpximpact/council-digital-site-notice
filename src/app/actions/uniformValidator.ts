"use server";
import { z } from "zod";
import { ValidationResult } from "../../../models/validationResult";
import { getGlobalContent } from "./sanityClient";

const UniformValidation = z.object({
  "DCAPPL[REFVAL]": z.string().optional(),
  "DCAPPL[KeyVal]": z.string().optional(),
  "DCAPPL[PROPOSAL]": z.string().optional(),
  "DCAPPL[DCAPPTYP_CNCODE_CODETEXT]": z.string().optional(),
  "DCAPPL[ADDRESS]": z.string().optional(),
  "DCAPPL[Application_Documents_URL]": z.string().optional(),
  "DCAPPL[DATEEXPNEI]": z.string().optional(),
  "DCAPPL[BLD_HGT]": z.number().optional(),
  "DCAPPL[DCGLAUSE]": z.object({
    classB: z.boolean().optional(),
    classC: z.boolean().optional(),
    classE: z.boolean().optional(),
    classF: z.boolean().optional(),
    suiGeneris: z.boolean().optional(),
  }),
});
export type UniformValidationType = z.infer<typeof UniformValidation>;

export async function validateUniformData(
  data: UniformValidationType,
): Promise<ValidationResult> {
  let validationResult: ValidationResult = { status: 200, errors: [] };
  try {
    UniformValidation.parse(data);
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

const RefvalValidation = z.object({
  applicationNumber: z.string().min(1),
  description: z.string().optional(),
  applicationType: z.string().optional(),
  isActive: z.boolean().optional(),
  _type: z.string().optional(),
  address: z.string().optional(),
  applicationDocumentsUrl: z.string().optional(),
  consultationDeadline: z.string().optional(),
  height: z.number().optional(),
  proposedLandUse: z
    .object({
      classB: z.boolean().optional(),
      classC: z.boolean().optional(),
      classE: z.boolean().optional(),
      classF: z.boolean().optional(),
      suiGeneris: z.boolean().optional(),
    })
    .optional(),
});
export type RefvalValidationType = z.infer<typeof RefvalValidation>;

export async function applicationNumberValidation(
  data: RefvalValidationType,
): Promise<ValidationResult> {
  let validationResult: ValidationResult = { status: 200, errors: [] };
  try {
    RefvalValidation.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      validationResult.errors = error.errors.map((err) => {
        if (err.path.length > 0) {
          return {
            message: `Invalid value for field application number`,
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

export async function isUniformIntegrationEnabled(): Promise<boolean> {
  try {
    const globalContent = await getGlobalContent();
    if (globalContent) {
      return globalContent?.integrations === "uniformAPI";
    } else {
      console.error("Error fetching global content");
      return false;
    }
  } catch (error) {
    return false;
  }
}
