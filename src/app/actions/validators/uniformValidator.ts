"use server";
import { z } from "zod";
import { ValidationResult } from "../../../../models/validationResult";

const UniformValidation = z.object({
  "DCAPPL[REFVAL]": z.string().min(1),
  "DCAPPL[BLPU_CLASS_DESC]": z.string().optional(),
  "DCAPPL[Application Type_D]": z.string().optional(),
});
type UniformValidationType = z.infer<typeof UniformValidation>;

export async function validateUniformData(
  data: UniformValidationType,
): Promise<ValidationResult> {
  let validationResult: ValidationResult = { status: 200, errors: [] };
  console.log(data);
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
