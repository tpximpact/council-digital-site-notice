import { checkExistingReference } from '../util/client'

interface PlanningValidation {
    reference: string;
    description: string;
}

export async function validatePlanningParams(data: PlanningValidation): Promise<string[]> {
    const { reference, description } = data;
    let errors: string[] = [];
    if (!reference || reference.trim() === "") {
        errors.push("Reference parameter is required");
    } else {
        // Check if the reference already exists in the database only if its been supplied
        const existingApplication = await checkExistingReference(reference);
        if (existingApplication) {
            errors.push("Reference must be unique");
        }
    }
    return errors;
};