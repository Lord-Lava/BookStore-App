

const CreateBookDto = require('./request/CreateBookDto');
const UserSignupDto = require('./request/UserSignupDto');
const UserLoginDto = require('./request/UserLoginDto');


const BookDto = require('./response/BookDto');
const AuthResponseDto = require('./response/AuthResponseDto');
const ErrorResponseDto = require('./response/ErrorResponseDto');

class DtoFactory {

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


  static error = {
    validation: (details) => ErrorResponseDto.validationError(details),
    notFound: (resource) => ErrorResponseDto.notFound(resource),
    auth: (message) => ErrorResponseDto.authError(message),
    server: (error) => ErrorResponseDto.serverError(error)
  };
}

module.exports = DtoFactory;
