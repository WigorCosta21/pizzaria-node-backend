import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, {
      message: "Product name is required",
    }),
    price: z
      .string()
      .min(1, { message: "Product price is required" })
      .regex(/^\d+$/),
    description: z.string().min(1, {
      message: "Product description is required",
    }),
    category_id: z.string({ message: "Product category is required" }),
  }),
});
