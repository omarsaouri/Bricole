const supabase = require('../../models/supabase');

///^[a-zA-Z]{3,20}$/
const validateFirstName = fName => {
  if (!fName) return {state: false, msg: 'First name is required'};
  if (fName.length < 3) return {state: false, msg: 'First name too long'};
  if (fName.length > 20) return {state: false, msg: 'First name too long'};
  return {state: true, msg: ''};
};
///^[a-zA-Z]{3,20}$/
const validateLastName = lName => {
  if (!lName) return {state: false, msg: 'Last name is required'};
  if (lName.length < 3) return {state: false, msg: 'Last name too long'};
  if (lName.length > 20) return {state: false, msg: 'Last name too long'};
  return {state: true, msg: ''};
};
// /^(06|07)\d{8}$/;

const validatePhoneNumber = async phoneNumber => {
  const phoneNumberRegex = /^(06|07)/;
  if (!phoneNumber) return {state: false, msg: 'Phone number is required'};
  if (phoneNumber.length !== 10)
    return {state: false, msg: 'Phone number must be 10 characters long'};
  if (!phoneNumberRegex.test(phoneNumber))
    return {state: false, msg: 'Phone number must begin with 06 or 07'};
  const {data, error} = await supabase
    .from('users')
    .select('*')
    .eq('phoneNumber', phoneNumber)
    .single();

  const existingUser = data;

  if (existingUser) return {state: false, msg: 'Phone number is already used'};
  return {state: true, msg: ''};
};

const validatePassword = password => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password) return {state: false, msg: 'password is required'};
  if (!passwordRegex.test(password))
    return {state: false, msg: 'ideal password : Password123'};
  return {state: true, msg: ''};
};

module.exports = {
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  validatePassword,
};
