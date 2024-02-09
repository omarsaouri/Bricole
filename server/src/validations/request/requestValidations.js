const fetch = require('node-fetch');
const fetchCitiesApi = require('./citiesApi');

const validateDescription = desc => {
  if (!desc) return {state: false, msg: 'Description is required'};
  if (desc.length > 100) return {state: false, msg: 'Description is too long'};
  return {state: true, msg: ''};
};

const validatePrice = price => {
  if (!price) return {state: false, msg: 'Price is required'};
  if (typeof price != 'number')
    return {state: false, msg: 'Price must be a number'};
  if (price.toString().length() > 5)
    return {state: false, msg: 'Too expensive'};
  return {state: true, msg: ''};
};

const validateCity = async inputedCity => {
  if (!inputedCity) return {state: false, msg: 'City is required'};
  const data = await fetchCitiesApi();

  const cities = data.results.map(city => city.asciiname);
  const foundCity = cities.includes(inputedCity);

  if (!foundCity) return {state: false, msg: 'Not a valid city'};
  return {state: true, msg: ''};
};

// to complete
const validateAddress = Address => {
  if (!address) return {state: false, msg: 'Address is required'};
  return {state: true, msg: ''};
};
const validateDueDate = dueDate => {
  if (!dueDate) return {state: false, msg: 'Due Date is required'};
  if (!(dueDate instanceof Date))
    return {state: false, msg: 'Date must be a date object'};
  return {state: true, msg: ''};
};

const validateDifficulty = difficulty => {
  if (!difficulty) return {state: false, msg: 'Difficulty is required'};
  if (
    difficulty.toLowerCase() != 'easy' &&
    difficulty.toLowerCase() != 'normal' &&
    difficulty.toLowerCase() != 'hard'
  )
    return {state: false, msg: 'Wrong difficulty value'};
  return {state: true, msg: ''};
};

module.exports = {
  validateAddress,
  validateCity,
  validateDescription,
  validateDifficulty,
  validateDueDate,
  validatePrice,
};
