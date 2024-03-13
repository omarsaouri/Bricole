import {useEffect} from 'react';
import {useNavigate} from 'react-router-native';
import getData from '../helpers/asyncStorage/getData';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getData('access_token');
        if (!token) {
          navigate('/landing');
        }
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
      }
    };

    checkAuth();
  }, [navigate]);
};

export default useAuth;
