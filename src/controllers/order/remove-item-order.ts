import { Request, Response } from "express";
import { RemoveItemOrderService } from "../../services/order/remove-item-order";

export class RemoveItemOrderController {
  async handle(req: Request, res: Response) {
    const { item_id } = req.query;

    const removeItem = new RemoveItemOrderService();

    const item = await removeItem.execute({
      item_id: item_id as string,
    });

    return res.status(200).json({ item });
  }
}
