import AsyncStorage from '@react-native-async-storage/async-storage';

const storeAccessToken = async token => {
  try {
    await AsyncStorage.setItem('access_token', token);
  } catch (err) {
    throw err;
  }
};

export default storeAccessToken;
