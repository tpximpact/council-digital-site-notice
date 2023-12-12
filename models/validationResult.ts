export interface ValidationResult {
    status: number;
    errors: { message: string }[];
 }