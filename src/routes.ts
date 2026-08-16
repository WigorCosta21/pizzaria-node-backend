import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user";
import { validationSchema } from "./middlewares/validation-schema";
import { authUserSchema, userSchema } from "./schemas/user-schema";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { DetailsUserController } from "./controllers/user/details-user";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/create-category";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/category-schema";

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

// Category

router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validationSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

export default router;
