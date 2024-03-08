import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

export default clearAsyncStorage;
