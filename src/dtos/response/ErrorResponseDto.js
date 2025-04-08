/**
 * Data Transfer Object for standardized error responses
 */
class ErrorResponseDto {
  constructor(statusCode, message, details = null) {
    this.error = {
      statusCode: statusCode,
      message: message
    };
    
    if (details) {
      this.error.details = details;
    }
    
    if (process.env.NODE_ENV === 'development' && details && details.stack) {
      this.error.stack = details.stack;
    }
  }

  // Create validation error response
  static validationError(details) {
    return new ErrorResponseDto(400, 'Validation Error', details);
  }

  // Create not found error response
  static notFound(resource = 'Resource') {
    return new ErrorResponseDto(404, `${resource} not found`);
  }

  // Create authentication error response
  static authError(message = 'Authentication failed') {
    return new ErrorResponseDto(401, message);
  }

  // Create server error response
  static serverError(error) {
    return new ErrorResponseDto(
      500, 
      'Internal Server Error', 
      process.env.NODE_ENV === 'development' ? error : null
    );
  }
}

module.exports = ErrorResponseDto;
