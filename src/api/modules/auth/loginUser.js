import customAxios from '../../config/customAxios';

const loginUser = async (phoneNumber, password) => {
  return customAxios.post('/auth/login', {
    phoneNumber: phoneNumber,
    password: password,
  });
};

export default loginUser;
