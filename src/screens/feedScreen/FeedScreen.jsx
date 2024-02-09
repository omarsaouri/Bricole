import React from 'react';
import {Text, View} from 'react-native';
import {s} from 'react-native-wind';
import Navbar from '../../components/navigation/Navbar';
import useAuth from '../../hooks/useAuth';

const FeedScreen = () => {
  useAuth();

  return (
    <View style={s`h-full`}>
      <Navbar />
      <Text>feed</Text>
    </View>
  );
};

export default FeedScreen;
