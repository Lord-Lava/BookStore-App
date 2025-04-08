/**
 * Data Transfer Object for sending book data in responses
 * Separates API layer from domain model
 */
class BookDto {
  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.author = model.author;
    this.category = model.category;
    this.price = model.price;
    this.rating = model.rating;
    this.publishedDate = model.publishedDate;
    // Exclude sensitive or unnecessary fields like createdAt/updatedAt
  }

  // Convert from domain model to DTO
  static fromModel(model) {
    return new BookDto(model);
  }

  // Convert from array of models to array of DTOs
  static fromModelArray(models) {
    return models.map(model => BookDto.fromModel(model));
  }
}

module.exports = BookDto;
