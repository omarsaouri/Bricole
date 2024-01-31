import customAxios from '../../config/customAxios';

const registerUser = async (fName, lName, phoneNumber, password) => {
  return customAxios.post('/auth/register', {
    firstName: fName,
    lastName: lName,
    phoneNumber: phoneNumber,
    password: password,
  });
};

export default registerUser;
