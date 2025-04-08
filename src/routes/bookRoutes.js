const express = require('express');
const { createBook, getAllBooks, getBookById, updateBookById, deleteBookById } = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validateBook } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Protect all book routes
router.use(authenticate);

// Create a new book
router.post('/', validateBook, createBook);

// Get all books
router.get('/', getAllBooks);

// Get book by ID
router.get('/:id', getBookById);

// Update book by ID
router.put('/:id', validateBook, updateBookById);

// Delete book by ID
router.delete('/:id', deleteBookById);

module.exports = router;
