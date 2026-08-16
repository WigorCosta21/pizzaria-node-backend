import { z } from "zod";

export const userSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "name must be at least 3 characters long" }),
    email: z.email({ message: "email must be a valid email address" }),
    password: z
      .string({
        message: "password is required",
      })
      .min(6, { message: "password must be at least 6 characters long" }),
  }),
});

export const authUserSchema = z.object({
  body: z.object({
    email: z.email({ message: "email must be a valid email address" }),
    password: z.string({ message: "password is required" }),
  }),
});
