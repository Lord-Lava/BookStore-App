/**
 * Generate Database Schema Diagram
 * 
 * This script generates a database schema diagram using Sequelize models
 * Run with: node scripts/generate-db-diagram.js
 */

const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');
const config = require('../src/config/database.js')['development'];

// Initialize Sequelize with PostgreSQL config
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false
  }
);

// Import models
const { User } = require('../src/models');
const { Book } = require('../src/models');

// Generate diagram
async function generateDiagram() {
  console.log('Generating database schema diagram...');
  try {
    // Get model definitions
    const userAttributes = User.getAttributes();
    const bookAttributes = Book.getAttributes();
    
    // Generate PlantUML diagram
    const diagram = `@startuml
!theme plain

entity "Users" {
  ${Object.entries(userAttributes).map(([key, attr]) => 
    `${key} : ${attr.type.constructor.name}${attr.primaryKey ? ' <<PK>>' : ''}${attr.allowNull ? '' : ' <<NOT NULL>>'}`
  ).join('\n  ')}
}

entity "Books" {
  ${Object.entries(bookAttributes).map(([key, attr]) => 
    `${key} : ${attr.type.constructor.name}${attr.primaryKey ? ' <<PK>>' : ''}${attr.allowNull ? '' : ' <<NOT NULL>>'}`
  ).join('\n  ')}
}

@enduml`;
    
    // Write to file
    const diagramPath = path.join(__dirname, '..', 'docs', 'db-diagram.puml');
    
    // Create docs directory if it doesn't exist
    if (!fs.existsSync(path.dirname(diagramPath))) {
      fs.mkdirSync(path.dirname(diagramPath), { recursive: true });
    }
    
    fs.writeFileSync(diagramPath, diagram);
    console.log(`Database schema diagram generated at: ${diagramPath}`);
    
    // Generate text version for console
    console.log('\nDatabase Schema:');
    console.log('--------------');
    console.log('User:');
    Object.entries(userAttributes).forEach(([key, attr]) => {
      console.log(`  ${key}: ${attr.type.constructor.name}${attr.primaryKey ? ' (PK)' : ''}${attr.allowNull ? '' : ' (NOT NULL)'}`);
    });
    
    console.log('\nBook:');
    Object.entries(bookAttributes).forEach(([key, attr]) => {
      console.log(`  ${key}: ${attr.type.constructor.name}${attr.primaryKey ? ' (PK)' : ''}${attr.allowNull ? '' : ' (NOT NULL)'}`);
    });
    
  } catch (error) {
    console.error('Error generating diagram:', error);
  } finally {
    await sequelize.close();
  }
}

generateDiagram();
