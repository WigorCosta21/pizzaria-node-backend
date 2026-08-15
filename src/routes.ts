import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user";
import { validationSchema } from "./middlewares/validation-schema";
import { userSchema } from "./schemas/user-schema";

const router = Router();

router.post(
  "/users",
  validationSchema(userSchema),
  new CreateUserController().handle,
);

export default router;
