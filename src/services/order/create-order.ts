import { prisma } from "../../prisma";

interface CreateOrderServiceProps {
  table: number;
  name?: string;
}

export class CreateOrderService {
  async execute({ table, name }: CreateOrderServiceProps) {
    try {
      const order = await prisma.order.create({
        data: {
          table,
          name: name ?? "",
        },
        select: {
          id: true,
          table: true,
          name: true,
          status: true,
          draft: true,
          createdAt: true,
        },
      });

      return order;
    } catch (error) {
      throw new Error("Failure to create order");
    }
  }
}
