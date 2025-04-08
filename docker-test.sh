#!/bin/bash

# Make sure the script is executable
# chmod +x docker-test.sh

# Ensure Docker Compose is running
echo "Checking if Docker Compose services are running..."
if ! docker-compose ps | grep -q "bookstore-app"; then
  echo "Starting Docker Compose services..."
  docker-compose up -d
  
  # Wait for services to be ready
  echo "Waiting for services to be ready..."
  sleep 10
fi

# Run the test script with proper environment variables
echo "Running tests against Docker environment..."
API_HOST=localhost PORT=3000 node test-api.js

# Keep the services running by default
# Uncomment the next line if you want to stop services after tests
# docker-compose down
