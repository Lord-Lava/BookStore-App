const express = require('express');
const { signup, login } = require('../controllers/userController');
const { validateUserSignup, validateUserLogin } = require('../middlewares/validationMiddleware');

const router = express.Router();


router.post('/signup', validateUserSignup, signup);


router.post('/login', validateUserLogin, login);

module.exports = router;
