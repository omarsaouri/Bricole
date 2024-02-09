import {View, Text} from 'react-native';
import React from 'react';
import Navbar from '../../components/navigation/Navbar';
import {s} from 'react-native-wind';

const RequestsScreen = () => {
  return (
    <View style={s`h-full`}>
      <Navbar />
      <Text>requestsScreen</Text>
    </View>
  );
};

export default RequestsScreen;
