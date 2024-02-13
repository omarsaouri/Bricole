const express = require('express');
const newDemand = require('../../controllers/demand/newDemandController');
const demandRouter = express.Router();

demandRouter.post('/new', newDemand); // create a new demand
demandRouter.get('/:requestId'); // get all the demands of a certain request
demandRouter.get('/:userId'); // get all the demands of a certain user
demandRouter.put('/granted'); //  grant permissision for the user
demandRouter.put('/state'); //  change state of the demand

module.exports = demandRouter;
