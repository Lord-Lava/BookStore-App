const UserSignupDto = require('../../../../src/dtos/request/UserSignupDto');

describe('UserSignupDto', () => {
  const validSignupData = {
    email: 'test@example.com',
    password: 'password123'
  };

  test('should create a valid DTO from data', () => {
    const dto = new UserSignupDto(validSignupData);
    
    expect(dto.email).toBe(validSignupData.email);
    expect(dto.password).toBe(validSignupData.password);
  });

  test('should validate valid signup data without errors', () => {
    const { error } = UserSignupDto.validate(validSignupData);
    
    expect(error).toBeUndefined();
  });

  test('should reject data with missing email', () => {
    const invalidData = {
      password: 'password123'
    };
    
    const { error } = UserSignupDto.validate(invalidData);
    
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('email');
  });

  test('should reject data with invalid email format', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123'
    };
    
    const { error } = UserSignupDto.validate(invalidData);
    
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('email');
  });

  test('should reject data with missing password', () => {
    const invalidData = {
      email: 'test@example.com'
    };
    
    const { error } = UserSignupDto.validate(invalidData);
    
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('password');
  });

  test('should reject data with password that is too short', () => {
    const invalidData = {
      email: 'test@example.com',
      password: '12345' // Less than 6 characters
    };
    
    const { error } = UserSignupDto.validate(invalidData);
    
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('password');
  });

  test('should convert DTO to model', () => {
    const dto = new UserSignupDto(validSignupData);
    const model = dto.toModel();
    
    expect(model).toEqual(validSignupData);
  });
});
