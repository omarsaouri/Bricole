const {
  validateGranted,
  validateIds,
  validateState,
} = require('../../validations/demand/demandValidations');

const requestIdMiddleware = (req, res, next) => {
  const requestId = req.body.requestId;
  const {state, message} = validateIds(requestId);
  if (state) return next();
  res.status(400).send(message);
};

const userIdMiddleware = (req, res, next) => {
  const userId = req.body.userId;
  const {state, message} = validateIds(userId);
  if (state) return next();
  res.status(400).send(message);
};

const grantedMiddleware = (req, res, next) => {
  const granted = req.body.granted;
  const {state, message} = validateGranted(granted);
  if (state) return next();
  res.status(400).send(message);
};

const stateMiddleware = (req, res, next) => {
  const stateInput = req.body.state;
  const {state, message} = validateState(stateInput);
  if (state) return next();
  res.status(400).send(message);
};

module.exports = {
  requestIdMiddleware,
  userIdMiddleware,
  grantedMiddleware,
  stateMiddleware,
};
