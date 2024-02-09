const express = require('express');
const newRequest = require('../../controllers/request/newRequestController');
const requestRouter = express.Router();
const {
  descriptionMiddleware,
  priceMiddleware,
  cityMiddleware,
  addressMiddleware,
  dueDateMiddleware,
  difficultyMiddleware,
} = require('../../middlewares/request/newRequestMiddlewares');

requestRouter.post(
  '/new',
  descriptionMiddleware,
  priceMiddleware,
  cityMiddleware,
  addressMiddleware,
  dueDateMiddleware,
  difficultyMiddleware,
  newRequest,
);

module.exports = requestRouter;
