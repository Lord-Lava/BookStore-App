const ErrorResponseDto = require('../dtos/response/ErrorResponseDto');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Use ErrorResponseDto for consistent error responses
  res.status(statusCode).json(
    new ErrorResponseDto(statusCode, message, err)
  );
};

module.exports = {
  errorHandler
};
