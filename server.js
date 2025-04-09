/**
 * Bookstore API Server
 * A RESTful API for a Bookstore Application
 */

// Dependencies
const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
require('dotenv').config();

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const bookRoutes = require('./src/routes/bookRoutes');

// Import database
const { sequelize } = require('./src/models');

// Import error handler
const { errorHandler } = require('./src/middlewares/errorHandler');

// Environment configuration
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     description: Returns a message indicating the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 environment:
 *                   type: string
 */
app.get('/', (_req, res) => {
  res.json({ message: 'Bookstore API is running', environment: NODE_ENV });
});

// Setup Swagger documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API',
      version: '1.0.0',
      description: 'RESTful API for a Bookstore Application with Authentication and CRUD operations',
      contact: {
        name: 'API Support',
        email: 'support@bookstore.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    // Using absolute paths to ensure files are found
    `${__dirname}/src/routes/*.js`,
    `${__dirname}/src/controllers/*.js`,
    `${__dirname}/src/models/*.js`,
    `${__dirname}/server.js`
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configure Swagger UI with options to display authorization
const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    authAction: {
      bearerAuth: {
        name: 'bearerAuth',
        schema: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Enter your bearer token in the format "Bearer {token}"'
        }
      }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Global error handler
app.use(errorHandler);

/**
 * Run database migrations and seeders
 */
async function runMigrations() {
  try {
    console.log('Running database migrations...');
    const migrationResult = await execPromise('npx sequelize-cli db:migrate');
    console.log('Migration output:', migrationResult.stdout);
    
    if (isDev) {
      console.log('Running seeders for development...');
      const seederResult = await execPromise('npx sequelize-cli db:seed:all');
      console.log('Seeder output:', seederResult.stdout);
    }

    return true;
  } catch (error) {
    console.error('Error running migrations:', error.message);
    if (error.stdout) console.log('Output:', error.stdout);
    if (error.stderr) console.error('Error output:', error.stderr);
    return false;
  }
}

/**
 * Initialize the server
 * Connect to database and start listening
 */
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    
    // Run migrations instead of sync
    const migrationsSuccess = await runMigrations();
    if (!migrationsSuccess && isDev) {
      console.log('Falling back to sync for development...');
      await sequelize.sync({ force: true });
      console.log('Database synced directly (fallback mode)');
    }
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

/**
 * The application follows clean architecture principles:
 * - Models (src/models): Database entities and business logic
 * - Controllers (src/controllers): Request handlers and business operations
 * - Routes (src/routes): API endpoint definitions
 * - Middlewares (src/middlewares): Authentication, validation, and error handling
 * - Migrations (src/migrations): Database schema changes
 * - Seeders (src/seeders): Sample data for development/testing
 */

// Start the server
startServer();
