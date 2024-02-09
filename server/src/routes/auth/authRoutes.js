const express = require('express');
const authRouter = express.Router();
const registerUser = require('../../controllers/auth/registerController');
const loginUser = require('../../controllers/auth/loginController');
const {
  firstNameMiddleware,
  lastNameMiddleware,
  phoneNumberMiddleware,
  passwordMiddleware,
  idealDifficultydMiddleware,
} = require('../../middlewares/auth/registerMiddlewares');

const {
  difficultyMiddleware,
  cityMiddleware,
} = require('../../middlewares/request/newRequestMiddlewares');

authRouter.post(
  '/register',
  firstNameMiddleware,
  lastNameMiddleware,
  phoneNumberMiddleware,
  passwordMiddleware,
  idealDifficultydMiddleware,
  cityMiddleware,
  registerUser,
);

authRouter.post('/login', loginUser);

module.exports = authRouter;
