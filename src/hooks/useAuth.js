import {useEffect} from 'react';
import {useNavigate} from 'react-router-native';
import getData from '../helpers/asyncStorage/getData';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getData('access_token');
    if (!token) {
      navigate('/landing');
    }
  }, []);
};

export default useAuth;
