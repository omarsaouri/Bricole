import useAxiosClient from '../../config/userAxios';

const getRequests = async (idealDifficulty, city) => {
  const client = await useAxiosClient();
  return client.get('/requests', {
    params: {
      idealDifficulty: idealDifficulty,
      city: city,
    },
  });
};

export default getRequests;
