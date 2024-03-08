import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Navbar from '../../components/navigation/Navbar';
import {s} from 'react-native-wind';
import Topbar from '../../components/navigation/Topbar';

const RequestsScreen = () => {
  return (
    <View
      style={[
        s` flex-1 w-full h-full bg-background justify-around items-center`,
      ]}>
      <Topbar />
      <Navbar selectedRequests={true} />
      <Text>requestsScreen</Text>
    </View>
  );
};

export default RequestsScreen;
