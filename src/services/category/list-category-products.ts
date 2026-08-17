import { prisma } from "../../prisma";

interface ListCategoryProductsServiceProps {
  category_id: string;
}

export class ListCategoryProductsService {
  async execute({ category_id }: ListCategoryProductsServiceProps) {
    const categoryExists = await prisma.category.findFirst({
      where: { id: category_id },
    });

    if (!categoryExists) {
      throw new Error("Category not found");
    }

    try {
      const products = await prisma.product.findMany({
        where: { category_id, disabled: false },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disabled: true,
          category_id: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return products;
    } catch (error) {
      throw new Error("Failure to list category products");
    }
  }
}
