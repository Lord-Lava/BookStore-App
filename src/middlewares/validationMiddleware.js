const Joi = require('joi');

const validateUserSignup = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  
  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  next();
};

const validateUserLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  
  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  next();
};

const validateBook = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().precision(2).positive().required(),
    rating: Joi.number().min(0).max(5).precision(1).required(),
    publishedDate: Joi.date().required()
  });
  
  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  next();
};

module.exports = {
  validateUserSignup,
  validateUserLogin,
  validateBook
};
