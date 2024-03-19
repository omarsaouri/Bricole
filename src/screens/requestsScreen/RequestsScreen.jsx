import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {s} from 'react-native-wind';
import getUserRequests from '../../api/modules/request/getUserRequest';
import Navbar from '../../components/navigation/Navbar';
import Topbar from '../../components/navigation/Topbar';
import UserRequest from '../../components/request/UserRequest';
import getData from '../../helpers/asyncStorage/getData';
import useAuth from '../../hooks/useAuth';

const RequestsScreen = () => {
  useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRequestEdited, setIsRequestEdited] = useState(false);

  const getRequests = async () => {
    try {
      const user_id = await getData('userId');
      const {data} = await getUserRequests(user_id);
      await setRequests(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
    setIsRequestEdited(false);
  }, [isRequestEdited]);

  return (
    <View style={[s`flex-1 w-full h-full bg-background`]}>
      <Topbar />
      <Navbar selectedRequests={true} />
      <View style={s`flex px-3 py-1 mb-4`}>
        <Text style={s`text-copy font-bold text-3xl mb-2`}>Requests</Text>
        <Text style={s`text-copy-light font-semibold `}>
          Check and track all the requests you asked the community
        </Text>
      </View>

      <ScrollView style={s`mb-20`}>
        <View style={[s`flex items-center`, {gap: 10}]}>
          {loading ? (
            <ActivityIndicator size="large" color="#904ce9" />
          ) : requests.length !== 0 ? (
            requests.map(request => (
              <UserRequest
                setIsRequestEdited={setIsRequestEdited}
                request={request}
                key={request.id}
              />
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

export default RequestsScreen;
