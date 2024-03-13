import useAxiosClient from '../../config/userAxios';

const postRequest = async (
  userId,
  description,
  price,
  city,
  dueDate,
  difficulty,
  privatePhoneNumber,
) => {
  const userAxios = await useAxiosClient();
  return userAxios.post('/requests/new', {
    userId,
    description,
    price,
    city,
    dueDate,
    difficulty,
    privatePhoneNumber,
  });
};

export default postRequest;
