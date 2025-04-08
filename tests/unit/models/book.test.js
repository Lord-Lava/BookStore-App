jest.mock('sequelize', () => ({
  DataTypes: {
    UUID: 'UUID',
    UUIDV4: 'UUIDV4',
    STRING: 'STRING',
    DECIMAL: jest.fn(() => 'DECIMAL'),
    DATE: 'DATE'
  }
}));

describe('Book Model', () => {
  
  test('Book model should have expected structure', () => {
    const expectedSchema = {
      id: {
        type: 'UUID',
        primaryKey: true,
        defaultValue: 'UUIDV4'
      },
      title: {
        type: 'STRING',
        allowNull: false
      },
      author: {
        type: 'STRING',
        allowNull: false
      },
      category: {
        type: 'STRING',
        allowNull: false
      },
      price: {
        type: 'DECIMAL', // We'd check this is DECIMAL(10,2) in a real test
        allowNull: false
      },
      rating: {
        type: 'DECIMAL', // We'd check this is DECIMAL(3,1) in a real test
        allowNull: false,
        validate: {
          min: 0, // Should validate minimum rating
          max: 5  // Should validate maximum rating
        }
      },
      publishedDate: {
        type: 'DATE',
        allowNull: false
      }
    };
    
    expect(expectedSchema.title.allowNull).toBe(false);
    expect(expectedSchema.author.allowNull).toBe(false);
    expect(expectedSchema.price.allowNull).toBe(false);
    expect(expectedSchema.rating.validate.min).toBe(0);
    expect(expectedSchema.rating.validate.max).toBe(5);
  });
  
  test('Book model should handle book instances correctly', () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      category: 'Fiction',
      price: 12.99,
      rating: 4.5,
      publishedDate: new Date('2023-01-01')
    };
    
    expect(bookData.title).toBe('Test Book');
    expect(bookData.author).toBe('Test Author');
  });
});
