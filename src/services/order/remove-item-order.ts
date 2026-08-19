import { prisma } from "../../prisma";

interface RemoveItemOrderServiceProps {
  item_id: string;
}

export class RemoveItemOrderService {
  async execute({ item_id }: RemoveItemOrderServiceProps) {
    try {
      const itemExists = await prisma.item.findFirst({
        where: {
          id: item_id,
        },
      });

      if (!itemExists) {
        throw new Error("Item not found");
      }

      await prisma.item.delete({
        where: {
          id: item_id,
        },
      });

      return { message: "Item successfully deleted" };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to remove item from the order");
    }
  }
}
