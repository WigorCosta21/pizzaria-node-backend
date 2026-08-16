import { Request, Response } from "express";
import { DetailsUserService } from "../../services/user/details-user";

export class DetailsUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const detailUser = new DetailsUserService();

    const user = await detailUser.execute({ user_id });

    return res.json(user);
  }
}
