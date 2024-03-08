import useAxiosClient from '../../config/userAxios';

const getUser = async userId => {
  try {
    const client = await useAxiosClient();
    return client.get(`/user/${userId}`);
  } catch (error) {
    console.error('Error fetching user', error);
    throw error;
  }
};

export default getUser;
