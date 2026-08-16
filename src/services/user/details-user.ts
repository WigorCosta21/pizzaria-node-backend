import { prisma } from "../../prisma";

interface DetailsUserServiceProps {
  user_id: string;
}

export class DetailsUserService {
  async execute({ user_id }: DetailsUserServiceProps) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: user_id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("User not found");
    }
  }
}
