/**
 * Data Transfer Object for creating a new book
 * Separates API layer from domain model
 */
const Joi = require('joi');

class CreateBookDto {
  constructor(data) {
    this.title = data.title;
    this.author = data.author;
    this.category = data.category;
    this.price = data.price;
    this.rating = data.rating;
    this.publishedDate = data.publishedDate;
  }

  // Validation schema
  static get validationSchema() {
    return Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      category: Joi.string().required(),
      price: Joi.number().precision(2).positive().required(),
      rating: Joi.number().min(0).max(5).precision(1).required(),
      publishedDate: Joi.date().required()
    });
  }

  // Validate the DTO
  static validate(data) {
    return this.validationSchema.validate(data);
  }

  // Convert to domain model
  toModel() {
    return {
      title: this.title,
      author: this.author,
      category: this.category,
      price: this.price,
      rating: this.rating,
      publishedDate: this.publishedDate
    };
  }
}

module.exports = CreateBookDto;
