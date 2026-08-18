import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({
        message: "Table number is required",
      })
      .int({ message: "Table number must be an integer" })
      .positive({ message: "Table number must be positive" }),
    name: z.string().optional(),
  }),
});
