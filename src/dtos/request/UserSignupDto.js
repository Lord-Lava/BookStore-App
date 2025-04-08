/**
 * Data Transfer Object for user signup requests
 */
const Joi = require('joi');

class UserSignupDto {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }

  // Validation schema
  static get validationSchema() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });
  }

  // Validate the DTO
  static validate(data) {
    return this.validationSchema.validate(data);
  }

  // Convert to domain model
  toModel() {
    return {
      email: this.email,
      password: this.password
    };
  }
}

module.exports = UserSignupDto;
