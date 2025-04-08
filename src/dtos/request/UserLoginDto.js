/**
 * Data Transfer Object for user login requests
 */
const Joi = require('joi');

class UserLoginDto {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }

  // Validation schema
  static get validationSchema() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
  }

  // Validate the DTO
  static validate(data) {
    return this.validationSchema.validate(data);
  }
}

module.exports = UserLoginDto;
