import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/create-user";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserService = new CreateUserService();

    const { name, email, password } = req.body;

    const user = await createUserService.execute({ name, email, password });

    res.json(user);
  }
}
