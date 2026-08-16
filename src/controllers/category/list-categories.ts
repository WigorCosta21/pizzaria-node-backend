import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/category/list-categories";

export class ListCategoriesController {
  async handle(_req: Request, res: Response) {
    const listCategories = new ListCategoriesService();

    const categories = await listCategories.execute();

    return res.status(200).json({ categories });
  }
}
