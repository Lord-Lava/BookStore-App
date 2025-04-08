const { createBook, getAllBooks, getBookById, updateBookById, deleteBookById } = require('../../../src/controllers/bookController');
const { Book } = require('../../../src/models');
const { Op } = require('sequelize');


jest.mock('../../../src/models');
jest.mock('sequelize', () => {
  const actualSequelize = jest.requireActual('sequelize');
  return {
    ...actualSequelize,
    Op: {
      iLike: jest.fn().mockImplementation(pattern => ({ iLike: pattern }))
    }
  };
});

describe('Book Controller', () => {
  let req;
  let res;
  let next;
  const mockBook = {
    id: '123',
    title: 'Test Book',
    author: 'Test Author',
    category: 'Fiction',
    price: 12.99,
    rating: 4.5,
    publishedDate: new Date('2023-01-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
    toJSON: function() { return this; }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        price: 12.99,
        rating: 4.5,
        publishedDate: '2023-01-01'
      },
      params: {
        id: '123'
      },
      query: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });

  describe('createBook', () => {
    test('should create a book and return 201 status', async () => {
      Book.create.mockResolvedValue(mockBook);
      const expectedInput = {
        ...req.body,
        publishedDate: new Date(req.body.publishedDate)
      };
      
      await createBook(req, res, next);
      expect(Book.create).toHaveBeenCalledWith(expectedInput);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    test('should call next with error if exception occurs', async () => {
      const error = new Error('Database error');
      Book.create.mockRejectedValue(error);
      
      await createBook(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getAllBooks', () => {
    test('should return books with pagination', async () => {
      const books = [mockBook];
      const count = 1;
      Book.findAndCountAll.mockResolvedValue({ rows: books, count });
      
      await getAllBooks(req, res, next);
      expect(Book.findAndCountAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        totalItems: count,
        totalPages: 1,
        currentPage: 1,
        books: expect.any(Array)
      });
    });

    test('should apply filtering when query parameters are provided', async () => {
      req.query = {
        author: 'Test Author',
        category: 'Fiction',
        title: 'Test',
        page: '2',
        limit: '10'
      };
      
      const books = [mockBook];
      const count = 1;
      Book.findAndCountAll.mockResolvedValue({ rows: books, count });
      
      await getAllBooks(req, res, next);
      expect(Book.findAndCountAll).toHaveBeenCalledWith({
        where: expect.objectContaining({
          author: 'Test Author',
          category: 'Fiction',
          title: expect.anything()
        }),
        order: [],
        limit: 10,
        offset: 10
      });
    });

    test('should call next with error if exception occurs', async () => {
      const error = new Error('Database error');
      Book.findAndCountAll.mockRejectedValue(error);
      
      await getAllBooks(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getBookById', () => {
    test('should return a book when valid id is provided', async () => {
      Book.findByPk.mockResolvedValue(mockBook);
      
      await getBookById(req, res, next);
      expect(Book.findByPk).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalled();
    });

    test('should return 404 if book is not found', async () => {
      Book.findByPk.mockResolvedValue(null);
      
      await getBookById(req, res, next);
      expect(Book.findByPk).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('should call next with error if exception occurs', async () => {
      const error = new Error('Database error');
      Book.findByPk.mockRejectedValue(error);
      
      await getBookById(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateBookById', () => {
    test('should update a book and return it when valid id is provided', async () => {
      const updatedBook = { ...mockBook, title: 'Updated Title' };
      const mockUpdate = jest.fn().mockResolvedValue(updatedBook);
      Book.findByPk.mockResolvedValue({ ...mockBook, update: mockUpdate });
      const expectedInput = {
        ...req.body,
        publishedDate: new Date(req.body.publishedDate)
      };
      
      await updateBookById(req, res, next);
      expect(Book.findByPk).toHaveBeenCalledWith('123');
      expect(mockUpdate).toHaveBeenCalledWith(expectedInput);
      expect(res.json).toHaveBeenCalled();
    });

    test('should return 404 if book is not found', async () => {
      Book.findByPk.mockResolvedValue(null);
      
      await updateBookById(req, res, next);
      expect(Book.findByPk).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('should call next with error if exception occurs', async () => {
      const error = new Error('Database error');
      Book.findByPk.mockRejectedValue(error);
      
      await updateBookById(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteBookById', () => {
    test('should delete a book and return success message when valid id is provided', async () => {
      const mockDestroy = jest.fn().mockResolvedValue(1);
      Book.findByPk.mockResolvedValue({ ...mockBook, destroy: mockDestroy });
      
      await deleteBookById(req, res, next);
      expect(Book.findByPk).toHaveBeenCalledWith('123');
      expect(mockDestroy).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: 'Book deleted successfully' });
    });

    test('should return 404 if book is not found', async () => {
      Book.findByPk.mockResolvedValue(null);
      
      await deleteBookById(req, res, next);
      expect(Book.findByPk).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('should call next with error if exception occurs', async () => {
      const error = new Error('Database error');
      Book.findByPk.mockRejectedValue(error);
      
      await deleteBookById(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
