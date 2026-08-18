import { prisma } from "../../prisma";

interface AddItemOrderServiceProps {
  order_id: string;
  product_id: string;
  amount: number;
}

export class AddItemOrderService {
  async execute({ order_id, product_id, amount }: AddItemOrderServiceProps) {
    try {
      const orderExists = await prisma.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!orderExists) {
        throw new Error("Order not found");
      }

      const productExists = await prisma.product.findFirst({
        where: {
          id: product_id,
          disabled: false,
        },
      });

      if (!productExists) {
        throw new Error("Product not found");
      }

      const item = await prisma.item.create({
        data: {
          order_id,
          product_id,
          amount,
        },
        select: {
          id: true,
          amount: true,
          order_id: true,
          product_id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      });

      return item;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add item to the order");
    }
  }
}
