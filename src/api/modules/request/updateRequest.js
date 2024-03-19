import useAxiosClient from '../../config/userAxios';

const updateState = async (id, newState) => {
  const userAxios = await useAxiosClient();
  return userAxios.put(`/requests/${id}`, {key: 'state', value: newState});
};

export default updateState;
