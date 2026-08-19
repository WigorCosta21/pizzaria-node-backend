import { prisma } from "../../prisma";

interface DetailOrderServiceProps {
  order_id: string;
}

export class DetailOrderService {
  async execute({ order_id }: DetailOrderServiceProps) {
    try {
      const order = await prisma.order.findFirst({
        where: { id: order_id },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          items: {
            select: {
              id: true,
              amount: true,
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
          },
        },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      return order;
    } catch (error) {
      throw new Error("Failed to fetch order details.");
    }
  }
}
