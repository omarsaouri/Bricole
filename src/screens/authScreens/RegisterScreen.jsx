import {TextInput, View} from 'react-native';
import {s} from 'react-native-wind';
import BackButton from '../../components/atoms/BackButton';
import Button from '../../components/atoms/Button';
import {useEffect, useState} from 'react';
import registerUser from '../../api/modules/auth/registerUser';
import ValidationInput from '../../components/atoms/ValidationInput';

const RegisterScreen = () => {
  const [areFieldsValid, setAreFieldsValid] = useState([
    false,
    false,
    false,
    false,
  ]);
  const allFieldsValid = areFieldsValid.every(state => state);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const {data} = await registerUser(
        firstName,
        lastName,
        phoneNumber,
        password,
      );
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={[s`flex flex-1 w-full h-full justify-center p-10`, {gap: 10}]}>
      <BackButton path={'/'} />
      <ValidationInput
        placeholder="First Name"
        regex={/^[a-zA-Z]{3,20}$/}
        validationMsg="wrong"
        keyboardType="default"
        setAreFieldsValid={setAreFieldsValid}
        index={0}
        text={firstName}
        setText={setFirstName}
      />
      <ValidationInput
        placeholder="Last Name"
        regex={/^[a-zA-Z]{3,20}$/}
        validationMsg="wrong"
        keyboardType="default"
        setAreFieldsValid={setAreFieldsValid}
        index={1}
        text={lastName}
        setText={setLastName}
      />
      <ValidationInput
        placeholder="Phone Number"
        regex={/^(06|07)\d{8}$/}
        validationMsg="wrong"
        keyboardType="phone-pad"
        setAreFieldsValid={setAreFieldsValid}
        index={2}
        text={phoneNumber}
        setText={setPhoneNumber}
      />
      <ValidationInput
        placeholder="Password"
        regex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/}
        validationMsg="wrong"
        keyboardType="default"
        secureTextEntry={true}
        setAreFieldsValid={setAreFieldsValid}
        index={3}
        text={password}
        setText={setPassword}
      />
      <Button
        title="submit"
        disabledStyle={'bg-red-300'}
        disabled={!areFieldsValid}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default RegisterScreen;
