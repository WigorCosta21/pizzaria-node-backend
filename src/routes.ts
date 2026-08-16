import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user";
import { validationSchema } from "./middlewares/validation-schema";
import { authUserSchema, userSchema } from "./schemas/user-schema";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { DetailsUserController } from "./controllers/user/details-user";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

router.post(
  "/users",
  validationSchema(userSchema),
  new CreateUserController().handle,
);

router.post(
  "/session",
  validationSchema(authUserSchema),
  new AuthUserController().handle,
);

router.get("/me", isAuthenticated, new DetailsUserController().handle);

export default router;
