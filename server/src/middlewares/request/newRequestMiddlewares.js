const {
  validateAddress,
  validateCity,
  validateDescription,
  validateDifficulty,
  validateDueDate,
  validatePrice,
} = require('../../validations/request/requestValidations');

const descriptionMiddleware = (req, res, next) => {
  const description = req.body.description;
  const {state, msg} = validateDescription(description);
  if (state) return next();
  res.status(400).send(msg);
};

const priceMiddleware = (req, res, next) => {
  const price = req.body.price;
  const {state, msg} = validatePrice(price);
  if (state) return next();
  res.status(400).send(msg);
};

const cityMiddleware = async (req, res, next) => {
  const city = req.body.city;
  const {state, msg} = await validateCity(city);
  if (state) return next();
  res.status(400).send(msg);
};

const addressMiddleware = (req, res, next) => {
  const address = req.body.address;
  const {state, msg} = validateAddress(address);
  if (state) return next();
  res.status(400).send(msg);
};
const dueDateMiddleware = (req, res, next) => {
  const dueDate = req.body.dueDate;
  const {state, msg} = validateDueDate(dueDate);
  if (state) return next();
  res.status(400).send(msg);
};

const difficultyMiddleware = (req, res, next) => {
  const difficulty = req.body.difficulty;
  const {state, msg} = validateDifficulty(difficulty);
  if (state) return next();
  res.status(400).send(msg);
};

module.exports = {
  descriptionMiddleware,
  priceMiddleware,
  cityMiddleware,
  addressMiddleware,
  dueDateMiddleware,
  difficultyMiddleware,
};
