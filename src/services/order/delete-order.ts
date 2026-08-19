import { prisma } from "../../prisma";

interface DeleteOrderServiceProps {
  order_id: string;
}

export class DeleteOrderService {
  async execute({ order_id }: DeleteOrderServiceProps) {
    try {
      const order = await prisma.order.findFirst({
        where: { id: order_id },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      await prisma.order.delete({
        where: { id: order_id },
      });

      return { message: "Order successfully deleted" };
    } catch (error) {
      throw new Error("Failed to delete order");
    }
  }
}
