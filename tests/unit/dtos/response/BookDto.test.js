const BookDto = require('../../../../src/dtos/response/BookDto');

describe('BookDto', () => {
  const bookModel = {
    id: '123',
    title: 'Test Book',
    author: 'Test Author',
    category: 'Fiction',
    price: 12.99,
    rating: 4.5,
    publishedDate: new Date('2023-01-01'),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  test('should create a DTO from a model', () => {
    // Act
    const dto = BookDto.fromModel(bookModel);
    
    // Assert
    expect(dto.id).toBe(bookModel.id);
    expect(dto.title).toBe(bookModel.title);
    expect(dto.author).toBe(bookModel.author);
    expect(dto.category).toBe(bookModel.category);
    expect(dto.price).toBe(bookModel.price);
    expect(dto.rating).toBe(bookModel.rating);
    expect(dto.publishedDate).toBe(bookModel.publishedDate);
    
    // Should not include these fields
    expect(dto.createdAt).toBeUndefined();
    expect(dto.updatedAt).toBeUndefined();
  });

  test('should convert an array of models to an array of DTOs', () => {
    // Arrange
    const models = [bookModel, {...bookModel, id: '456', title: 'Second Book'}];
    
    // Act
    const dtos = BookDto.fromModelArray(models);
    
    // Assert
    expect(dtos).toHaveLength(2);
    expect(dtos[0].id).toBe('123');
    expect(dtos[1].id).toBe('456');
    expect(dtos[1].title).toBe('Second Book');
    
    // Should not include these fields
    expect(dtos[0].createdAt).toBeUndefined();
    expect(dtos[1].updatedAt).toBeUndefined();
  });
});
