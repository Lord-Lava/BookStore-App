const jwt = require('jsonwebtoken');
const { authenticate } = require('../../../src/middlewares/authMiddleware');
const { User } = require('../../../src/models');


jest.mock('../../../src/models');
jest.mock('jsonwebtoken');

describe('Authentication Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      headers: {
        authorization: 'Bearer valid-token'
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });

  test('should call next() when token is valid and user is found', async () => {

    const userId = '123';
    const user = { id: userId, email: 'test@example.com' };
    
    jwt.verify.mockReturnValue({ id: userId });
    User.findByPk.mockResolvedValue(user);
    
    await authenticate(req, res, next);
    
    expect(jwt.verify).toHaveBeenCalledWith('valid-token', process.env.JWT_SECRET);
    expect(User.findByPk).toHaveBeenCalledWith(userId);
    expect(req.user).toEqual(user);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('should return 401 when authorization header is missing', async () => {
    req.headers.authorization = undefined;
    
    await authenticate(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 when authorization header does not start with Bearer', async () => {
    req.headers.authorization = 'NotBearer token';
    
    await authenticate(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 when token cannot be verified', async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });
    
    await authenticate(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is not valid' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 when user is not found', async () => {
    jwt.verify.mockReturnValue({ id: '123' });
    User.findByPk.mockResolvedValue(null);
    
    await authenticate(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    expect(next).not.toHaveBeenCalled();
  });
});
