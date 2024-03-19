import useAxiosClient from '../../config/userAxios';

const getRequests = async (difficulty, city) => {
  const client = await useAxiosClient();
  return client.get('/requests', {
    params: {
      difficulty: difficulty,
      city: city,
    },
  });
};

export default getRequests;
