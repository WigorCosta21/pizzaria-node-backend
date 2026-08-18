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
import { ListCategoryProductsController } from "./controllers/category/list-category-products";
import { isAdmin } from "./middlewares/isAdmin";
import {
  createCategorySchema,
  listCategoryProductsSchema,
} from "./schemas/category-schema";
import { CreateProductController } from "./controllers/product/create-product";
import { ListProductsController } from "./controllers/product/list-products";
import {
  createProductSchema,
  listProductSchema,
} from "./schemas/product-schema";
import { DeleteProductController } from "./controllers/product/delete-product";
import { CreateOrderController } from "./controllers/order/create-order";
import { addItemSchema, createOrderSchema } from "./schemas/order-schema";
import { ListOrdersController } from "./controllers/order/list-orders";
import { AddItemOrderController } from "./controllers/order/add-item-order";

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

router.get(
  "/categories",
  isAuthenticated,
  new ListCategoriesController().handle,
);

router.get(
  "/category/product",
  isAuthenticated,
  validationSchema(listCategoryProductsSchema),
  new ListCategoryProductsController().handle,
);

router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validationSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

// Product

router.get(
  "/products",
  isAuthenticated,
  validationSchema(listProductSchema),
  new ListProductsController().handle,
);

router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validationSchema(createProductSchema),
  new CreateProductController().handle,
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle,
);

// Order

router.post(
  "/order",
  isAuthenticated,
  validationSchema(createOrderSchema),
  new CreateOrderController().handle,
);

router.get("/orders", isAuthenticated, new ListOrdersController().handle);

router.post(
  "/order/add",
  isAuthenticated,
  validationSchema(addItemSchema),
  new AddItemOrderController().handle,
);

export default router;
