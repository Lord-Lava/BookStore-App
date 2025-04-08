const CreateBookDto = require('../../../../src/dtos/request/CreateBookDto');

describe('CreateBookDto', () => {
  const validBookData = {
    title: 'Test Book',
    author: 'Test Author',
    category: 'Fiction',
    price: 12.99,
    rating: 4.5,
    publishedDate: '2023-01-01'
  };

  test('should create a valid DTO from data', () => {
    const dto = new CreateBookDto(validBookData);
    
    expect(dto.title).toBe(validBookData.title);
    expect(dto.author).toBe(validBookData.author);
    expect(dto.category).toBe(validBookData.category);
    expect(dto.price).toBe(validBookData.price);
    expect(dto.rating).toBe(validBookData.rating);
    expect(dto.publishedDate).toBe(validBookData.publishedDate);
  });

  test('should validate valid data without errors', () => {
    const { error } = CreateBookDto.validate(validBookData);
    
    expect(error).toBeUndefined();
  });

  test('should reject data with missing required fields', () => {
    const invalidData = {
      title: 'Test Book',
      category: 'Fiction',
      price: 12.99,
      rating: 4.5,
      publishedDate: '2023-01-01'
    };
    
    const { error } = CreateBookDto.validate(invalidData);
    
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('author');
  });

  test('should reject data with invalid rating', () => {
    const invalidData = {
      ...validBookData,
      rating: 6.0 // Rating should be max 5
    };
    
    const { error } = CreateBookDto.validate(invalidData);
    
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('rating');
  });

  test('should convert DTO to model', () => {
    const dto = new CreateBookDto(validBookData);
    
    const model = dto.toModel();
    
    expect(model).toEqual(validBookData);
  });
});
