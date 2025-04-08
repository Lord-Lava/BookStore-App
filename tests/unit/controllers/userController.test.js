const jwt = require('jsonwebtoken');
const { signup, login } = require('../../../src/controllers/userController');
const { User } = require('../../../src/models');


jest.mock('../../../src/models');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });

  describe('signup', () => {
    test('should create a user and return token when valid data is provided', async () => {
      const userId = '123';
      const user = { 
        id: userId, 
        email: 'test@example.com', 
        password: 'hashed_password' 
      };
      
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(user);
      jwt.sign.mockReturnValue('test-token');
      
      await signup(req, res, next);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(User.create).toHaveBeenCalledWith({ 
        email: 'test@example.com', 
        password: 'password123' 
      });
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        token: 'test-token'
      });
    });

    test('should return 400 if user already exists', async () => {
      User.findOne.mockResolvedValue({ id: '123', email: 'test@example.com' });
      
      await signup(req, res, next);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(User.create).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });

    test('should call next with error if exception occurs', async () => {
      const error = new Error('Database error');
      User.findOne.mockRejectedValue(error);
      
      await signup(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('login', () => {
    test('should return token when valid credentials are provided', async () => {
      const user = { 
        id: '123',
        email: 'test@example.com',
        comparePassword: jest.fn().mockResolvedValue(true)
      };
      
      User.findOne.mockResolvedValue(user);
      jwt.sign.mockReturnValue('test-token');
      
      await login(req, res, next);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(user.comparePassword).toHaveBeenCalledWith('password123');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: '123' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        token: 'test-token'
      });
    });

    test('should return 400 if user is not found', async () => {
      User.findOne.mockResolvedValue(null);
      
      await login(req, res, next);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    test('should return 400 if password is incorrect', async () => {
      const user = { 
        id: '123',
        email: 'test@example.com',
        comparePassword: jest.fn().mockResolvedValue(false)
      };
      
      User.findOne.mockResolvedValue(user);
      
      await login(req, res, next);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(user.comparePassword).toHaveBeenCalledWith('password123');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    test('should call next with error if exception occurs', async () => {
      const error = new Error('Database error');
      User.findOne.mockRejectedValue(error);
      
      await login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
