import React from 'react';
import {Text, View} from 'react-native';
import {s} from 'react-native-wind';
import {useNavigate} from 'react-router-native';
import Button from '../../components/atoms/Button';

const LandingScreen = () => {
  const navigate = useNavigate();
  return (
    <View style={s` flex-1 w-full h-full justify-around items-center`}>
      <Text>Logo Placeholder</Text>
      <Text>describe the purpose of the app</Text>
      <Text>Illu</Text>
      <View style={[s`flex flex-row`, {gap: 10}]}>
        <Button
          onPress={() => {
            navigate('/register');
          }}
          title={'register'}
          style={'bg-primary p-1'}
          textStyle={'text-xl text-copy'}
        />
        <Button
          onPress={() => {
            navigate('/login');
          }}
          title={'login'}
          style={'bg-primary p-1'}
          textStyle={'text-xl text-copy'}
        />
      </View>
    </View>
  );
};

export default LandingScreen;
