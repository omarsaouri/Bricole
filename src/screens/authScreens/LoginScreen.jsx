import {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {s} from 'react-native-wind';
import {useNavigate} from 'react-router-native';
import loginUser from '../../api/modules/auth/loginUser';
import BackButton from '../../components/atoms/BackButton';
import Button from '../../components/atoms/Button';
import storeData from '../../helpers/asyncStorage/storeData';
import Toast from 'react-native-toast-message';
import getData from '../../helpers/asyncStorage/getData';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const {data} = await loginUser(phoneNumber, password);
      storeData('access_token', data.access_token);
      storeData('phoneNumber', data.user.phoneNumber);
      Toast.show({
        type: 'success',
        text1: 'Welcome Back ' + data.user.firstName,
      });
      navigate('/');
    } catch (error) {
      console.log(error.response.data);
      Toast.show({
        type: 'error',
        text1: error.response.data,
      });
    }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <View
      style={[
        s`flex flex-1 w-full h-full justify-between px-5  bg-background`,
        {gap: 40},
      ]}>
      <BackButton path={'/'} style={'absolute top-5 left-5 p-1'} />

      <View style={s`w-72 mt-10`}>
        <Text style={s`text-primary text-6xl font-bold`}>Welcome back</Text>
      </View>

      <View style={[s`flex`, {gap: 20}]}>
        <TextInput
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          placeholder="Phone number"
          style={s`bg-foreground text-copy border-border border-2 p-3 pb-5 rounded-lg text-lg`}
          placeholderTextColor={'#a28dbe'}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          placeholder="Password"
          style={s`bg-foreground text-copy border-border border-2 p-3 pb-5 rounded-lg text-lg`}
          placeholderTextColor={'#a28dbe'}
        />
      </View>

      <View style={[s`flex self`, {gap: 20}]}>
        <Button
          title="Login"
          onPress={handleSubmit}
          style={'bg-primary-dark p-3 rounded-lg'}
          textStyle={'text-xl text-copy text-center font-bold'}
        />
        <View style={[s`flex-row self-center`, {gap: 10}]}>
          <Text style={s`text-copy font-semibold`}>
            You don't have an account ?
          </Text>
          <Button
            title="Sign up"
            onPress={handleSignUp}
            textStyle={'underline text-primary-light text-center font-bold'}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
