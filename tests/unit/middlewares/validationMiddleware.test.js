const { validateUserSignup, validateUserLogin, validateBook } = require('../../../src/middlewares/validationMiddleware');

describe('Validation Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });

  describe('validateUserSignup', () => {
    test('should call next() if validation passes', () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      validateUserSignup(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should return 400 if email is missing', () => {
      req.body = {
        password: 'password123'
      };
      
      validateUserSignup(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('email')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if email is invalid', () => {
      req.body = {
        email: 'invalid-email',
        password: 'password123'
      };
      
      validateUserSignup(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('email')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if password is missing', () => {
      req.body = {
        email: 'test@example.com'
      };
      
      validateUserSignup(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('password')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if password is too short', () => {
      req.body = {
        email: 'test@example.com',
        password: '12345'
      };
      
      validateUserSignup(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('password')
      }));
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateUserLogin', () => {
    test('should call next() if validation passes', () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      validateUserLogin(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should return 400 if email is missing', () => {
      req.body = {
        password: 'password123'
      };
      
      validateUserLogin(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('email')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if email is invalid', () => {
      req.body = {
        email: 'invalid-email',
        password: 'password123'
      };
      
      validateUserLogin(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('email')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if password is missing', () => {
      req.body = {
        email: 'test@example.com'
      };
      
      validateUserLogin(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('password')
      }));
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateBook', () => {
    test('should call next() if validation passes', () => {
      req.body = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        price: 12.99,
        rating: 4.5,
        publishedDate: '2023-01-01'
      };
      
      validateBook(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should return 400 if title is missing', () => {
      req.body = {
        author: 'Test Author',
        category: 'Fiction',
        price: 12.99,
        rating: 4.5,
        publishedDate: '2023-01-01'
      };
      
      validateBook(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('title')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if author is missing', () => {
      req.body = {
        title: 'Test Book',
        category: 'Fiction',
        price: 12.99,
        rating: 4.5,
        publishedDate: '2023-01-01'
      };
      
      validateBook(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('author')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if category is missing', () => {
      req.body = {
        title: 'Test Book',
        author: 'Test Author',
        price: 12.99,
        rating: 4.5,
        publishedDate: '2023-01-01'
      };
      
      validateBook(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('category')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if price is missing', () => {
      req.body = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        rating: 4.5,
        publishedDate: '2023-01-01'
      };
      
      validateBook(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('price')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if price is negative', () => {
      req.body = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        price: -12.99,
        rating: 4.5,
        publishedDate: '2023-01-01'
      };
      
      validateBook(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('price')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if rating is missing', () => {
      req.body = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        price: 12.99,
        publishedDate: '2023-01-01'
      };
      
      validateBook(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('rating')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if rating is greater than 5', () => {
      req.body = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        price: 12.99,
        rating: 6,
        publishedDate: '2023-01-01'
      };
      
      validateBook(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('rating')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if publishedDate is missing', () => {
      req.body = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        price: 12.99,
        rating: 4.5
      };
      
      validateBook(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('publishedDate')
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if publishedDate is invalid', () => {
      req.body = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        price: 12.99,
        rating: 4.5,
        publishedDate: 'invalid-date'
      };
      
      validateBook(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('publishedDate')
      }));
      expect(next).not.toHaveBeenCalled();
    });
  });
});
