import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/send-order";

export class SendOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, name } = req.body;

    const sendOrder = new SendOrderService();

    const order = await sendOrder.execute({ name, order_id });

    return res.status(200).json({ order });
  }
}
