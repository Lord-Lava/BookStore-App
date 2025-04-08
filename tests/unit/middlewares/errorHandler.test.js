const { errorHandler } = require('../../../src/middlewares/errorHandler');
const ErrorResponseDto = require('../../../src/dtos/response/ErrorResponseDto');


jest.mock('../../../src/dtos/response/ErrorResponseDto');

describe('Error Handler Middleware', () => {
  let req;
  let res;
  let next;
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    
    ErrorResponseDto.mockClear();
    ErrorResponseDto.mockImplementation((statusCode, message, error) => ({
      error: {
        statusCode,
        message,
        details: error
      }
    }));
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('should respond with status code from error if present', () => {
    const error = new Error('Custom error');
    error.statusCode = 400;
    
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(ErrorResponseDto).toHaveBeenCalledWith(400, 'Custom error', error);
    expect(res.json).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error.stack);
  });

  test('should use 500 status code if no statusCode on error', () => {
    const error = new Error('Server error');
    
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(ErrorResponseDto).toHaveBeenCalledWith(500, 'Server error', error);
    expect(res.json).toHaveBeenCalled();
  });

  test('should use "Internal Server Error" if no message on error', () => {
    const error = new Error();
    error.message = ''; // Empty message
    
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(ErrorResponseDto).toHaveBeenCalledWith(500, 'Internal Server Error', error);
    expect(res.json).toHaveBeenCalled();
  });

  test('should log error stack to console', () => {
    const error = new Error('Test error');
    
    errorHandler(error, req, res, next);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error.stack);
  });
});
