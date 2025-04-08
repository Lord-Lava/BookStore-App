-- Create the bookstore database if it doesn't exist
CREATE DATABASE bookstore;

-- Create a test database for testing
CREATE DATABASE bookstore_test;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE bookstore TO postgres;
GRANT ALL PRIVILEGES ON DATABASE bookstore_test TO postgres;
