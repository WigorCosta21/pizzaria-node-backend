import { Request, Response } from "express";
import { ListProductsService } from "../../services/product/list-products";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    const disabled = req.query.disabled as string | undefined;

    const listProducts = new ListProductsService();

    const products = await listProducts.execute({
      disabled,
    });

    return res.status(200).json(products);
  }
}
