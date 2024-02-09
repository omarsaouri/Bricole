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
const authToken = require('../../middlewares/jwt/authToken');
const getRequests = require('../../controllers/request/getRequestsController');
const getRequest = require('../../controllers/request/getOneRequestController');
const deleteRequest = require('../../controllers/request/deleteRequestController');
const updateRequest = require('../../controllers/request/updateRequestController');
const updateRequestMiddleware = require('../../middlewares/request/updateRequestMiddleware');

requestRouter.post(
  '/new',
  descriptionMiddleware,
  priceMiddleware,
  cityMiddleware,
  addressMiddleware,
  dueDateMiddleware,
  difficultyMiddleware,
  authToken,
  newRequest,
);
requestRouter.get('/', authToken, getRequests);
requestRouter.get('/:id', authToken, getRequest);
requestRouter.put('/:id', authToken, updateRequestMiddleware, updateRequest);
requestRouter.delete('/delete', authToken, deleteRequest);

module.exports = requestRouter;
