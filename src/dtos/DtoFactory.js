/**
 * DTO Factory
 * Provides convenient methods to create and transform DTOs
 */

// Import request DTOs
const CreateBookDto = require('./request/CreateBookDto');
const UserSignupDto = require('./request/UserSignupDto');
const UserLoginDto = require('./request/UserLoginDto');

// Import response DTOs
const BookDto = require('./response/BookDto');
const AuthResponseDto = require('./response/AuthResponseDto');
const ErrorResponseDto = require('./response/ErrorResponseDto');

class DtoFactory {
  // Create a request DTO from data
  static createRequest(type, data) {
    switch (type) {
      case 'createBook':
        return new CreateBookDto(data);
      case 'userSignup':
        return new UserSignupDto(data);
      case 'userLogin':
        return new UserLoginDto(data);
      default:
        throw new Error(`Unknown request DTO type: ${type}`);
    }
  }

  // Validate request data
  static validate(type, data) {
    switch (type) {
      case 'createBook':
        return CreateBookDto.validate(data);
      case 'userSignup':
        return UserSignupDto.validate(data);
      case 'userLogin':
        return UserLoginDto.validate(data);
      default:
        throw new Error(`Unknown validation type: ${type}`);
    }
  }

  // Transform a model to a response DTO
  static createResponse(type, model, options = {}) {
    switch (type) {
      case 'book':
        return BookDto.fromModel(model);
      case 'bookList':
        return BookDto.fromModelArray(model);
      case 'auth':
        return AuthResponseDto.success(options.message, options.token, options.user);
      case 'error':
        return new ErrorResponseDto(options.statusCode || 500, options.message, options.details);
      default:
        throw new Error(`Unknown response DTO type: ${type}`);
    }
  }

  // Create predefined error responses
  static error = {
    validation: (details) => ErrorResponseDto.validationError(details),
    notFound: (resource) => ErrorResponseDto.notFound(resource),
    auth: (message) => ErrorResponseDto.authError(message),
    server: (error) => ErrorResponseDto.serverError(error)
  };
}

module.exports = DtoFactory;
