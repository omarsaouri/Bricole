const express = require('express');
const getUser = require('../../controllers/user/getUserController');
const userRouter = express.Router();

userRouter.get('/:userId', getUser);

module.exports = userRouter;
