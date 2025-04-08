/**
 * Book Controller
 * Handles book CRUD operations
 */
const { Book } = require('../models');
const { Op } = require('sequelize');

// Import DTOs
const CreateBookDto = require('../dtos/request/CreateBookDto');
const BookDto = require('../dtos/response/BookDto');
const ErrorResponseDto = require('../dtos/response/ErrorResponseDto');

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     description: Add a new book to the database
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - category
 *               - price
 *               - rating
 *               - publishedDate
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               rating:
 *                 type: number
 *               publishedDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
const createBook = async (req, res, next) => {
  try {
    // Validate request body using DTO
    const { error, value } = CreateBookDto.validate(req.body);
    
    if (error) {
      return res.status(400).json(ErrorResponseDto.validationError(error.details));
    }
    
    // Convert DTO to model and create book
    const bookDto = new CreateBookDto(value);
    const book = await Book.create(bookDto.toModel());
    
    // Return response using DTO
    res.status(201).json(BookDto.fromModel(book));
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieves all books with optional filtering, pagination and sorting
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *         description: Filter by rating
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search by title (partial match)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Results per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, rating]
 *         description: Field to sort by (only price and rating are supported)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of books
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
const getAllBooks = async (req, res, next) => {
  try {
    const { author, category, rating, title, page = 1, limit = 10, sortBy, order = 'ASC' } = req.query;
    
    // Build filter condition
    const whereCondition = {};
    
    if (author) {
      whereCondition.author = author;
    }
    
    if (category) {
      whereCondition.category = category;
    }
    
    if (rating) {
      whereCondition.rating = rating;
    }
    
    if (title) {
      whereCondition.title = {
        [Op.iLike]: `%${title}%`
      };
    }
    
    // Build order options
    const orderOptions = [];
    
    // Restrict sorting to only price and rating
    if (sortBy) {
      // Only allow sorting by price or rating
      if (['price', 'rating'].includes(sortBy.toLowerCase())) {
        orderOptions.push([sortBy, order.toUpperCase()]);
      }
    }
    
    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Find books
    const { count, rows: books } = await Book.findAndCountAll({
      where: whereCondition,
      order: orderOptions,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    // Transform models to DTOs
    const bookDtos = BookDto.fromModelArray(books);
    
    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      books: bookDtos
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     description: Retrieves a book by its ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findByPk(id);
    
    if (!book) {
      return res.status(404).json(ErrorResponseDto.notFound('Book'));
    }
    
    // Transform to DTO
    const bookDto = BookDto.fromModel(book);
    
    res.json(bookDto);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update book
 *     description: Updates an existing book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               rating:
 *                 type: number
 *               publishedDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
const updateBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validate request body using DTO
    const { error, value } = CreateBookDto.validate(req.body);
    
    if (error) {
      return res.status(400).json(ErrorResponseDto.validationError(error.details));
    }
    
    const book = await Book.findByPk(id);
    
    if (!book) {
      return res.status(404).json(ErrorResponseDto.notFound('Book'));
    }
    
    // Convert DTO to model and update
    const bookDto = new CreateBookDto(value);
    await book.update(bookDto.toModel());
    
    // Return response using DTO
    res.json(BookDto.fromModel(book));
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete book
 *     description: Deletes a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
const deleteBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findByPk(id);
    
    if (!book) {
      return res.status(404).json(ErrorResponseDto.notFound('Book'));
    }
    
    await book.destroy();
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById
};
