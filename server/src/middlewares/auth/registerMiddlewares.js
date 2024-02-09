const {
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  validatePassword,
} = require('../../validations/auth/registerValidations');
const {
  validateDifficulty,
} = require('../../validations/request/requestValidations');

const firstNameMiddleware = (req, res, next) => {
  const firstName = req.body.firstName;
  const {state, msg} = validateFirstName(firstName);

  if (state) return next();
  res.status(400).send(msg);
};

const lastNameMiddleware = (req, res, next) => {
  const lastName = req.body.lastName;
  const {state, msg} = validateLastName(lastName);

  if (state) return next();
  res.status(400).send(msg);
};

const phoneNumberMiddleware = async (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;
  const {state, msg} = await validatePhoneNumber(phoneNumber);

  if (state) return next();
  res.status(400).send(msg);
};

const passwordMiddleware = (req, res, next) => {
  const password = req.body.password;
  const {state, msg} = validatePassword(password);

  if (state) return next();
  res.status(400).send(msg);
};

const idealDifficultydMiddleware = (req, res, next) => {
  const idealDifficulty = req.body.idealDifficulty;
  const {state, msg} = validateDifficulty(idealDifficulty);

  if (state) return next();
  res.status(400).send(msg);
};

module.exports = {
  firstNameMiddleware,
  lastNameMiddleware,
  phoneNumberMiddleware,
  passwordMiddleware,
  idealDifficultydMiddleware,
};
