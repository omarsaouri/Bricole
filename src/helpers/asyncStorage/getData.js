import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async dataName => {
  try {
    const token = await AsyncStorage.getItem(dataName);
    return token || null;
  } catch (err) {
    throw err;
  }
};

export default getData;
