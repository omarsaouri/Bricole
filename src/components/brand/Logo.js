import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {s} from 'react-native-wind';

const Logo = ({size, marginBottom}) => {
  return (
    <Image
      style={[s`h-${size} w-${size}`, {marginBottom: -marginBottom}]}
      source={require('../../../public/assets/Logologof.png')}></Image>
  );
};

export default Logo;
