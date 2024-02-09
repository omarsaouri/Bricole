import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {s} from 'react-native-wind';
import getRequests from '../../api/modules/request/getRequests';
import Navbar from '../../components/navigation/Navbar';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/atoms/Button';
import NewRequestModal from '../../components/modals/newRequestModal';

const FeedScreen = () => {
  useAuth();

  const fetchRequests = async () => {
    try {
      const {data} = await getRequests('easy', 'Tahla');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <View style={s`h-full`}>
      <Navbar />
      <Text>feed</Text>
      <Button title="new request" />
      <NewRequestModal isModalVisible={false} />
    </View>
  );
};

export default FeedScreen;
