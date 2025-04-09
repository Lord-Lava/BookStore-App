const express = require('express');
const { createBook, getAllBooks, getBookById, updateBookById, deleteBookById } = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validateBook } = require('../middlewares/validationMiddleware');

const router = express.Router();


router.use(authenticate);


router.post('/', validateBook, createBook);


router.get('/', getAllBooks);


router.get('/:id', getBookById);


router.put('/:id', validateBook, updateBookById);


router.delete('/:id', deleteBookById);

module.exports = router;
