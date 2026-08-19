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

export const addItemSchema = z.object({
  body: z.object({
    order_id: z
      .string({
        message: "Order must be a string",
      })
      .min(1, { message: "Order is required" }),
    product_id: z
      .string({
        message: "Product must be a string",
      })
      .min(1, { message: "Product is required" }),
    amount: z
      .number({
        message: "Amount is required",
      })
      .int({
        message: "Amount must be an integer",
      })
      .positive({
        message: "Amount must be an integer",
      }),
  }),
});

export const removeItemSchema = z.object({
  query: z.object({
    item_id: z
      .string({
        message: "Item id must be a string",
      })
      .min(1, { message: "Item is required" }),
  }),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z
      .string({
        message: "Order id must be a string",
      })
      .min(1, { message: "Order is required" }),
  }),
});

export const sendOrderSchema = z.object({
  body: z.object({
    order_id: z
      .string({
        message: "Order id must be a string",
      })
      .min(1, { message: "Order is required" }),
    name: z.string({
      message: "Name must be a string",
    }),
  }),
});
