const DtoFactory = require('../../../src/dtos/DtoFactory');
const CreateBookDto = require('../../../src/dtos/request/CreateBookDto');
const UserSignupDto = require('../../../src/dtos/request/UserSignupDto');
const UserLoginDto = require('../../../src/dtos/request/UserLoginDto');
const BookDto = require('../../../src/dtos/response/BookDto');
const AuthResponseDto = require('../../../src/dtos/response/AuthResponseDto');
const ErrorResponseDto = require('../../../src/dtos/response/ErrorResponseDto');


jest.mock('../../../src/dtos/request/CreateBookDto');
jest.mock('../../../src/dtos/request/UserSignupDto');
jest.mock('../../../src/dtos/request/UserLoginDto');
jest.mock('../../../src/dtos/response/BookDto');
jest.mock('../../../src/dtos/response/AuthResponseDto');
jest.mock('../../../src/dtos/response/ErrorResponseDto');

describe('DtoFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createRequest', () => {
    test('should create CreateBookDto', () => {
      const data = { title: 'Test Book' };
      
      DtoFactory.createRequest('createBook', data);
      
      expect(CreateBookDto).toHaveBeenCalledWith(data);
    });

    test('should create UserSignupDto', () => {
      const data = { email: 'test@example.com' };
      
      DtoFactory.createRequest('userSignup', data);
      
      expect(UserSignupDto).toHaveBeenCalledWith(data);
    });

    test('should create UserLoginDto', () => {
      const data = { email: 'test@example.com' };
      
      DtoFactory.createRequest('userLogin', data);
      
      expect(UserLoginDto).toHaveBeenCalledWith(data);
    });

    test('should throw error for unknown DTO type', () => {
      expect(() => {
        DtoFactory.createRequest('unknownType', {});
      }).toThrow('Unknown request DTO type: unknownType');
    });
  });

  describe('validate', () => {
    beforeEach(() => {
      CreateBookDto.validate = jest.fn().mockReturnValue({ value: {} });
      UserSignupDto.validate = jest.fn().mockReturnValue({ value: {} });
      UserLoginDto.validate = jest.fn().mockReturnValue({ value: {} });
    });

    test('should validate using CreateBookDto', () => {
      const data = { title: 'Test Book' };
      
      DtoFactory.validate('createBook', data);
      
      expect(CreateBookDto.validate).toHaveBeenCalledWith(data);
    });

    test('should validate using UserSignupDto', () => {
      const data = { email: 'test@example.com' };
      
      DtoFactory.validate('userSignup', data);
      
      expect(UserSignupDto.validate).toHaveBeenCalledWith(data);
    });

    test('should validate using UserLoginDto', () => {
      const data = { email: 'test@example.com' };
      
      DtoFactory.validate('userLogin', data);
      
      expect(UserLoginDto.validate).toHaveBeenCalledWith(data);
    });

    test('should throw error for unknown validation type', () => {
      expect(() => {
        DtoFactory.validate('unknownType', {});
      }).toThrow('Unknown validation type: unknownType');
    });
  });

  describe('createResponse', () => {
    beforeEach(() => {
      BookDto.fromModel = jest.fn().mockReturnValue({});
      BookDto.fromModelArray = jest.fn().mockReturnValue([]);
      AuthResponseDto.success = jest.fn().mockReturnValue({});
    });

    test('should create book response DTO', () => {
      const model = { id: '123' };
      
      DtoFactory.createResponse('book', model);
      
      expect(BookDto.fromModel).toHaveBeenCalledWith(model);
    });

    test('should create book list response DTO', () => {
      const models = [{ id: '123' }];
      
      DtoFactory.createResponse('bookList', models);
      
      expect(BookDto.fromModelArray).toHaveBeenCalledWith(models);
    });

    test('should create auth response DTO', () => {
      const options = { 
        message: 'Login successful',
        token: 'jwt-token',
        user: { id: '123' }
      };
      
      DtoFactory.createResponse('auth', null, options);
      
      expect(AuthResponseDto.success).toHaveBeenCalledWith(
        options.message,
        options.token,
        options.user
      );
    });

    test('should create error response DTO', () => {
      const options = {
        statusCode: 400,
        message: 'Validation error',
        details: { field: 'email' }
      };
      
      DtoFactory.createResponse('error', null, options);
      
      expect(ErrorResponseDto).toHaveBeenCalledWith(
        options.statusCode,
        options.message,
        options.details
      );
    });

    test('should throw error for unknown response type', () => {
      expect(() => {
        DtoFactory.createResponse('unknownType', {});
      }).toThrow('Unknown response DTO type: unknownType');
    });
  });

  describe('error methods', () => {
    beforeEach(() => {
      ErrorResponseDto.validationError = jest.fn();
      ErrorResponseDto.notFound = jest.fn();
      ErrorResponseDto.authError = jest.fn();
      ErrorResponseDto.serverError = jest.fn();
    });

    test('should create validation error', () => {
      const details = { field: 'email' };
      
      DtoFactory.error.validation(details);
      
      expect(ErrorResponseDto.validationError).toHaveBeenCalledWith(details);
    });

    test('should create not found error', () => {
      DtoFactory.error.notFound('Book');
      
      expect(ErrorResponseDto.notFound).toHaveBeenCalledWith('Book');
    });

    test('should create auth error', () => {
      DtoFactory.error.auth('Invalid token');
      
      expect(ErrorResponseDto.authError).toHaveBeenCalledWith('Invalid token');
    });

    test('should create server error', () => {
      const error = new Error('Database error');
      
      DtoFactory.error.server(error);
      
      expect(ErrorResponseDto.serverError).toHaveBeenCalledWith(error);
    });
  });
});
