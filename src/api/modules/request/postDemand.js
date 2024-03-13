import useAxiosClient from '../../config/userAxios';

const postDemand = async (requestId, userId, granted, state) => {
  const userAxios = await useAxiosClient();
  return userAxios.post('/demands/new', {
    requestId,
    userId,
    granted,
    state,
  });
};

export default postDemand;
