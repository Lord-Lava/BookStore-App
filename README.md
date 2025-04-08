# Bookstore API

A full-featured RESTful API for a Bookstore Application built with Node.js, Express.js, and PostgreSQL. This project demonstrates RESTful API design, authentication, and database modeling.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Running the Application](#running-the-application)
- [Database](#database)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Testing](#testing)

## 🚀 Features

- **User Authentication (JWT-based)**
  - User Signup (email, password)
  - User Login (returns JWT token)
  - Protected Routes for Books (only authenticated users can access)
  - Password hashing with bcrypt

- **Books API**
  - Create a new book
  - Get all books
  - Get book by ID
  - Update book by ID
  - Delete book by ID

- **Advanced Filtering & Searching**
  - Filter books by author, category, and rating
  - Search books by title (partial matches)
  - Pagination for GET /books endpoint
  - Sorting by various fields (price, rating, etc.)

- **Documentation & Error Handling**
  - Swagger/OpenAPI Documentation
  - Comprehensive input validation
  - Detailed error messages with appropriate HTTP status codes

## 💻 Tech Stack

- **Backend:** Node.js & Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcrypt
- **Validation:** Joi
- **API Documentation:** Swagger/OpenAPI
- **Containerization:** Docker & Docker Compose

## 🗂️ Project Structure

```
/BookStore-App
├── src/                    # Source directory
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Authentication and validation
│   ├── models/            # Sequelize models
│   ├── routes/            # Express routes
│   └── utils/             # Utility functions
├── .env                   # Environment variables
├── .env.example          # Example environment file
├── server.js             # Entry point
└── simple-server.js      # Simplified server for development
```

## 🔧 Installation

### Option 1: Traditional Setup

1. **Clone the repository**
```bash
git clone https://github.com/Lord-Lava/BookStore-App.git
cd BookStore-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up PostgreSQL**
Make sure you have PostgreSQL installed and running on your system.

4. **Configure environment variables**
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
NODE_ENV=development

# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=bookstore

# JWT Configuration
JWT_SECRET=bookstore_secret_key_should_be_longer_in_production
JWT_EXPIRES_IN=1d
```

5. **Run the application**
```bash
npm run dev
```

### Option 2: Docker Setup (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/Lord-Lava/BookStore-App.git
cd BookStore-App
```

2. **Run with Docker Compose**
```bash
docker-compose up
```

This will start both the PostgreSQL database and the Node.js application in Docker containers. The API will be available at http://localhost:3000.

## 📚 API Documentation

The API documentation is available via Swagger UI when the application is running:

```
http://localhost:3000/api-docs
```

### API Endpoints

#### Authentication

| Method | Endpoint           | Description         |
|--------|-------------------|---------------------|
| POST   | /api/users/signup | Register a new user |
| POST   | /api/users/login  | Login a user        |

#### Books

| Method | Endpoint         | Description                             |
|--------|-----------------|----------------------------------------|
| POST   | /api/books      | Create a new book (protected)           |
| GET    | /api/books      | Get all books with filtering (protected)|
| GET    | /api/books/:id  | Get a book by ID (protected)            |
| PUT    | /api/books/:id  | Update a book by ID (protected)         |
| DELETE | /api/books/:id  | Delete a book by ID (protected)         |

### Query Parameters for GET /api/books

| Parameter | Description                                       |
|-----------|--------------------------------------------------|
| author    | Filter books by author                            |
| category  | Filter books by category                          |
| rating    | Filter books by rating                            |
| title     | Search books by title (partial match)             |
| page      | Page number for pagination (default: 1)           |
| limit     | Number of books per page (default: 10)            |
| sortBy    | Sort by field (only 'price' and 'rating' are supported) |
| order     | Sort order: 'ASC' or 'DESC' (default: 'ASC')      |

## 🏃‍♂️ Running the Application

### Traditional Setup
```bash
npm run dev  # For development with auto-reload
# OR
npm start    # For production
```

### Docker Setup
```bash
docker-compose up
```

### Accessing the Application
1. **API Endpoints**: The API will be available at `http://localhost:3000`
2. **API Documentation**: Visit `http://localhost:3000/api-docs` in your browser to explore the API documentation

## 🗄️ Database

This application uses PostgreSQL as its database system.

### Local PostgreSQL Setup
If you're running the application locally (without Docker), make sure you have PostgreSQL installed and properly configured in your `.env` file.

### Docker PostgreSQL Setup
The Docker Compose configuration automatically sets up a PostgreSQL container with the correct configuration. No additional setup is needed.

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

1. **Register a new user**
```
POST /api/users/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

2. **Login to receive a token**
```
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

3. **Use the token for protected routes**
```
GET /api/books
Authorization: Bearer <your_jwt_token>
```

## ⚠️ Error Handling

The API provides detailed error messages with appropriate HTTP status codes:

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Authentication required or invalid token
- **404 Not Found**: Resource not found
- **500 Server Error**: Unexpected server error

## 🧪 Testing

The project includes comprehensive unit tests using Jest. To run the tests:

```bash
# Run all tests
npm test

# Run tests with watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

The test suite includes unit tests for:
- Controllers
- Middleware (validation, authentication, error handling)
- Data Transfer Objects (DTOs)
- API routes
- Database models

## 📊 Database Schema

The project includes a database schema diagram generator that creates a visual representation of the database models and their relationships.

```bash
# Generate the database schema diagram
npm run db:diagram
```

This command generates a PlantUML diagram file at `/docs/db-diagram.puml` that visualizes the database schema. It also outputs a text representation of the schema to the console.

The database schema includes:
- User model (with authentication fields)
- Book model (with all book-related properties)

---

## License

This project is licensed under the MIT License.
