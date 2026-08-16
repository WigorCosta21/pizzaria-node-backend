import { prisma } from "../../prisma";

export class ListCategoriesService {
  async execute() {
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
        orderBy: {
          name: "desc",
        },
      });

      return categories;
    } catch (error) {
      throw new Error("Failure to list categories");
    }
  }
}
