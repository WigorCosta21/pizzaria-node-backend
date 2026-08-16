import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const user_id = req.user_id;

  if (!user_id) {
    res.status(401).json({ error: "User without permission " });
    return;
  }

  const user = await prisma.user.findFirst({
    where: { id: user_id },
  });

  if (!user) {
    res.status(404).json({ error: "User not found " });
    return;
  }

  if (user.role !== "ADMIN") {
    res.status(401).json({ error: "User without permission " });
    return;
  }

  next();
};
