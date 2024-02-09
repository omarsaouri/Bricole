const {
  validateCity,
  validateDueDate,
  validateDifficulty,
  validateAddress,
  validatePrice,
  validateDescription,
} = require('../../validations/request/requestValidations');

const updateRequestMiddleware = async (req, res, next) => {
  const {key, value} = req.body;
  if (key === 'description') {
    const {state, msg} = validateDescription(value);
    if (state) return next();
    res.status(400).send(msg);
  }

  if (key === 'price') {
    const {state, msg} = validatePrice(value);
    if (state) return next();
    res.status(400).send(msg);
  }

  if (key === 'city') {
    const {state, msg} = await validateCity(value);
    if (state) return next();
    res.status(400).send(msg);
  }

  if (key === 'address') {
    const {state, msg} = validateAddress(value);
    if (state) return next();
    res.status(400).send(msg);
  }

  if (key === 'dueDate') {
    const {state, msg} = validateDueDate(value);
    if (state) return next();
    res.status(400).send(msg);
  }

  if (key === 'difficulty') {
    const {state, msg} = validateDifficulty(value);
    if (state) return next();
    res.status(400).send(msg);
  }
};

module.exports = updateRequestMiddleware;
