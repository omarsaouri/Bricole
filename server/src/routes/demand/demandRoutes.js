const express = require('express');
const newDemand = require('../../controllers/demand/newDemandController');
const {
  requestIdMiddleware,
} = require('../../middlewares/demand/demandMiddlewares');
const {
  userIdMiddleware,
} = require('../../middlewares/demand/demandMiddlewares');
const {
  grantedMiddleware,
} = require('../../middlewares/demand/demandMiddlewares');
const {stateMiddleware} = require('../../middlewares/demand/demandMiddlewares');
const getRequestDemands = require('../../controllers/demand/getRequestDemandsController');
const getUserDemands = require('../../controllers/demand/getUserDemandsController');
const putGranted = require('../../controllers/demand/putGrantedDemandController');
const putState = require('../../controllers/demand/putStateDemandController');
const demandRouter = express.Router();

demandRouter.post('/new', requestIdMiddleware, userIdMiddleware, newDemand); // create a new demand
demandRouter.get('/request/:requestId', getRequestDemands); // get all the demands of a certain request
demandRouter.get('/user/:userId', getUserDemands); // get all the demands of a certain user
demandRouter.put('/granted/:demandId', putGranted); //  grant permissision for the user
demandRouter.put('/state/:demandId', stateMiddleware, putState); //  change state of the demand

module.exports = demandRouter;
