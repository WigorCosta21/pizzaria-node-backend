import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        message: "Category name is required",
      })
      .min(2, { message: "Category name must be at least 2 characters long" }),
  }),
});
