const ErrorResponseDto = require('../../../../src/dtos/response/ErrorResponseDto');

describe('ErrorResponseDto', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  
  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  test('should create an error response with status code and message', () => {
    const dto = new ErrorResponseDto(404, 'Resource not found');
    
    expect(dto.error.statusCode).toBe(404);
    expect(dto.error.message).toBe('Resource not found');
    expect(dto.error.details).toBeUndefined();
  });

  test('should include details when provided', () => {
    const details = { field: 'email', reason: 'already exists' };
    const dto = new ErrorResponseDto(400, 'Validation error', details);
    
    expect(dto.error.statusCode).toBe(400);
    expect(dto.error.message).toBe('Validation error');
    expect(dto.error.details).toEqual(details);
  });

  test('should include stack trace in development mode', () => {
    process.env.NODE_ENV = 'development';
    const error = new Error('Test error');
    
    const dto = new ErrorResponseDto(500, 'Server error', error);
    
    expect(dto.error.statusCode).toBe(500);
    expect(dto.error.message).toBe('Server error');
    expect(dto.error.stack).toBeDefined();
  });

  test('should not include stack trace in production mode', () => {
    process.env.NODE_ENV = 'production';
    const error = new Error('Test error');
    
    const dto = new ErrorResponseDto(500, 'Server error', error);
    
    expect(dto.error.statusCode).toBe(500);
    expect(dto.error.message).toBe('Server error');
    expect(dto.error.stack).toBeUndefined();
  });

  test('should create validation error response', () => {
    const details = { message: 'Invalid input' };
    
    const dto = ErrorResponseDto.validationError(details);
    
    expect(dto.error.statusCode).toBe(400);
    expect(dto.error.message).toBe('Validation Error');
    expect(dto.error.details).toEqual(details);
  });

  test('should create not found error response', () => {
    const dto = ErrorResponseDto.notFound('Book');
    
    expect(dto.error.statusCode).toBe(404);
    expect(dto.error.message).toBe('Book not found');
  });

  test('should create auth error response', () => {
    const dto = ErrorResponseDto.authError('Invalid token');
    
    expect(dto.error.statusCode).toBe(401);
    expect(dto.error.message).toBe('Invalid token');
  });

  test('should create server error response', () => {
    const error = new Error('Database connection failed');
    
    const dto = ErrorResponseDto.serverError(error);
    
    expect(dto.error.statusCode).toBe(500);
    expect(dto.error.message).toBe('Internal Server Error');
  });
});
