import customAxios from '../../config/customAxios';

const finishRegisterUser = async (id, difficulty, city) => {
  return customAxios.put('/auth/register/finish', {
    userId: id,
    idealDifficulty: difficulty,
    city: city,
  });
};

export default finishRegisterUser;
