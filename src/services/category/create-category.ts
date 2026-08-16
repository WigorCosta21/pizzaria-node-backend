import { prisma } from "../../prisma";

interface CreateCategorySeviceProps {
  name: string;
}

export class CreateCategorySevice {
  async execute({ name }: CreateCategorySeviceProps) {
    try {
      const category = await prisma.category.create({
        data: {
          name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return category;
    } catch (error) {
      throw new Error("Failure to create category");
    }
  }
}
