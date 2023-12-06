import { checkExistingReference } from '../util/client'
import { z } from 'zod';

const PlanningValidation = z.object({
    reference: z.string().min(1),
    description: z.string().optional(),
    address: z.string().optional(),
    applicationType: z.string().optional(),
    applicationStage: z.string().optional(),
    height: z.string().optional(),
    developmentType: z.string().optional(),
    commentDeadline: z.string().optional(),
    openSpaceGardens: z.string().optional(),
});
const ReferenceResult = z.object({
    exists: z.boolean().refine(value => value == false, {
        message: "Reference must be unique",
        path: ["exists"],
    }),
  });
  
type PlanningValidationType = z.infer<typeof PlanningValidation>;

export async function validatePlanningParams(data: PlanningValidationType): Promise<{ status: number, errors: { message: string }[] }> {
    const { reference, description } = data;
    let errors: { message: string }[] = [];
    let status = 200;

    try {
        PlanningValidation.parse(data);

        // Check if the reference already exists in the database only if it's been supplied
        const existingApplication = await checkExistingReference(reference);
        ReferenceResult.parse(existingApplication);
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            errors = error.errors.map((err) => {
                if (err.path.length > 0) {
                    return { message: `Invalid value for field '${err.path[0]}': ${err.message}` };
                } else {
                    return { message: err.message };
                }
            });
            status = 400;
        } else {
            errors.push({ message: "Unexpected error occurred" });
            status = 500;
        }
    }

    return { status, errors };
};