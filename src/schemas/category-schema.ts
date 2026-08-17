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

export const listCategoryProductsSchema = z.object({
  query: z.object({
    category_id: z
      .string({
        message: "Category id is required",
      })
      .min(1, { message: "Category id is required" }),
  }),
});
