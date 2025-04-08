const UserLoginDto = require('../../../../src/dtos/request/UserLoginDto');

describe('UserLoginDto', () => {
  const validLoginData = {
    email: 'test@example.com',
    password: 'password123'
  };

  test('should create a valid DTO from data', () => {
    const dto = new UserLoginDto(validLoginData);
    
    expect(dto.email).toBe(validLoginData.email);
    expect(dto.password).toBe(validLoginData.password);
  });

  test('should validate valid login data without errors', () => {
    const { error } = UserLoginDto.validate(validLoginData);
    
    expect(error).toBeUndefined();
  });

  test('should reject data with missing email', () => {
    const invalidData = {
      password: 'password123'
    };
    
    const { error } = UserLoginDto.validate(invalidData);
    
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('email');
  });

  test('should reject data with invalid email format', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123'
    };
    
    const { error } = UserLoginDto.validate(invalidData);
    
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('email');
  });

  test('should reject data with missing password', () => {
    const invalidData = {
      email: 'test@example.com'
    };
    
    const { error } = UserLoginDto.validate(invalidData);
    
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('password');
  });
});
