require('dotenv').config();

// Better configuration with connection pool settings
const dbConfig = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'bookstore',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 3
    }
  },
  test: {
    // Test environment configuration
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME + '_test',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  production: {
    // Production environment configuration
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'bookstore',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 3
    }
  }
};

module.exports = dbConfig;
