# Backend Module for SHOPLYST

This backend module is part of the SHOPLYST full-stack e-commerce project, developed as a learning project during an internship at Integrify Academy in 2024. It includes a collection of RESTful APIs designed to manage key features like user accounts, product catalogs, and administrative controls.

The module is built with TypeScript, Node.js, Express.js, and MongoDB, ensuring scalability, security, and reliability. Role-based authentication is implemented using JSON Web Tokens (JWT) to provide secure access for users and administrators.

## Table of Contents

- [Overview](#overview)
- [Entity Relationship Diagram](#entity-relationship-diagram)
- [Getting Started](#getting-started)
- [Project Folder Structure](#project-folder-structure)
- [Used Package Script](#used-package-scripts)
- [Features](#features)
- [Testing](#testing)
- [Deployment](#deployment)

## Overview

### Key Highlights

- User-Friendly APIs: Designed for seamless integration with the Shoplyst frontend to provide an enhanced user experience.
- Admin Privileges: Full control for administrators to manage products, categories, and orders.
- Secure and Scalable: Built with MongoDB for reliable data storage and JWT for secure access.

## Entity Relationship Diagram

The project adheres to a well-structured schema design, as illustrated below:
![ERD Diagram](./src/assets/images/ERD-ECOMMERCE.png)

#### Entities

- **Users**
- **Products**
- **Categories**
- **Orders**
- **Order Item**

### Enum

- **Size**
- **UserRole**

## Getting started

### Prerequisites

- node `^19.2.0`
- npm `^9.2.0`

Make sure you have [npm](https://www.npmjs.com/get-npm) installed globally.

#### 1.Clone the project:

```bash
$ git clone https://github.com/roshanbist/fullstack-ecommerce-backend.git
$ cd fullstack-ecommerce-backend
```

#### 2.Install and run:

```bash
$ npm install    # Install project dependencies
$ npm run start  # Compile and launch on local environment
```

#### 3. Navigate to [http://localhost:{yourPortAdressForBackend}](http://localhost:8080)

## Project Folder Structure

A clear folder structure ensures maintainability and scalability:

```
└── 📁src
    └── .DS_Store
    └── app.ts
    └── 📁assets
        └── 📁images
            └── ERD-ECOMMERCE.png
    └── 📁config
        └── email.ts
        └── passport.ts
    └── 📁controllers
        └── adminController.ts
        └── categoriesController.ts
        └── ordersController.ts
        └── productsController.ts
        └── usersController.ts
    └── 📁errors
        └── ApiError.ts
    └── 📁middlewares
        └── adminCheck.ts
        └── apiErrorHandlerMiddleware.ts
    └── 📁misc
        └── 📁types
            └── Category.ts
            └── GoogleCredential.ts
            └── JwtPayload.ts
            └── Order.ts
            └── Passport.ts
            └── Password.ts
            └── Product.ts
            └── Size.ts
            └── User.ts
    └── 📁model
        └── CategoryModel.ts
        └── OrderItemModel.ts
        └── OrderModel.ts
        └── ProductModel.ts
        └── UserModel.ts
    └── 📁routers
        └── adminRouter.ts
        └── categoriesRouter.ts
        └── orderRouter.ts
        └── productsRouter.ts
        └── usersRouter.ts
    └── server.ts
    └── 📁services
        └── categoriesService.ts
        └── ordersService.ts
        └── productsService.ts
        └── usersService.ts
    └── 📁utils
        └── AuthUtil.ts
        └── commonUtil.ts
```

## Used Package Scripts

```bash
    "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon --watch src/**/*.ts --exec ts-node src/server.ts",
    "build": "tsc -p .",
    "test": "jest --runInBand --forceExit --detectOpenHandles --coverage  --verbose false"
    }
```

## Features

1.  Products

    - View all products (with pagination support).
    - Filtered the products by: title, categories, price range.
    - Sort products by title (ASC, DESC).
    - Fetch product details by ID.

2.  Categories

    - View all categories.
    - Fetch category details by ID.

3.  Users

    - Register a new user.
    - Login with email and password.
    - Update user profiles and change passwords.

4.  Order

    - Fetch list of all orders.
    - Retrieve a specific order by order ID.

5.  Admin
    - Manage (Create, Read, Update, Delete) products and categories.

## Testing

For the testing, Jest, Supertest, MongoDB memory server are used.

- [Jest](https://jestjs.io/),

- [Supertest](https://www.npmjs.com/package/supertest),

- [MongoDB memory server](https://www.npmjs.com/package/mongodb-memory-server)

Testing of the backend module includes:

- Controllers
  - productsController.test.ts
  - categoriesController.test.ts
  - usersController.test.ts
- Middlewares
  - adminCheck.spec.ts
- Services

  - productsService.test.ts
  - categoreisService.test.ts
  - usersService.test.ts

![Test result](./src/assets/images/backend-testing.png)

Check test code in tests folder

```bash
$ npm run test
```

## Deployment

The API is live now hosted by [RENDER](https://render.com/)

Check the live link here [https://fullstack-ecommerce-backend-sx23.onrender.com](https://fullstack-ecommerce-backend-sx23.onrender.com)
Below are some of the example and for other feature it required authentication via register/login

1. [All products](https://fullstack-ecommerce-backend-sx23.onrender.com/api/v1/products)
2. [All categories](https://fullstack-ecommerce-backend-sx23.onrender.com/api/v1/categories)

The Frontend of the application is deployed on vercel. Click here to see the [Live Demo](https://fullstack-ecommerce-frontend-sage.vercel.app/).
