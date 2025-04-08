const express = require('express');
const { signup, login } = require('../controllers/userController');
const { validateUserSignup, validateUserLogin } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Register a new user
router.post('/signup', validateUserSignup, signup);

// Login user
router.post('/login', validateUserLogin, login);

module.exports = router;
