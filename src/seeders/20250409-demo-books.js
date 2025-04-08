'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books', [
      {
        id: uuidv4(),
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Fiction',
        price: 12.99,
        rating: 4.8,
        publishedDate: new Date('1960-07-11'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: '1984',
        author: 'George Orwell',
        category: 'Science Fiction',
        price: 10.99,
        rating: 4.6,
        publishedDate: new Date('1949-06-08'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        price: 9.99,
        rating: 4.3,
        publishedDate: new Date('1925-04-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        category: 'Romance',
        price: 8.99,
        rating: 4.7,
        publishedDate: new Date('1813-01-28'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        category: 'Fantasy',
        price: 14.99,
        rating: 4.9,
        publishedDate: new Date('1937-09-21'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
