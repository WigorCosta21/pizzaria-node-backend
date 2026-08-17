import { prisma } from "../../prisma";

interface DeleteProductServiceProps {
  product_id: string;
}

export class DeleteProductService {
  async execute({ product_id }: DeleteProductServiceProps) {
    try {
      await prisma.product.update({
        where: { id: product_id },
        data: {
          disabled: true,
        },
      });

      return { message: "Product successfully deleted" };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete the product");
    }
  }
}
