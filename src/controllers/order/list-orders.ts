import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/list-orders";

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    const draft = req.query?.draft as string | undefined;

    const lisOrders = new ListOrdersService();

    const orders = await lisOrders.execute({
      draft,
    });

    res.status(200).json({ orders });
  }
}
