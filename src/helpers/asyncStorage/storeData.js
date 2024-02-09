import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (dataName, data) => {
  try {
    await AsyncStorage.setItem(dataName, data);
  } catch (err) {
    throw err;
  }
};

export default storeData;
