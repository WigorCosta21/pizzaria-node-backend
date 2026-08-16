import { Request, Response } from "express";
import { CreateCategorySevice } from "../../services/category/create-category";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const createCategory = new CreateCategorySevice();

    const category = await createCategory.execute({ name });

    return res.status(201).json({ category });
  }
}
