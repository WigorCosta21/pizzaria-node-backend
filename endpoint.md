# 📚 API Documentation - Pizzeria System

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Categories](#categories)
4. [Products](#products)
5. [Orders](#orders)
6. [Summary Table](#summary-table)

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication. After logging in, you will receive a token that must be included in all authenticated requests.

### How to use the Token

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 👤 Users

### 1. Create User

Creates a new user in the system.

**Endpoint:** `POST /users`

**Authentication:** ❌ Not required

**Permission:** Public

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validations:**

- `name`: Minimum 3 characters (required)
- `email`: Valid email (required)
- `password`: Minimum 6 characters (required)

**Success Response (200):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Smith",
  "email": "john@example.com",
  "role": "STAFF",
  "createdAt": "2025-11-12T10:30:00.000Z",
  "updatedAt": "2025-11-12T10:30:00.000Z"
}
```

**Error Responses:**

```json
// 400 - User already exists
{
  "error": "User already exists!"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "Name must be at least 3 characters" },
    { "message": "Must be a valid email" }
  ]
}
```

**Notes:**

- Password is encrypted with bcrypt (salt: 8 rounds)
- Default role is `STAFF`
- Password is not returned in the response

---

### 2. Authenticate User (Login)

Authenticates a user and returns a JWT token.

**Endpoint:** `POST /session`

**Authentication:** ❌ Not required

**Permission:** Public

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validations:**

- `email`: Valid email (required)
- `password`: Non-empty string (required)

**Success Response (200):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Smith",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJpYXQiOjE2MzU0MjM0MDB9.xxx"
}
```

**Error Responses:**

```json
// 400 - Invalid credentials
{
  "error": "Incorrect email or password!"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "Must be a valid email" }
  ]
}
```

**Notes:**

- The JWT token contains `user_id` in the `sub` field
- The token must be used in subsequent authenticated requests
- Token validity is configured via an environment variable

---

### 3. Authenticated User Details

Returns information about the logged-in user.

**Endpoint:** `GET /me`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Smith",
  "email": "john@example.com",
  "role": "STAFF"
}
```

**Error Responses:**

```json
// 401 - Invalid or missing token
{
  "error": "Invalid or missing token"
}
```

---

## 📂 Categories

### 1. Create Category

Creates a new product category.

**Endpoint:** `POST /category`

**Authentication:** ✅ Required

**Permission:** ADMIN only

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Dessert Pizzas"
}
```

**Validations:**

- `name`: Minimum 2 characters (required)

**Success Response (201):**

```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Dessert Pizzas",
  "createdAt": "2025-11-12T10:30:00.000Z",
  "updatedAt": "2025-11-12T10:30:00.000Z"
}
```

**Error Responses:**

```json
// 401 - Not authenticated
{
  "error": "Invalid or missing token"
}

// 401 - No permission
{
  "error": "User without permission"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "Category name must have 2 characters" }
  ]
}
```

---

### 2. List Categories

Lists all registered categories.

**Endpoint:** `GET /category`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**

```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Savory Pizzas",
    "createdAt": "2025-11-12T10:30:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440002",
    "name": "Dessert Pizzas",
    "createdAt": "2025-11-12T10:35:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440003",
    "name": "Beverages",
    "createdAt": "2025-11-12T10:40:00.000Z"
  }
]
```

**Notes:**

- Categories are ordered by creation date (most recent first)
- Returns only: `id`, `name`, and `createdAt`

---

## 🍕 Products

### 1. Create Product

Creates a new product with image upload.

**Endpoint:** `POST /product`

**Authentication:** ✅ Required

**Permission:** ADMIN only

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Body (FormData):**

```
name: "Margherita Pizza"
price: "3500"
description: "Tomato sauce, mozzarella, and basil"
category_id: "660e8400-e29b-41d4-a716-446655440001"
file: [image file]
```

**Validations:**

- `name`: Minimum 1 character (required)
- `price`: Non-empty string (required) - Value in cents
- `description`: Minimum 1 character (required)
- `category_id`: Valid UUID (required)
- `file`: Image required (JPEG, JPG, PNG - max 4MB)

**Success Response (200):**

```json
{
  "id": "770e8400-e29b-41d4-a716-446655440001",
  "name": "Margherita Pizza",
  "price": 3500,
  "description": "Tomato sauce, mozzarella, and basil",
  "banner": "https://res.cloudinary.com/your-cloud/image/upload/v1699792800/products/1699792800-margherita.jpg",
  "disabled": false,
  "category_id": "660e8400-e29b-41d4-a716-446655440001",
  "createdAt": "2025-11-12T10:30:00.000Z",
  "updatedAt": "2025-11-12T10:30:00.000Z"
}
```

**Error Responses:**

```json
// 400 - Image not provided
{
  "error": "Product image is required"
}

// 400 - Invalid format
{
  "error": "Invalid file format, use only JPG, JPEG, PNG."
}

// 400 - Category does not exist
{
  "error": "Category not found!"
}

// 400 - Upload error
{
  "error": "Error uploading the image!"
}

// 401 - No permission
{
  "error": "User without permission"
}
```

**Notes:**

- Price is in cents (e.g., 3500 = $35.00)
- Image is uploaded to Cloudinary
- The `disabled` field is created as `false` by default

---

### 2. List Products

Lists all products with a status filter.

**Endpoint:** `GET /products`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**

```
disabled: "true" | "false" (optional, default: "false")
```

**Usage Examples:**

```
GET /products                    → Returns active products (disabled=false)
GET /products?disabled=false     → Returns active products
GET /products?disabled=true      → Returns disabled products
```

**Success Response (200):**

```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440001",
    "name": "Margherita Pizza",
    "price": 3500,
    "description": "Tomato sauce, mozzarella, and basil",
    "banner": "https://res.cloudinary.com/.../products/margherita.jpg",
    "disabled": false,
    "category_id": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-11-12T10:30:00.000Z",
    "category": {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Savory Pizzas"
    }
  },
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "name": "Pepperoni Pizza",
    "price": 4000,
    "description": "Pepperoni, onion, and mozzarella",
    "banner": "https://res.cloudinary.com/.../products/pepperoni.jpg",
    "disabled": false,
    "category_id": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-11-12T10:35:00.000Z",
    "category": {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Savory Pizzas"
    }
  }
]
```

**Notes:**

- Products are ordered by creation date (most recent first)
- Includes related category data
- If `disabled` is not provided, the default is `false`

---

### 3. Delete/Disable Product

Disables a product (soft delete).

**Endpoint:** `DELETE /product`

**Authentication:** ✅ Required

**Permission:** ADMIN only

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**

```
product_id: "770e8400-e29b-41d4-a716-446655440001"
```

**Usage Example:**

```
DELETE /product?product_id=770e8400-e29b-41d4-a716-446655440001
```

**Success Response (200):**

```json
{
  "message": "Product deleted/archived successfully!"
}
```

**Error Responses:**

```json
// 400 - Failed to delete
{
  "error": "Failed to delete the product"
}

// 401 - No permission
{
  "error": "User without permission"
}
```

**Notes:**

- The product is not deleted from the database; only the `disabled` field is set to `true`
- Soft delete keeps history and referential integrity

---

### 4. List Products by Category

Lists products from a specific category (active only).

**Endpoint:** `GET /category/product`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**

```
category_id: "660e8400-e29b-41d4-a716-446655440001"
```

**Usage Example:**

```
GET /category/product?category_id=660e8400-e29b-41d4-a716-446655440001
```

**Success Response (200):**

```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440001",
    "name": "Margherita Pizza",
    "price": 3500,
    "description": "Tomato sauce, mozzarella, and basil",
    "banner": "https://res.cloudinary.com/.../products/margherita.jpg",
    "disabled": false,
    "category_id": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-11-12T10:30:00.000Z",
    "category": {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Savory Pizzas"
    }
  },
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "name": "Pepperoni Pizza",
    "price": 4000,
    "description": "Pepperoni, onion, and mozzarella",
    "banner": "https://res.cloudinary.com/.../products/pepperoni.jpg",
    "disabled": false,
    "category_id": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-11-12T10:35:00.000Z",
    "category": {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Savory Pizzas"
    }
  }
]
```

**Error Responses:**

```json
// 400 - Category does not exist
{
  "error": "Category not found!"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "Category ID is required" }
  ]
}
```

**Notes:**

- Returns only products with `disabled: false`
- Products are ordered by creation date (most recent first)
- Includes category data

---

## 🛒 Orders

### 1. Create Order

Creates a new order (initially as a draft).

**Endpoint:** `POST /order`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**

```json
{
  "table": 5,
  "name": "John's Table"
}
```

**Validations:**

- `table`: Positive integer (required)
- `name`: String (optional)

**Success Response (201):**

```json
{
  "id": "880e8400-e29b-41d4-a716-446655440001",
  "table": 5,
  "status": false,
  "draft": true,
  "name": "John's Table",
  "createdAt": "2025-11-12T10:30:00.000Z"
}
```

**Error Responses:**

```json
// 400 - Failed to create
{
  "error": "Failed to create order"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "Table number is required" },
    { "message": "Table number must be a positive number" }
  ]
}
```

**Notes:**

- The order is created as a draft (`draft: true`)
- Initial status is `false` (order not finished)
- `name` field is optional; if not provided it defaults to an empty string

---

### 2. Add Item to Order

Adds a product to an existing order.

**Endpoint:** `POST /order/add`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**

```json
{
  "order_id": "880e8400-e29b-41d4-a716-446655440001",
  "product_id": "770e8400-e29b-41d4-a716-446655440001",
  "amount": 2
}
```

**Validations:**

- `order_id`: Non-empty string (required)
- `product_id`: Non-empty string (required)
- `amount`: Positive integer (required)

**Success Response (201):**

```json
{
  "id": "990e8400-e29b-41d4-a716-446655440001",
  "amount": 2,
  "order_id": "880e8400-e29b-41d4-a716-446655440001",
  "product_id": "770e8400-e29b-41d4-a716-446655440001",
  "createdAt": "2025-11-12T10:35:00.000Z",
  "product": {
    "id": "770e8400-e29b-41d4-a716-446655440001",
    "name": "Margherita Pizza",
    "price": 3500,
    "description": "Tomato sauce, mozzarella, and basil",
    "banner": "https://res.cloudinary.com/.../products/margherita.jpg"
  }
}
```

**Error Responses:**

```json
// 400 - Order not found
{
  "error": "Order not found"
}

// 400 - Product not found or disabled
{
  "error": "Product not found"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "Amount must be a positive number" }
  ]
}
```

**Notes:**

- Validates whether the order exists
- Validates whether the product exists and is active (`disabled: false`)
- Returns the created item's data along with product information

---

### 3. Remove Item from Order

Removes a specific item from an order.

**Endpoint:** `DELETE /order/remove`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**

```
item_id: "990e8400-e29b-41d4-a716-446655440001"
```

**Usage Example:**

```
DELETE /order/remove?item_id=990e8400-e29b-41d4-a716-446655440001
```

**Success Response (200):**

```json
{
  "message": "Item removed successfully"
}
```

**Error Responses:**

```json
// 400 - Item not found
{
  "error": "Item not found"
}

// 400 - Failed to remove
{
  "error": "Failed to remove item from order"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "item_id is required" }
  ]
}
```

**Notes:**

- Permanently deletes the item from the database
- Does not affect the main order

---

### 4. Send Order (Confirm)

Sends the order to the kitchen (exits draft mode).

**Endpoint:** `PUT /order/send`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**

```json
{
  "order_id": "880e8400-e29b-41d4-a716-446655440001",
  "name": "Table 5 - John"
}
```

**Validations:**

- `order_id`: Non-empty string (required)
- `name`: Non-empty string (required)

**Success Response (200):**

```json
{
  "id": "880e8400-e29b-41d4-a716-446655440001",
  "table": 5,
  "name": "Table 5 - John",
  "draft": false,
  "status": false,
  "createdAt": "2025-11-12T10:30:00.000Z"
}
```

**Error Responses:**

```json
// 400 - Order not found
{
  "error": "Failed to send order"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "Name must be text" }
  ]
}
```

**Notes:**

- Changes `draft` from `true` to `false`
- Updates the order's `name` field
- Order becomes visible in the kitchen

---

### 5. Finish Order

Marks an order as finished.

**Endpoint:** `PUT /order/finish`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**

```json
{
  "order_id": "880e8400-e29b-41d4-a716-446655440001"
}
```

**Validations:**

- `order_id`: Non-empty string (required)

**Success Response (200):**

```json
{
  "id": "880e8400-e29b-41d4-a716-446655440001",
  "table": 5,
  "name": "Table 5 - John",
  "draft": false,
  "status": true,
  "createdAt": "2025-11-12T10:30:00.000Z"
}
```

**Error Responses:**

```json
// 400 - Order not found
{
  "error": "Failed to finish order"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "Order ID must be a string" }
  ]
}
```

**Notes:**

- Changes `status` from `false` to `true`
- Indicates the order has been delivered/completed

---

### 6. List Orders

Lists orders with a draft filter.

**Endpoint:** `GET /orders`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**

```
draft: "true" | "false" (optional, default: "false")
```

**Usage Examples:**

```
GET /orders                → Returns confirmed orders (draft=false)
GET /orders?draft=false    → Returns confirmed orders
GET /orders?draft=true     → Returns draft orders
```

**Success Response (200):**

```json
[
  {
    "id": "880e8400-e29b-41d4-a716-446655440001",
    "table": 5,
    "name": "Table 5 - John",
    "draft": false,
    "status": false,
    "createdAt": "2025-11-12T10:30:00.000Z",
    "items": [
      {
        "id": "990e8400-e29b-41d4-a716-446655440001",
        "amount": 2,
        "product": {
          "id": "770e8400-e29b-41d4-a716-446655440001",
          "name": "Margherita Pizza",
          "price": 3500,
          "description": "Tomato sauce, mozzarella, and basil",
          "banner": "https://res.cloudinary.com/.../products/margherita.jpg"
        }
      },
      {
        "id": "990e8400-e29b-41d4-a716-446655440002",
        "amount": 1,
        "product": {
          "id": "770e8400-e29b-41d4-a716-446655440002",
          "name": "Pepperoni Pizza",
          "price": 4000,
          "description": "Pepperoni, onion, and mozzarella",
          "banner": "https://res.cloudinary.com/.../products/pepperoni.jpg"
        }
      }
    ]
  },
  {
    "id": "880e8400-e29b-41d4-a716-446655440002",
    "table": 3,
    "name": "Table 3 - Maria",
    "draft": false,
    "status": false,
    "createdAt": "2025-11-12T11:00:00.000Z",
    "items": [
      {
        "id": "990e8400-e29b-41d4-a716-446655440003",
        "amount": 1,
        "product": {
          "id": "770e8400-e29b-41d4-a716-446655440003",
          "name": "Portuguese Pizza",
          "price": 4500,
          "description": "Ham, eggs, onion, and mozzarella",
          "banner": "https://res.cloudinary.com/.../products/portuguese.jpg"
        }
      }
    ]
  }
]
```

**Notes:**

- Includes all items for each order with product details
- Useful for viewing kitchen orders or drafts in the front-of-house area

---

### 7. Order Details

Fetches complete information for a specific order.

**Endpoint:** `GET /order/detail`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**

```
order_id: "880e8400-e29b-41d4-a716-446655440001"
```

**Usage Example:**

```
GET /order/detail?order_id=880e8400-e29b-41d4-a716-446655440001
```

**Success Response (200):**

```json
{
  "id": "880e8400-e29b-41d4-a716-446655440001",
  "table": 5,
  "name": "Table 5 - John",
  "draft": false,
  "status": false,
  "createdAt": "2025-11-12T10:30:00.000Z",
  "updatedAt": "2025-11-12T10:35:00.000Z",
  "items": [
    {
      "id": "990e8400-e29b-41d4-a716-446655440001",
      "amount": 2,
      "createdAt": "2025-11-12T10:35:00.000Z",
      "product": {
        "id": "770e8400-e29b-41d4-a716-446655440001",
        "name": "Margherita Pizza",
        "price": 3500,
        "description": "Tomato sauce, mozzarella, and basil",
        "banner": "https://res.cloudinary.com/.../products/margherita.jpg"
      }
    },
    {
      "id": "990e8400-e29b-41d4-a716-446655440002",
      "amount": 1,
      "createdAt": "2025-11-12T10:36:00.000Z",
      "product": {
        "id": "770e8400-e29b-41d4-a716-446655440002",
        "name": "Pepperoni Pizza",
        "price": 4000,
        "description": "Pepperoni, onion, and mozzarella",
        "banner": "https://res.cloudinary.com/.../products/pepperoni.jpg"
      }
    }
  ]
}
```

**Error Responses:**

```json
// 400 - Order not found
{
  "error": "Order not found"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "order_id is required" }
  ]
}
```

**Notes:**

- Returns complete order information including timestamps
- Includes all items with product details
- Useful for viewing a specific order

---

### 8. Delete Order

Permanently deletes an order and all its items.

**Endpoint:** `DELETE /order`

**Authentication:** ✅ Required

**Permission:** STAFF or ADMIN

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**

```
order_id: "880e8400-e29b-41d4-a716-446655440001"
```

**Usage Example:**

```
DELETE /order?order_id=880e8400-e29b-41d4-a716-446655440001
```

**Success Response (200):**

```json
{
  "message": "Order deleted successfully!"
}
```

**Error Responses:**

```json
// 400 - Order not found
{
  "error": "Failed to delete the order"
}

// 400 - Validation failed
{
  "error": "Validation error",
  "details": [
    { "message": "Order ID must be a string" }
  ]
}
```

**Notes:**

- Permanently deletes the order
- All related items are deleted automatically (cascade)
- Operation cannot be reverted

---

## 📊 Summary Table

### All Endpoints

| Method | Route             | Auth | Permission  | Description                      |
| ------ | ----------------- | ---- | ----------- | -------------------------------- |
| POST   | /users            | ❌   | Public      | Create new user                  |
| POST   | /session          | ❌   | Public      | Authenticate user (login)        |
| GET    | /me               | ✅   | STAFF/ADMIN | Get logged-in user data          |
| POST   | /category         | ✅   | ADMIN       | Create new category              |
| GET    | /category         | ✅   | STAFF/ADMIN | List all categories              |
| POST   | /product          | ✅   | ADMIN       | Create new product (with image)  |
| GET    | /products         | ✅   | STAFF/ADMIN | List products (filter by status) |
| DELETE | /product          | ✅   | ADMIN       | Disable product (soft delete)    |
| GET    | /category/product | ✅   | STAFF/ADMIN | List products in a category      |
| POST   | /order            | ✅   | STAFF/ADMIN | Create new order                 |
| POST   | /order/add        | ✅   | STAFF/ADMIN | Add item to order                |
| DELETE | /order/remove     | ✅   | STAFF/ADMIN | Remove item from order           |
| PUT    | /order/send       | ✅   | STAFF/ADMIN | Send order (confirm)             |
| PUT    | /order/finish     | ✅   | STAFF/ADMIN | Finish order                     |
| GET    | /orders           | ✅   | STAFF/ADMIN | List orders (filter by draft)    |
| GET    | /order/detail     | ✅   | STAFF/ADMIN | Details of a specific order      |
| DELETE | /order            | ✅   | STAFF/ADMIN | Delete order                     |

---

## 🔑 HTTP Status Codes

| Code | Meaning        | When to Use                           |
| ---- | -------------- | ------------------------------------- |
| 200  | OK             | Successful request (GET, PUT, DELETE) |
| 201  | Created        | Resource created successfully (POST)  |
| 400  | Bad Request    | Validation or business logic error    |
| 401  | Unauthorized   | Invalid token or no permission        |
| 500  | Internal Error | Internal server error                 |

---

## 📝 Important Notes

### Prices

- All prices are stored and returned in **cents** (integer)
- Example: `3500` = $35.00
- Avoids floating-point arithmetic issues

### IDs

- All IDs are auto-generated **v4 UUIDs**
- Format: `550e8400-e29b-41d4-a716-446655440000`

### Timestamps

- `createdAt`: Creation date (automatically generated)
- `updatedAt`: Update date (automatically updated)
- Format: ISO 8601 (`2025-11-12T10:30:00.000Z`)

### Soft Delete

- Products: `disabled` field (`true` = disabled, `false` = active)
- Maintains referential integrity and history

### Order Status

- `draft`: `true` = draft, `false` = confirmed/sent
- `status`: `false` = in progress, `true` = finished

### Image Upload

- Accepted format: JPEG, JPG, PNG
- Maximum size: 4MB
- Storage: Cloudinary (CDN)
- Processing: Multer (memoryStorage)

### Validation

- All routes have data validation via Zod
- Error messages are descriptive and in English
- Validation errors return status code 400

---

**Document created on**: 08/18/2026
**API Version**: 1.0.0
**Latest update**: Complete documentation of all endpoints
