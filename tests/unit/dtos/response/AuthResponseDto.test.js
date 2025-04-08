const AuthResponseDto = require('../../../../src/dtos/response/AuthResponseDto');

describe('AuthResponseDto', () => {
  test('should create auth response with message and token', () => {
    const message = 'Login successful';
    const token = 'jwt-token-123';
    
    const dto = new AuthResponseDto(message, token);
    
    expect(dto.message).toBe(message);
    expect(dto.token).toBe(token);
    expect(dto.user).toBeUndefined();
  });

  test('should create auth response with user data if provided', () => {
    const message = 'Login successful';
    const token = 'jwt-token-123';
    const user = {
      id: '123',
      email: 'test@example.com',
      password: 'hashed_password'
    };
    
    const dto = new AuthResponseDto(message, token, user);
    
    expect(dto.message).toBe(message);
    expect(dto.token).toBe(token);
    expect(dto.user).toBeDefined();
    expect(dto.user.id).toBe(user.id);
    expect(dto.user.email).toBe(user.email);
    expect(dto.user.password).toBeUndefined();
  });

  test('should create successful auth response using the static method', () => {
    const message = 'Login successful';
    const token = 'jwt-token-123';
    const user = {
      id: '123',
      email: 'test@example.com'
    };
    
    const dto = AuthResponseDto.success(message, token, user);
    
    expect(dto.message).toBe(message);
    expect(dto.token).toBe(token);
    expect(dto.user).toBeDefined();
    expect(dto.user.id).toBe(user.id);
    expect(dto.user.email).toBe(user.email);
  });

  test('should create successful auth response without user data', () => {
    const message = 'Login successful';
    const token = 'jwt-token-123';
    
    const dto = AuthResponseDto.success(message, token);
    
    expect(dto.message).toBe(message);
    expect(dto.token).toBe(token);
    expect(dto.user).toBeUndefined();
  });
});
