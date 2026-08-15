import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

export const validationSchema =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: error.issues.map((issue) => ({
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        errors: "Internal server error",
      });
    }
  };
