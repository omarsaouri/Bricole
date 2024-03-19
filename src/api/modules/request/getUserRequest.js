import useAxiosClient from '../../config/userAxios';

const getUserRequests = async user_id => {
  const client = await useAxiosClient();
  return client.get('/requests/user', {params: {user_id}});
};

export default getUserRequests;
