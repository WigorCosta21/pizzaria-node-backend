import { Request, Response } from "express";
import { ListCategoryProductsService } from "../../services/category/list-category-products";

export class ListCategoryProductsController {
  async handle(req: Request, res: Response) {
    const { category_id } = req.query;

    const listCategoryProducts = new ListCategoryProductsService();

    const products = await listCategoryProducts.execute({
      category_id: category_id as string,
    });

    return res.status(200).json(products);
  }
}
