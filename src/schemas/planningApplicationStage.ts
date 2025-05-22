import { z } from "zod";

export const planningApplicationStageSchema = z
  .object({
    stage: z.enum(["Consultation", "Assessment", "Decision", "Appeal"]),
    status: z
      .object({
        consultation: z.enum(["in progress", "extended"]).optional(),
        assessment: z.enum(["in progress"]).optional(),
        decision: z
          .enum(["approved", "pending approval", "rejected"])
          .optional(),
        appeal: z
          .enum(["in progress", "unsuccessful", "successful"])
          .optional(),
      })
      .refine(
        (status) => {
          const keys = Object.keys(status).filter(
            (key) => status[key as keyof typeof status] !== undefined,
          );
          return keys.length === 1;
        },
        {
          message: "Exactly one status field should be present",
        },
      ),
  })
  .refine(
    (data) => {
      const stage = data.stage.toLowerCase();
      return data.status[stage as keyof typeof data.status] !== undefined;
    },
    {
      message: "Status must correspond to the current stage",
    },
  );
