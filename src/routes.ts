import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/create-user";
import { validationSchema } from "./middlewares/validation-schema";
import { authUserSchema, userSchema } from "./schemas/user-schema";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { DetailsUserController } from "./controllers/user/details-user";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/create-category";
import { ListCategoriesController } from "./controllers/category/list-categories";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/category-schema";
import { CreateProductController } from "./controllers/product/create-product";
import { createProductSchema } from "./schemas/product-schema";

const router = Router();
const upload = multer(uploadConfig);

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

router.get("/category", isAuthenticated, new ListCategoriesController().handle);

router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validationSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

// Product

router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validationSchema(createProductSchema),
  new CreateProductController().handle,
);

export default router;
