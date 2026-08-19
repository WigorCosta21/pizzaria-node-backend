# 📋 Project Context Documentation - Pizzeria System

## 📖 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Technologies and Versions](#technologies-and-versions)
4. [Folder Structure](#folder-structure)
5. [Database Modeling](#database-modeling)
6. [Middlewares](#middlewares)
7. [File Upload](#file-upload)
8. [Schema Validation](#schema-validation)
9. [Endpoints](#endpoints)
10. [Request Flow](#request-flow)
11. [Project Configuration](#project-configuration)

---

## 🎯 Overview

Backend pizzeria management system developed in Node.js with TypeScript, using Express as the web framework, Prisma ORM for communication with the PostgreSQL database, and Zod for data validation.

---

## 🏗️ Architecture

The project follows the **MVC + Service Layer** pattern, with the following structure:

```
HTTP Request → Routes → Middlewares → Controller → Service → Database → Service → Controller → HTTP Response
```

### Architecture Layers:

1. **Routes (`routes.ts`)**: Defines the endpoints and applies the middlewares
2. **Middlewares**: Schema validation, authentication, and authorization
3. **Controllers**: Receive the request, extract data, and delegate to the Service
4. **Services**: Contain all business logic and database communication
5. **Prisma Client**: ORM that manages communication with PostgreSQL

### Principles Followed:

- **Separation of Concerns**: Each layer has a specific responsibility
- **Single Responsibility Principle**: One controller/service per operation
- **Reusability**: Middlewares shared across routes
- **Centralized Validation**: Zod schemas validate data before it reaches the controller

---

## 🚀 Technologies and Versions

### Production Dependencies

| Technology             | Version | Purpose                                                      |
| ---------------------- | ------- | ------------------------------------------------------------ |
| **@prisma/adapter-pg** | ^7.9.1  | Prisma adapter for PostgreSQL connection via the `pg` driver |
| **@prisma/client**     | ^7.9.1  | ORM for database communication                               |
| **bcrypt**             | ^6.0.0  | Password encryption                                          |
| **cloudinary**         | ^2.8.0  | Image storage and management service                         |
| **cors**               | ^2.8.5  | Middleware to enable CORS                                    |
| **dotenv**             | ^17.2.3 | Environment variable loading                                 |
| **express**            | ^5.1.0  | Web framework for building REST APIs                         |
| **jsonwebtoken**       | ^9.0.3  | JWT token generation and validation                          |
| **multer**             | ^2.0.2  | Middleware for file uploads                                  |
| **pg**                 | ^8.23.0 | PostgreSQL driver for Node.js (used by the Prisma adapter)   |
| **tsx**                | ^4.20.6 | TypeScript runner for development                            |
| **zod**                | ^4.1.12 | Schema validation and typing library                         |

### Development Dependencies

| Technology              | Version  | Purpose                                |
| ----------------------- | -------- | -------------------------------------- |
| **@types/bcrypt**       | ^6.0.0   | TypeScript types for bcrypt            |
| **@types/cors**         | ^2.8.19  | TypeScript types for CORS              |
| **@types/express**      | ^5.0.5   | TypeScript types for Express           |
| **@types/jsonwebtoken** | ^9.0.10  | TypeScript types for JWT               |
| **@types/multer**       | ^2.0.0   | TypeScript types for Multer            |
| **@types/node**         | ^24.10.0 | TypeScript types for Node.js           |
| **@types/pg**           | ^8.18.0  | TypeScript types for pg                |
| **prisma**              | ^7.5.0   | Prisma ORM CLI                         |
| **typescript**          | ^5.9.3   | JavaScript superset with static typing |

### Database

- **PostgreSQL** (managed via Prisma ORM)

---

## 📁 Folder Structure

```
backend/
├── prisma/
│   ├── migrations/           # Database migration history
│   │   └── 20251110200355_create_tables/
│   │       └── migration.sql
│   ├── migration_lock.toml   # Migration lock
│   └── schema.prisma         # Database schema
├── src/
│   ├── @types/               # Custom TypeScript type definitions
│   │   └── express/
│   │       └── index.d.ts    # Express type extension
│   ├── config/               # Application configuration
│   │   ├── cloudinary.ts     # Cloudinary configuration
│   │   └── multer.ts         # Multer configuration (upload)
│   ├── controllers/          # Controllers (receive requests)
│   │   ├── category/
│   │   │   ├── CreateCategoryController.ts
│   │   │   └── ListCategoryController.ts
│   │   ├── order/
│   │   │   ├── AddItemController.ts
│   │   │   ├── CreateOrderController.ts
│   │   │   ├── DeleteOrderController.ts
│   │   │   ├── DetailOrderController.ts
│   │   │   ├── FinishOrderController.ts
│   │   │   ├── ListOrdersController.ts
│   │   │   ├── RemoveItemController.ts
│   │   │   └── SendOrderController.ts
│   │   ├── product/
│   │   │   ├── CreateProductController.ts
│   │   │   ├── DeleteProductController.ts
│   │   │   ├── ListProductByCategoryController.ts
│   │   │   └── ListProductController.ts
│   │   └── user/
│   │       ├── AuthUserController.ts
│   │       ├── CreateUserController.ts
│   │       └── DetailUserController.ts
│   ├── generated/            # Code generated by Prisma
│   │   └── prisma/
│   │       └── client.ts
│   ├── middlewares/          # Custom middlewares
│   │   ├── isAdmin.ts        # Checks if user is admin
│   │   ├── isAuthenticated.ts # Validates JWT token
│   │   └── validateSchema.ts  # Validates requests with Zod
│   ├── prisma/               # Prisma Client configuration
│   │   └── index.ts
│   ├── schemas/              # Zod validation schemas
│   │   ├── categorySchema.ts
│   │   ├── orderSchema.ts
│   │   ├── productSchema.ts
│   │   └── userSchema.ts
│   ├── services/             # Services (business logic)
│   │   ├── category/
│   │   │   ├── CreateCategoryService.ts
│   │   │   └── ListCategoryService.ts
│   │   ├── order/
│   │   │   ├── AddItemOrderService.ts
│   │   │   ├── CreateOrderService.ts
│   │   │   ├── DeleteOrderService.ts
│   │   │   ├── DetailOrderService.ts
│   │   │   ├── FinishOrderService.ts
│   │   │   ├── ListOrderService.ts
│   │   │   ├── RemoveItemOrderService.ts
│   │   │   └── SendOrderService.ts
│   │   ├── product/
│   │   │   ├── CreateProductService.ts
│   │   │   ├── DeleteProductService.ts
│   │   │   ├── ListProductByCategoryService.ts
│   │   │   └── ListProductService.ts
│   │   └── user/
│   │       ├── AuthUserService.ts
│   │       ├── CreateUserService.ts
│   │       └── DetailUserService.ts
│   ├── routes.ts             # Definition of all routes
│   └── server.ts             # Server configuration and startup
├── .env                      # Environment variables
├── CONTEXTO_PROJETO.md       # Full project context documentation
├── endpoints.md              # Detailed documentation of all endpoints
├── package.json              # Dependencies and scripts
├── prisma.config.ts          # Additional Prisma configuration
└── tsconfig.json             # TypeScript configuration

```

### Naming Conventions:

- **Controllers**: `<Action><Entity>Controller.ts` (e.g., `CreateUserController.ts`)
- **Services**: `<Action><Entity>Service.ts` (e.g., `CreateUserService.ts`)
- **Schemas**: `<entity>Schema.ts` (e.g., `userSchema.ts`)
- **Middlewares**: `<description>.ts` (e.g., `isAuthenticated.ts`)

---

## 🗄️ Database Modeling

### Relationship Diagram

```
User (1)
  └─ role: STAFF | ADMIN

Category (1) ─────< (N) Product
                         │
                         └─< (N) Item >─┐
                                        │
Order (1) ─────────────────────────────┘
  └─ items: Item[]
```

### Entities and Attributes

#### **User** (System Users)

```typescript
{
  id: string(UUID); // Unique identifier
  name: string; // Full name
  email: string(unique); // Email (unique)
  password: string; // Encrypted password (bcrypt)
  role: Role; // STAFF or ADMIN
  createdAt: DateTime; // Creation date
  updatedAt: DateTime; // Update date
}
```

**Role Enum:**

- `STAFF` - Standard employee
- `ADMIN` - Administrator (full access)

#### **Category** (Product Categories)

```typescript
{
  id: string (UUID)          // Unique identifier
  name: string               // Category name
  createdAt: DateTime        // Creation date
  updatedAt: DateTime        // Update date
  products: Product[]        // Products in this category
}
```

#### **Product** (Products/Pizzas)

```typescript
{
  id: string (UUID)          // Unique identifier
  name: string               // Product name
  price: number (int)        // Price in cents
  description: string        // Product description
  banner: string             // Image URL
  disabled: boolean          // Active/inactive product
  category_id: string        // FK to Category
  category: Category         // Relation to category
  items: Item[]              // Order items for this product
  createdAt: DateTime        // Creation date
  updatedAt: DateTime        // Update date
}
```

**Note on price**: The price is stored in **cents** (integer) to avoid floating-point arithmetic issues.

#### **Order** (Orders)

```typescript
{
  id: string (UUID)          // Unique identifier
  table: number (int)        // Table number
  status: boolean            // false = open, true = closed
  draft: boolean             // true = draft, false = confirmed
  name: string?              // Optional order name
  items: Item[]              // Order items
  createdAt: DateTime        // Creation date
  updatedAt: DateTime        // Update date
}
```

#### **Item** (Order Items)

```typescript
{
  id: string(UUID); // Unique identifier
  amount: number(int); // Quantity
  order_id: string; // FK to Order
  order: Order; // Relation to order
  product_id: string; // FK to Product
  product: Product; // Relation to product
  createdAt: DateTime; // Creation date
  updatedAt: DateTime; // Update date
}
```

### Deletion Rules (Cascade)

- **Product** deleted → Deletes all related **Items**
- **Order** deleted → Deletes all related **Items**
- **Category** deleted → Deletes all related **Products**

---

## 🛡️ Middlewares

### 1. **isAuthenticated** (`middlewares/isAuthenticated.ts`)

**Purpose**: Checks whether the user is authenticated by validating the JWT token.

**Flow**:

1. Extracts the token from the `Authorization: Bearer <token>` header
2. Verifies the token's validity using `jsonwebtoken`
3. Extracts `user_id` from the token payload
4. Adds `user_id` to the `req` object for use in subsequent middlewares/controllers
5. Calls `next()` if valid, or returns a 401 error if invalid

**Usage**:

```typescript
router.get("/me", isAuthenticated, new DetailUserController().handle);
```

**Error Responses**:

- `401`: Token not provided or invalid

---

### 2. **isAdmin** (`middlewares/isAdmin.ts`)

**Purpose**: Checks whether the authenticated user has ADMIN permission.

**Prerequisite**: Must be used **after** the `isAuthenticated` middleware.

**Flow**:

1. Gets `user_id` from `req` (added by `isAuthenticated`)
2. Looks up the user in the database
3. Checks whether the `role` field equals `"ADMIN"`
4. Calls `next()` if admin, or returns a 401 error if not

**Usage**:

```typescript
router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  new CreateCategoryController().handle,
);
```

**Error Responses**:

- `401`: User without permission

---

### 3. **validateSchema** (`middlewares/validateSchema.ts`)

**Purpose**: Validates request data (body, query, params) using Zod schemas.

**Flow**:

1. Receives a Zod schema as a parameter
2. Validates `req.body`, `req.query`, and `req.params` against the schema
3. Calls `next()` if valid
4. Returns a 400 error with validation details if invalid

**Usage**:

```typescript
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);
```

**Error Responses**:

- `400`: Validation error with details of invalid fields
- `500`: Internal server error

**Error response example**:

```json
{
  "error": "Validation error",
  "details": [
    { "message": "Name must be at least 3 characters" },
    { "message": "Must be a valid email" }
  ]
}
```

---

## 📤 File Upload

### Multer Configuration (`config/multer.ts`)

**Purpose**: Middleware for processing file uploads (product images).

**Settings**:

- **Storage**: `memoryStorage()` - Keeps the file in memory (buffer) instead of saving it to disk
- **Size limit**: 4MB per file
- **Accepted formats**: JPEG, JPG, PNG

**Type Validation**:

```typescript
const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
```

**Flow**:

1. Receives the file via `multipart/form-data`
2. Validates the file's MIME type
3. Checks the size (max 4MB)
4. Stores the file in memory as a Buffer
5. Makes it available via `req.file.buffer`

**Usage in Routes**:

```typescript
router.post("/product", upload.single("file"), ...);
```

**Errors**:

- Invalid format: "Invalid file format, use only JPG, JPEG, PNG."
- Size exceeded: Returns an error automatically if > 4MB

---

### Cloudinary Configuration (`config/cloudinary.ts`)

**Purpose**: Storage and CDN service for product images.

**Integration**:

- Receives the file buffer from Multer
- Uploads using streaming (without saving to disk)
- Returns the public URL of the hosted image

**Upload Configuration**:

- **Folder**: `products/` - Organizes images in the products folder on Cloudinary
- **Resource Type**: `image`
- **Public ID**: `{timestamp}-{original-name}` - Unique name to avoid conflicts

**Flow in CreateProductService**:

1. Creates a stream from the received buffer
2. Pipes it to the Cloudinary uploader
3. Waits for a response with `secure_url`
4. Saves the URL in the product's `banner` field

**Notes**:

- Images are permanently hosted on Cloudinary
- URLs are optimized and served via CDN
- Supports image transformations (resizing, cropping, etc.)

---

## ✅ Schema Validation

We use **Zod** for input data validation. Schemas are organized in the `src/schemas/` folder.

### User Schemas (`schemas/userSchema.ts`)

#### **createUserSchema**

Validates the creation of new users:

```typescript
{
  body: {
    name: string (min: 3 characters),
    email: valid email,
    password: string (min: 6 characters)
  }
}
```

**Custom error messages**:

- Invalid name: "Name must be at least 3 characters"
- Invalid email: "Must be a valid email"
- Invalid password: "Password must be at least 6 characters"

#### **authUserSchema**

Validates user authentication:

```typescript
{
  body: {
    email: valid email,
    password: string (required)
  }
}
```

### Category Schemas (`schemas/categorySchema.ts`)

#### **createCategorySchema**

Validates category creation:

```typescript
{
  body: {
    name: string (min: 2 characters)
  }
}
```

**Error messages**:

- Invalid name: "Category name must have 2 characters"

---

### Product Schemas (`schemas/productSchema.ts`)

#### **createProductSchema**

Validates product creation:

```typescript
{
  body: {
    name: string (min: 1 character),
    price: string (required, value in cents),
    description: string (min: 1 character),
    category_id: string (category UUID)
  }
}
```

**Error messages**:

- Invalid name: "Product name is required"
- Invalid price: "Product price is required"
- Invalid description: "Product description is required"
- Invalid category: "Product category is required"

**Notes**:

- The `price` field is sent as a string and converted to an integer in the controller
- In addition to the schema fields, the route requires an image file via `multipart/form-data`

---

#### **listProductSchema**

Validates product listing with filter:

```typescript
{
  query: {
    disabled: string(optional);
  }
}
```

**Notes**:

- The `disabled` query param is optional
- Accepts any string; the conversion is done in the service

---

#### **listProductByCategorySchema**

Validates product listing by category:

```typescript
{
  query: {
    category_id: string(required);
  }
}
```

**Error messages**:

- Invalid ID: "Category ID is required"

**Notes**:

- Returns only active products (`disabled: false`) from the specified category

---

### Order Schemas (`schemas/orderSchema.ts`)

#### **createOrderSchema**

Validates order creation:

```typescript
{
  body: {
    table: number (positive integer),
    name: string (optional)
  }
}
```

**Error messages**:

- Invalid table: "Table number is required"
- Invalid type: "Table number must be an integer"
- Invalid number: "Table number must be a positive number"

---

#### **addItemSchema**

Validates adding an item to the order:

```typescript
{
  body: {
    order_id: string (min: 1 character),
    product_id: string (min: 1 character),
    amount: number (positive integer)
  }
}
```

**Error messages**:

- Invalid order: "order_id is required"
- Invalid product: "Product id is required"
- Invalid amount: "Amount must be a positive number"

---

#### **removeItemSchema**

Validates item removal:

```typescript
{
  query: {
    item_id: string (min: 1 character)
  }
}
```

**Error messages**:

- Invalid item: "item_id is required"

---

#### **detailOrderSchema**

Validates fetching order details:

```typescript
{
  query: {
    order_id: string (min: 1 character)
  }
}
```

**Error messages**:

- Invalid order: "order_id is required"

---

#### **sendOrderSchema**

Validates order submission/confirmation:

```typescript
{
  body: {
    order_id: string,
    name: string
  }
}
```

**Error messages**:

- Invalid ID: "Order ID must be a string"
- Invalid name: "Name must be text"

---

#### **finishOrderSchema**

Validates order completion:

```typescript
{
  body: {
    order_id: string;
  }
}
```

**Error messages**:

- Invalid ID: "Order ID must be a string"

---

#### **deleteOrderSchema**

Validates order deletion:

```typescript
{
  query: {
    order_id: string;
  }
}
```

**Error messages**:

- Invalid ID: "Order ID must be a string"

---

## 🌐 Endpoints

> **📚 Detailed Documentation**: For complete information about each endpoint, including request/response examples, validations, and error codes, see the [`endpoints.md`](./endpoints.md) file.

### 📋 Routes Summary

#### **Users**

| Method | Route    | Auth | Permission  | Description               |
| ------ | -------- | ---- | ----------- | ------------------------- |
| POST   | /users   | ❌   | Public      | Create new user           |
| POST   | /session | ❌   | Public      | Authenticate user (login) |
| GET    | /me      | ✅   | STAFF/ADMIN | Get logged-in user data   |

#### **Categories**

| Method | Route     | Auth | Permission  | Description         |
| ------ | --------- | ---- | ----------- | ------------------- |
| POST   | /category | ✅   | ADMIN       | Create new category |
| GET    | /category | ✅   | STAFF/ADMIN | List all categories |

#### **Products**

| Method | Route             | Auth | Permission  | Description                      |
| ------ | ----------------- | ---- | ----------- | -------------------------------- |
| POST   | /product          | ✅   | ADMIN       | Create new product (with image)  |
| GET    | /products         | ✅   | STAFF/ADMIN | List products (filter by status) |
| DELETE | /product          | ✅   | ADMIN       | Disable product (soft delete)    |
| GET    | /category/product | ✅   | STAFF/ADMIN | List products in a category      |

#### **Orders**

| Method | Route         | Auth | Permission  | Description                   |
| ------ | ------------- | ---- | ----------- | ----------------------------- |
| POST   | /order        | ✅   | STAFF/ADMIN | Create new order              |
| POST   | /order/add    | ✅   | STAFF/ADMIN | Add item to order             |
| DELETE | /order/remove | ✅   | STAFF/ADMIN | Remove item from order        |
| PUT    | /order/send   | ✅   | STAFF/ADMIN | Send order (confirm)          |
| PUT    | /order/finish | ✅   | STAFF/ADMIN | Finish order                  |
| GET    | /orders       | ✅   | STAFF/ADMIN | List orders (filter by draft) |
| GET    | /order/detail | ✅   | STAFF/ADMIN | Details of a specific order   |
| DELETE | /order        | ✅   | STAFF/ADMIN | Delete order                  |

---

### **Users**

#### **POST /users**

Creates a new user in the system.

**Middlewares**: `validateSchema(createUserSchema)`

**Body**:

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200)**:

```json
{
  "id": "generated-uuid",
  "name": "John Smith",
  "email": "john@example.com",
  "role": "STAFF",
  "createdAt": "2025-11-11T10:30:00.000Z"
}
```

**Notes**:

- Password is encrypted with bcrypt (salt: 8)
- Default role is STAFF
- Password is not returned in the response

---

#### **POST /session**

Authenticates a user and returns a JWT token.

**Middlewares**: `validateSchema(authUserSchema)`

**Body**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200)**:

```json
{
  "id": "user-uuid",
  "name": "John Smith",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Notes**:

- JWT token with expiration configured via environment variable
- Token contains `user_id` in the `sub` field

---

#### **GET /me**

Returns information about the authenticated user.

**Middlewares**: `isAuthenticated`

**Headers**:

```
Authorization: Bearer <token>
```

**Success Response (200)**:

```json
{
  "id": "user-uuid",
  "name": "John Smith",
  "email": "john@example.com",
  "role": "STAFF"
}
```

---

### **Categories**

#### **POST /category**

Creates a new product category.

**Middlewares**: `isAuthenticated`, `isAdmin`, `validateSchema(createCategorySchema)`

**Permission**: ADMIN role only

**Headers**:

```
Authorization: Bearer <token>
```

**Body**:

```json
{
  "name": "Dessert Pizzas"
}
```

**Success Response (201)**:

```json
{
  "id": "generated-uuid",
  "name": "Dessert Pizzas",
  "createdAt": "2025-11-11T10:30:00.000Z"
}
```

---

#### **GET /category**

Lists all registered categories.

**Middlewares**: `isAuthenticated`

**Permission**: Authenticated users (STAFF or ADMIN)

**Headers**:

```
Authorization: Bearer <token>
```

**Success Response (200)**:

```json
[
  {
    "id": "category-uuid-1",
    "name": "Savory Pizzas",
    "createdAt": "2025-11-11T10:30:00.000Z"
  },
  {
    "id": "category-uuid-2",
    "name": "Dessert Pizzas",
    "createdAt": "2025-11-11T10:35:00.000Z"
  }
]
```

**Notes**:

- Categories are returned ordered by creation date (most recent first)
- Returns only the fields: `id`, `name`, and `createdAt`

---

### **Products**

#### **POST /product**

Creates a new product with image upload.

**Controller**: `CreateProductController`
**Service**: `CreateProductService`
**Middlewares**: `isAuthenticated`, `isAdmin`, `upload.single("file")`, `validateSchema(createProductSchema)`
**Permission**: ADMIN only

**Body (FormData)**:

```
name: "Margherita Pizza"
price: "3500"  (value in cents - $35.00)
description: "Tomato sauce, mozzarella, and basil"
category_id: "category-uuid"
file: [image file]
```

**Success Response (200)**:

```json
{
  "id": "generated-uuid",
  "name": "Margherita Pizza",
  "price": 3500,
  "description": "Tomato sauce, mozzarella, and basil",
  "category_id": "category-uuid",
  "banner": "https://res.cloudinary.com/.../products/123456-image.jpg",
  "disabled": false,
  "createdAt": "2025-11-12T10:30:00.000Z"
}
```

**Notes**:

- Accepted image formats: JPEG, JPG, PNG (max 4MB)
- Image is uploaded to Cloudinary
- Validates whether the category exists
- Product is created as active (`disabled: false`)

---

#### **GET /products**

Lists products with a status filter.

**Controller**: `ListProductController`
**Service**: `ListProductService`
**Middlewares**: `isAuthenticated`, `validateSchema(listProductSchema)`
**Permission**: STAFF or ADMIN

**Query Parameters**:

```
disabled: "true" | "false" (optional, default: "false")
```

**Success Response (200)**:

```json
[
  {
    "id": "product-uuid-1",
    "name": "Margherita Pizza",
    "price": 3500,
    "description": "Tomato sauce, mozzarella, and basil",
    "banner": "https://res.cloudinary.com/.../products/123-image.jpg",
    "disabled": false,
    "category_id": "category-uuid",
    "createdAt": "2025-11-12T10:30:00.000Z",
    "category": {
      "id": "category-uuid",
      "name": "Savory Pizzas"
    }
  }
]
```

**Notes**:

- Products ordered by creation date (most recent first)
- Includes related category data

---

#### **DELETE /product**

Disables a product (soft delete).

**Controller**: `DeleteProductController`
**Service**: `DeleteProductService`
**Middlewares**: `isAuthenticated`, `isAdmin`
**Permission**: ADMIN only

**Query Parameters**:

```
product_id: "product-uuid"
```

**Success Response (200)**:

```json
{
  "message": "Product deleted/archived successfully!"
}
```

**Notes**:

- The product is not deleted, only `disabled` is set to `true`
- Maintains referential integrity and history

---

#### **GET /category/product**

Lists products from a specific category (active only).

**Controller**: `ListProductByCategoryController`
**Service**: `ListProductByCategoryService`
**Middlewares**: `isAuthenticated`, `validateSchema(listProductByCategorySchema)`
**Permission**: STAFF or ADMIN

**Query Parameters**:

```
category_id: "category-uuid"
```

**Success Response (200)**:

```json
[
  {
    "id": "product-uuid-1",
    "name": "Margherita Pizza",
    "price": 3500,
    "description": "Tomato sauce, mozzarella, and basil",
    "banner": "https://res.cloudinary.com/.../products/margherita.jpg",
    "disabled": false,
    "category_id": "category-uuid",
    "createdAt": "2025-11-12T10:30:00.000Z",
    "category": {
      "id": "category-uuid",
      "name": "Savory Pizzas"
    }
  }
]
```

**Notes**:

- Returns only active products (`disabled: false`)
- Validates whether the category exists

---

### **Orders**

#### **POST /order**

Creates a new order (initially as a draft).

**Controller**: `CreateOrderController`
**Service**: `CreateOrderService`
**Middlewares**: `isAuthenticated`, `validateSchema(createOrderSchema)`
**Permission**: STAFF or ADMIN

**Body**:

```json
{
  "table": 5,
  "name": "John's Table"
}
```

**Success Response (201)**:

```json
{
  "id": "generated-uuid",
  "table": 5,
  "status": false,
  "draft": true,
  "name": "John's Table",
  "createdAt": "2025-11-12T10:30:00.000Z"
}
```

**Notes**:

- Order created as a draft (`draft: true`)
- Initial status `false` (not finished)
- `name` field is optional

---

#### **POST /order/add**

Adds a product to an existing order.

**Controller**: `AddItemController`
**Service**: `AddItemOrderService`
**Middlewares**: `isAuthenticated`, `validateSchema(addItemSchema)`
**Permission**: STAFF or ADMIN

**Body**:

```json
{
  "order_id": "order-uuid",
  "product_id": "product-uuid",
  "amount": 2
}
```

**Success Response (201)**:

```json
{
  "id": "generated-item-uuid",
  "amount": 2,
  "order_id": "order-uuid",
  "product_id": "product-uuid",
  "createdAt": "2025-11-12T10:35:00.000Z",
  "product": {
    "id": "product-uuid",
    "name": "Margherita Pizza",
    "price": 3500,
    "description": "Tomato sauce, mozzarella, and basil",
    "banner": "https://res.cloudinary.com/.../products/margherita.jpg"
  }
}
```

**Notes**:

- Validates whether the order exists
- Validates whether the product exists and is active
- Returns item data along with product information

---

#### **DELETE /order/remove**

Removes a specific item from an order.

**Controller**: `RemoveItemController`
**Service**: `RemoveItemOrderService`
**Middlewares**: `isAuthenticated`, `validateSchema(removeItemSchema)`
**Permission**: STAFF or ADMIN

**Query Parameters**:

```
item_id: "item-uuid"
```

**Success Response (200)**:

```json
{
  "message": "Item removed successfully"
}
```

**Notes**:

- Permanently deletes the item from the database
- Does not affect the main order

---

#### **PUT /order/send**

Sends the order to the kitchen (exits draft mode).

**Controller**: `SendOrderController`
**Service**: `SendOrderService`
**Middlewares**: `isAuthenticated`, `validateSchema(sendOrderSchema)`
**Permission**: STAFF or ADMIN

**Body**:

```json
{
  "order_id": "order-uuid",
  "name": "Table 5 - John"
}
```

**Success Response (200)**:

```json
{
  "id": "order-uuid",
  "table": 5,
  "name": "Table 5 - John",
  "draft": false,
  "status": false,
  "createdAt": "2025-11-12T10:30:00.000Z"
}
```

**Notes**:

- Changes `draft` from `true` to `false`
- Updates the order's `name` field
- Order becomes visible in the kitchen

---

#### **PUT /order/finish**

Marks an order as finished.

**Controller**: `FinishOrderController`
**Service**: `FinishOrderService`
**Middlewares**: `isAuthenticated`, `validateSchema(finishOrderSchema)`
**Permission**: STAFF or ADMIN

**Body**:

```json
{
  "order_id": "order-uuid"
}
```

**Success Response (200)**:

```json
{
  "id": "order-uuid",
  "table": 5,
  "name": "Table 5 - John",
  "draft": false,
  "status": true,
  "createdAt": "2025-11-12T10:30:00.000Z"
}
```

**Notes**:

- Changes `status` from `false` to `true`
- Indicates the order has been delivered/completed

---

#### **GET /orders**

Lists orders with a draft filter.

**Controller**: `ListOrdersController`
**Service**: `ListOrderService`
**Middlewares**: `isAuthenticated`
**Permission**: STAFF or ADMIN

**Query Parameters**:

```
draft: "true" | "false" (optional, default: "false")
```

**Success Response (200)**:

```json
[
  {
    "id": "order-uuid-1",
    "table": 5,
    "name": "Table 5 - John",
    "draft": false,
    "status": false,
    "createdAt": "2025-11-12T10:30:00.000Z",
    "items": [
      {
        "id": "item-uuid-1",
        "amount": 2,
        "product": {
          "id": "product-uuid-1",
          "name": "Margherita Pizza",
          "price": 3500,
          "description": "Tomato sauce, mozzarella, and basil",
          "banner": "https://res.cloudinary.com/.../products/margherita.jpg"
        }
      }
    ]
  }
]
```

**Notes**:

- Includes all items for each order, along with product details
- Useful for viewing orders in the kitchen or drafts

---

#### **GET /order/detail**

Fetches complete information for a specific order.

**Controller**: `DetailOrderController`
**Service**: `DetailOrderService`
**Middlewares**: `isAuthenticated`, `validateSchema(detailOrderSchema)`
**Permission**: STAFF or ADMIN

**Query Parameters**:

```
order_id: "order-uuid"
```

**Success Response (200)**:

```json
{
  "id": "order-uuid",
  "table": 5,
  "name": "Table 5 - John",
  "draft": false,
  "status": false,
  "createdAt": "2025-11-12T10:30:00.000Z",
  "updatedAt": "2025-11-12T10:35:00.000Z",
  "items": [
    {
      "id": "item-uuid-1",
      "amount": 2,
      "createdAt": "2025-11-12T10:35:00.000Z",
      "product": {
        "id": "product-uuid-1",
        "name": "Margherita Pizza",
        "price": 3500,
        "description": "Tomato sauce, mozzarella, and basil",
        "banner": "https://res.cloudinary.com/.../products/margherita.jpg"
      }
    }
  ]
}
```

**Notes**:

- Returns complete information including timestamps
- Includes all items with product details

---

#### **DELETE /order**

Permanently deletes an order and all its items.

**Controller**: `DeleteOrderController`
**Service**: `DeleteOrderService`
**Middlewares**: `isAuthenticated`, `validateSchema(deleteOrderSchema)`
**Permission**: STAFF or ADMIN

**Query Parameters**:

```
order_id: "order-uuid"
```

**Success Response (200)**:

```json
{
  "message": "Order deleted successfully!"
}
```

**Notes**:

- Permanently deletes the order
- All items are deleted automatically (cascade)
- Operation cannot be reverted

---

## 🔄 Request Flow

### Complete Example: User Creation

```
1. POST /users
   ↓
2. Middleware: validateSchema(createUserSchema)
   - Validates name, email, password
   - If invalid → 400 with errors
   ↓
3. CreateUserController.handle()
   - Extracts data from req.body
   - Instantiates CreateUserService
   - Calls service.execute()
   ↓
4. CreateUserService.execute()
   - Checks if email already exists
   - If it exists → throw Error("User already exists!")
   - Encrypts password with bcrypt
   - Creates user in the database via Prisma
   - Returns user data (without password)
   ↓
5. CreateUserController.handle()
   - Receives data from the service
   - Returns res.json(user)
   ↓
6. HTTP 200 response with user data
```

### Flow with Authentication and Authorization

```
1. POST /category
   ↓
2. Middleware: isAuthenticated
   - Validates JWT token
   - Adds user_id to req
   - If invalid → 401
   ↓
3. Middleware: isAdmin
   - Looks up user in the database
   - Checks role === "ADMIN"
   - If not admin → 401
   ↓
4. Middleware: validateSchema(createCategorySchema)
   - Validates data
   - If invalid → 400
   ↓
5. CreateCategoryController → CreateCategoryService
   - Business logic
   - Database creation
   ↓
6. HTTP 201 response
```

---

### Flow with File Upload (Product)

```
1. POST /product (multipart/form-data)
   ↓
2. Middleware: isAuthenticated
   - Validates JWT token
   - If invalid → 401
   ↓
3. Middleware: isAdmin
   - Checks role === "ADMIN"
   - If not admin → 401
   ↓
4. Middleware: upload.single("file")
   - Processes the file upload
   - Validates format (JPEG, JPG, PNG)
   - Validates size (max 4MB)
   - Stores in memory (buffer)
   - Adds file to req.file
   - If invalid → 400
   ↓
5. Middleware: validateSchema(createProductSchema)
   - Validates name, price, description, category_id
   - If invalid → 400
   ↓
6. CreateProductController.handle()
   - Extracts data from req.body
   - Checks whether req.file exists
   - If it doesn't → throw Error("Product image is required")
   - Instantiates CreateProductService
   ↓
7. CreateProductService.execute()
   - Checks whether the category exists
   - If not → throw Error("Category not found!")
   - Creates a stream from the image buffer
   - Uploads to Cloudinary
   - Receives the image URL
   - Creates the product in the database with the image URL
   - Returns product data
   ↓
8. CreateProductController.handle()
   - Returns res.json(product)
   ↓
9. HTTP 200 response with product data
```

---

### Listing Flow with Query Params (Products)

```
1. GET /products?disabled=false
   ↓
2. Middleware: isAuthenticated
   - Validates JWT token
   - If invalid → 401
   ↓
3. Middleware: validateSchema(listProductSchema)
   - Validates the 'disabled' query param
   - If not sent → uses default "false"
   - If invalid (value other than "true"/"false") → 400
   - Converts string to boolean
   - Adds to req.query
   ↓
4. ListProductController.handle()
   - Extracts 'disabled' from req.query
   - If undefined → uses false as default
   - Instantiates ListProductService
   ↓
5. ListProductService.execute()
   - Fetches products from the database with where: { disabled }
   - Orders by createdAt desc (most recent first)
   - Includes related category data
   - Returns array of products
   ↓
6. ListProductController.handle()
   - Returns res.status(200).json(products)
   ↓
7. HTTP 200 response with array of products
```

---

## ⚙️ Project Configuration

### TypeScript (`tsconfig.json`)

**Main Settings**:

- **Target**: ES2020
- **Module**: CommonJS (compatible with Node.js)
- **Strict Mode**: Enabled (all strict checks)
- **Output**: `./dist`
- **Root**: `./src`
- **Source Maps**: Enabled

**Active Strict Checks**:

- `noImplicitAny`: Disallows implicit `any` types
- `strictNullChecks`: Strict handling of null/undefined
- `noUnusedLocals`: Error for unused variables
- `noUnusedParameters`: Error for unused parameters
- `noImplicitReturns`: All code paths must return a value

---

### Prisma (`prisma/schema.prisma`)

**Generator**:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

The Prisma Client is generated in `src/generated/prisma/`.

**Datasource**:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Conventions**:

- Model names in PascalCase (e.g., `User`)
- Table names in snake_case (e.g., `users`)
- IDs: UUID auto-generated
- Automatic timestamps: `createdAt`, `updatedAt`

---

### Express Server (`server.ts`)

**Global Middlewares**:

1. `express.json()` - Parses JSON requests
2. `cors()` - Enables CORS for all origins
3. `router` - Application routes

**Global Error Handler**:

```typescript
app.use((error: Error, _, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Internal server error!" });
});
```

**Port**:

- Default: `3333`
- Configurable via the `PORT` environment variable

---

### Environment Variables (`.env`)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pizzaria?schema=public"

# JWT
JWT_SECRET="your-secret-key-here"

# Server
PORT=3333

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Required Variables**:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for signing JWT tokens
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary account name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret key

**How to obtain Cloudinary credentials**:

1. Create an account at [cloudinary.com](https://cloudinary.com)
2. Go to the Dashboard
3. Copy the credentials: Cloud Name, API Key, and API Secret
4. Add them to the `.env` file

---

### NPM Scripts (`package.json`)

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

**Development Command**:

```bash
npm run dev
```

- Runs the server with hot-reload
- Uses `tsx` to run TypeScript directly

**Prisma Commands**:

```bash
# Create a migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

---

## 🔐 Security

### Authentication

- **JWT (JSON Web Tokens)** for stateless authentication
- Tokens must be sent in the header: `Authorization: Bearer <token>`
- Token contains `user_id` in the `sub` field

### Authorization

- Role system: `STAFF` and `ADMIN`
- Routes protected by the `isAuthenticated` and `isAdmin` middlewares

### Encryption

- **bcrypt** with a salt of 8 rounds for passwords
- Passwords are never returned in API responses

### Validation

- **Zod** validates all inputs before they reach the business logic
- Custom, friendly error messages

---

## 📝 Important Notes

1. **Prices in Cents**: All prices are stored as integers in cents to avoid floating-point issues.

2. **UUIDs**: All IDs are v4 UUIDs auto-generated by Prisma.

3. **Automatic Timestamps**: `createdAt` and `updatedAt` are automatically managed by Prisma.

4. **Cascade Delete**: Cascading deletes are configured to maintain referential integrity.

5. **Error Handling**: All errors are caught by Express's global error handler.

6. **Type Safety**: TypeScript configured in strict mode ensures type safety throughout the code.

7. **Custom Prisma Client**: Client generated in `src/generated/prisma` for better organization.

8. **Image Upload**: The system uses Multer to process uploads and Cloudinary for permanent storage. Images are not saved on the local server.

9. **Memory Storage**: Multer configured with `memoryStorage()` to process files in memory, optimizing direct upload to Cloudinary.

10. **File Type Validation**: The system accepts only JPEG, JPG, and PNG images with a maximum size of 4MB.

---

## 🚀 How to Start the Project

1. **Install dependencies**:

```bash
npm install
```

2. **Configure environment variables**:

```bash
cp .env.example .env
# Edit .env with your settings
```

**Required variables in `.env`**:

- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - JWT secret key
- `CLOUDINARY_CLOUD_NAME` - Cloudinary account name
- `CLOUDINARY_API_KEY` - Cloudinary API Key
- `CLOUDINARY_API_SECRET` - Cloudinary API Secret

3. **Configure Cloudinary**:

- Create a free account at [cloudinary.com](https://cloudinary.com)
- Copy the credentials from the Dashboard
- Add the credentials to the `.env` file

4. **Run migrations**:

```bash
npx prisma migrate dev
```

5. **Start the server**:

```bash
npm run dev
```

6. **Server running at**: `http://localhost:3333`

---

## 📊 Controllers and Services Summary

### **Implemented Controllers**

#### User

- `CreateUserController` - Creates a new user
- `AuthUserController` - Authenticates a user (login)
- `DetailUserController` - Returns the logged-in user's data

#### Category

- `CreateCategoryController` - Creates a new category
- `ListCategoryController` - Lists all categories

#### Product

- `CreateProductController` - Creates a product with image upload
- `ListProductController` - Lists products with a status filter
- `DeleteProductController` - Disables a product (soft delete)
- `ListProductByCategoryController` - Lists products in a category

#### Order

- `CreateOrderController` - Creates a new order
- `AddItemController` - Adds an item to an order
- `RemoveItemController` - Removes an item from an order
- `SendOrderController` - Sends an order to the kitchen
- `FinishOrderController` - Finishes an order
- `ListOrdersController` - Lists orders with a filter
- `DetailOrderController` - Details of an order
- `DeleteOrderController` - Permanently deletes an order

### **Implemented Services**

#### User

- `CreateUserService` - User creation logic
- `AuthUserService` - Authentication logic
- `DetailUserService` - User detail logic

#### Category

- `CreateCategoryService` - Category creation logic
- `ListCategoryService` - Category listing logic

#### Product

- `CreateProductService` - Creation logic with Cloudinary upload
- `ListProductService` - Listing logic with filter
- `DeleteProductService` - Soft delete logic
- `ListProductByCategoryService` - Listing logic by category

#### Order

- `CreateOrderService` - Order creation logic
- `AddItemOrderService` - Item addition logic
- `RemoveItemOrderService` - Item removal logic
- `SendOrderService` - Order submission logic
- `FinishOrderService` - Order completion logic
- `ListOrderService` - Listing logic with filter
- `DetailOrderService` - Order detail logic
- `DeleteOrderService` - Permanent deletion logic

---

## 📚 Additional Documentation

For detailed information about each endpoint, including:

- Complete request and response examples
- All possible error codes
- Field-specific validations
- Use cases and important notes

See the **[`endpoints.md`](./endpoints.md)** file.

---

**Document last updated on**: 11/12/2025
**Project Version**: 2.0.0
**Latest update**: Complete system with all Order management features implemented
