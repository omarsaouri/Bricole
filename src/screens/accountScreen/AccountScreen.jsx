import {View, Text} from 'react-native';
import React from 'react';
import Navbar from '../../components/navigation/Navbar';
import {s} from 'react-native-wind';

const AccountScreen = () => {
  return (
    <View style={s`h-full`}>
      <Navbar selectedDemands={true} />
      <Text>accountScreen</Text>
    </View>
  );
};

export default AccountScreen;
