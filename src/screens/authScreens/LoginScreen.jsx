import {useState} from 'react';
import {TextInput, View} from 'react-native';
import {s} from 'react-native-wind';
import loginUser from '../../api/modules/auth/loginUser';
import BackButton from '../../components/atoms/BackButton';
import Button from '../../components/atoms/Button';
import storeAccessToken from '../../helpers/storeAccessToken';
import {useNavigate} from 'react-router-native';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [access_token, setAccess_token] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const {data} = await loginUser(phoneNumber, password);
      setAccess_token(data.access_token);
      storeAccessToken(access_token);
      navigate('/test');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={[s`flex flex-1 w-full h-full justify-center p-10`, {gap: 10}]}>
      <BackButton path={'/'} />
      {/* <ValidationInput
        placeholder="Phone Number"
        text={phoneNumber}
        setText={setPhoneNumber}
      />
      <ValidationInput
        placeholder="Password"
        text={password}
        setText={setPassword}
      /> */}
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
