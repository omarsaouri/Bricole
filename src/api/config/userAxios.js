import {API_URL} from '@env';
import axios from 'axios';
import getData from '../../helpers/asyncStorage/getData';

const useAxiosClient = async () => {
  const token = await getData('access_token');

  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

export default useAxiosClient;
