import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {s} from 'react-native-wind';
import {useNavigate} from 'react-router-native';
import Button from '../../components/atoms/Button';
import Logo from '../../components/brand/Logo';

const LandingScreen = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <View
      style={[
        s` flex-1 w-full h-full bg-background justify-around items-center`,
        {gap: 30},
      ]}>
      <View style={s`flex items-center bg-background`}>
        <Logo size={48} marginBottom={30} />
        <Text style={[s`text-copy text-4xl font-extrabold text-primary`]}>
          Bricole
        </Text>
      </View>

      <View style={[s`flex  self-center p-5 rounded-lg`, {gap: 40}]}>
        <Text style={s`text-xl text-copy-light font-semibold  text-center`}>
          <Text style={s`text-primary font-bold`}>Join</Text> us,
          <Text style={s`text-primary font-bold`}> Help</Text> our community
          with their daily tasks, and
          <Text style={s`text-primary font-bold`}> Get paid</Text> for your
          services.
        </Text>
      </View>

      <View style={[s`flex flex-row items-center`, {gap: 20}]}>
        <Button
          title={'Login'}
          style={'bg-primary-dark p-3 w-32 rounded-lg'}
          textStyle={'text-xl text-copy text-center font-bold'}
          onPress={handleLoginClick}
        />
        <Button
          title={'Register'}
          style={'bg-primary-dark p-3 w-32 rounded-lg'}
          textStyle={'text-xl text-copy text-center font-bold'}
          onPress={handleRegisterClick}
        />
      </View>
    </View>
  );
};

export default LandingScreen;
