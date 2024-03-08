import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {s} from 'react-native-wind';
import getRequests from '../../api/modules/request/getRequests';
import Navbar from '../../components/navigation/Navbar';
import Topbar from '../../components/navigation/Topbar';
import useAuth from '../../hooks/useAuth';
import useHistoryStack from '../../hooks/useHistoryStack';
import Button from '../../components/atoms/Button';
import Request from '../../components/request/Request';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {useNavigate} from 'react-router-native';

const FeedScreen = () => {
  useAuth();
  const stack = useHistoryStack();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const {data} = await getRequests('easy', 'Tahla');
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePlusBtn = () => {
    navigate('/newRequest');
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <View style={[s`flex-1 w-full h-full bg-background `]}>
      <Navbar selectedFeed={true} />
      <Topbar stackLength={stack.length} />
      <Button
        title={<FontAwesomeIcon icon={faPlus} color={'white'} size={20} />}
        style="bg-primary absolute bottom-24 right-5 flex rounded-full  h-14 w-14 pt-1 flex justify-center items-center z-20"
        textStyle={'text-center'}
        onPress={handlePlusBtn}
      />

      <ScrollView style={s`mb-20`}>
        <View style={[s`flex items-center px-2`, {gap: 10}]}>
          {loading ? (
            <ActivityIndicator size="large" color="#904ce9" />
          ) : requests.length !== 0 ? (
            requests.map(request => (
              <Request request={request} key={request.id} />
            ))
          ) : (
            <Text style={s`text-white text-bold text-2xl`}>
              No requests found
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FeedScreen;
