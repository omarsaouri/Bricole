import {useState} from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {s} from 'react-native-wind';
import {useNavigate} from 'react-router-native';
import registerUser from '../../api/modules/auth/registerUser';
import BackButton from '../../components/atoms/BackButton';
import Button from '../../components/atoms/Button';
import ValidationInput from '../../components/atoms/ValidationInput';
import storeData from '../../helpers/asyncStorage/storeData';
import clearAsyncStorage from '../../helpers/asyncStorage/clearAsyncStorage';
import getData from '../../helpers/asyncStorage/getData';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isFormValid) {
        const {data} = await registerUser(
          firstName,
          lastName,
          phoneNumber,
          password,
        );
        storeData('access_token', data.access_token);
        storeData('phoneNumber', data.user.phoneNumber);
        storeData('userId', data.user.id.toString());

        Toast.show({
          type: 'success',
          text1: 'Welcome',
        });
        console.log(data);
        navigate('/registermore');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Form contains invalid input(s).',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error.response.data,
      });
    }
  };

  const handleLogin = async () => {
    navigate('/login');
  };

  return (
    <View
      style={[
        s`flex flex-1 w-full h-full justify-between px-5  bg-background`,
        {gap: 30},
      ]}>
      <BackButton path={'/'} style={'absolute top-5 left-5 p-1'} />
      <View style={s`w-72 mt-10`}>
        <Text style={s`text-primary text-6xl font-bold`}>Welcome</Text>
      </View>
      <View>
        <ValidationInput
          placeholder="First Name"
          regex={/^[a-zA-Z]{3,20}$/}
          validationMsg="First name required, 4+ letters."
          keyboardType="default"
          text={firstName}
          setText={setFirstName}
          setIsFormValid={setIsFormValid}
        />
        <ValidationInput
          placeholder="Last Name"
          regex={/^[a-zA-Z]{3,20}$/}
          validationMsg="Last name required, 4+ letters."
          keyboardType="default"
          text={lastName}
          setText={setLastName}
          setIsFormValid={setIsFormValid}
        />
        <ValidationInput
          placeholder="Phone Number"
          regex={/^(06|07)\d{8}$/}
          validationMsg="Moroccan mobile starting with 06 or 07, followed by 8 digits."
          keyboardType="phone-pad"
          text={phoneNumber}
          setText={setPhoneNumber}
          setIsFormValid={setIsFormValid}
        />
        <ValidationInput
          placeholder="Password"
          regex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/}
          validationMsg="8+ characters with letters, digits, and special characters."
          keyboardType="default"
          secureTextEntry={true}
          text={password}
          setText={setPassword}
          setIsFormValid={setIsFormValid}
        />
      </View>

      <View style={[s`flex`, {gap: 20}]}>
        <Button
          title="Sign up"
          onPress={handleSubmit}
          style={'bg-primary-dark p-3 rounded-lg'}
          textStyle={'text-xl text-copy text-center font-bold'}
        />
        <View style={[s`flex-row self-center`, {gap: 10}]}>
          <Text style={s`text-copy font-semibold`}>
            You already have an account ?
          </Text>
          <Button
            title="Login"
            textStyle={'underline text-primary-light text-center font-bold'}
            onPress={handleLogin}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
