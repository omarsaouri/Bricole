import {useState} from 'react';
import {TextInput, View} from 'react-native';
import {s} from 'react-native-wind';
import {useNavigate} from 'react-router-native';
import loginUser from '../../api/modules/auth/loginUser';
import BackButton from '../../components/atoms/BackButton';
import Button from '../../components/atoms/Button';
import storeData from '../../helpers/asyncStorage/storeData';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const {data} = await loginUser(phoneNumber, password);
      storeData('access_token', data.access_token);
      storeData('phoneNumber', data.phoneNumber);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <View style={[s`flex flex-1 w-full h-full justify-center p-10`, {gap: 10}]}>
      <BackButton path={'/'} />
      <TextInput
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        placeholder="phone number"
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="password"
      />
      <Button title="submit" onPress={handleSubmit} />
    </View>
  );
};

export default LoginScreen;
