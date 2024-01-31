const express = require('express');
const registerUser = require('../../controllers/auth/registerController');
const {
  firstNameMiddleware,
} = require('../../middlewares/auth/registerMiddlewares');
const {
  lastNameMiddleware,
} = require('../../middlewares/auth/registerMiddlewares');
const {
  phoneNumberMiddleware,
} = require('../../middlewares/auth/registerMiddlewares');
const {
  passwordMiddleware,
} = require('../../middlewares/auth/registerMiddlewares');
const loginUser = require('../../controllers/auth/loginController');
const authRouter = express.Router();

authRouter.post(
  '/register',
  firstNameMiddleware,
  lastNameMiddleware,
  phoneNumberMiddleware,
  passwordMiddleware,
  registerUser,
);

authRouter.post('/login', loginUser);

module.exports = authRouter;
