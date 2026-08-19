import { prisma } from "../../prisma";

interface FinishOrderServiceProps {
  order_id: string;
}

export class FinishOrderService {
  async execute({ order_id }: FinishOrderServiceProps) {
    try {
      const order = await prisma.order.findFirst({
        where: { id: order_id },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      const updateOrder = await prisma.order.update({
        where: { id: order_id },
        data: {
          status: true,
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
        },
      });

      return updateOrder;
    } catch (error) {
      throw new Error("Failed to complete order");
    }
  }
}
