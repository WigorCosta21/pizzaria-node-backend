import { prisma } from "../../prisma";

interface SendOrderServiceProps {
  name: string;
  order_id: string;
}

export class SendOrderService {
  async execute({ name, order_id }: SendOrderServiceProps) {
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
          draft: false,
          name,
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
      throw new Error("Failed to send order");
    }
  }
}
