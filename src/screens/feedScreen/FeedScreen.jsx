import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {s} from 'react-native-wind';
import {Dropdown} from 'react-native-element-dropdown';
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
import {
  faFilter,
  faFilterCircleDollar,
  faRefresh,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import useCities from '../../hooks/useCities';

const FeedScreen = () => {
  useAuth();
  const stack = useHistoryStack();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [difficulty, setDifficulty] = useState();
  const [difficultyValue, setDifficultyValue] = useState();
  const [city, setCity] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusLevels, setIsFocusLevels] = useState(false);
  const navigate = useNavigate();

  const cities = useCities();
  const levels = [
    {label: 'easy', value: '1'},
    {label: 'normal', value: '2'},
    {label: 'hard', value: '3'},
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchRequests = async () => {
    try {
      const {data} = await getRequests(difficulty, city);
      setRequests(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePlusBtn = () => {
    navigate('/newRequest');
  };

  const handleFilter = () => {
    fetchRequests();
    toggleModal();
  };

  const handleReset = (setItem, setItemValue) => {
    setItem('');
    setItemValue('');
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
        style="bg-primary absolute bottom-20 right-3 flex rounded-full  h-14 w-14 pt-1 flex justify-center items-center z-20"
        textStyle={'text-center'}
        onPress={handlePlusBtn}
      />

      <ScrollView style={s`mb-20`}>
        <View style={s`px-3 py-2 mb-1`}>
          <Button
            iconLeft={
              <FontAwesomeIcon icon={faFilter} size={17} color="#ffffff" />
            }
            title={'Filter'}
            textStyle={'ml-1 font-bold text-white text-md'}
            style={'flex-row bg-primary p-2 w-20 rounded-lg'}
            onPress={toggleModal}
          />
        </View>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View
          style={{
            flex: 1,
            marginTop: 85,
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={[
              {
                elevation: 5,
                gap: 10,
              },
              s`flex  bg-background px-8 pb-10 w-full`,
            ]}>
            <View style={s`flex-row w-full justify-between items-center`}>
              <Text style={s`text-primary font-bold text-lg`}>
                Filter Requests
              </Text>
              <Button
                iconLeft={
                  <FontAwesomeIcon icon={faX} size={20} color="#e94c4c" />
                }
                onPress={toggleModal}
                style={'pt-4'}
              />
            </View>
            <View style={s`flex-row items-center`}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: '#904ce9'}]}
                containerStyle={s`bg-background rounded-lg border border-border `}
                activeColor="#904ce9"
                placeholderStyle={s`text-copy-light`}
                selectedTextStyle={s`text-copy-light font-semibold`}
                itemTextStyle={s`text-copy`}
                inputSearchStyle={s`rounded-md border-primary text-copy-lighter`}
                iconColor="#3d2e51"
                data={levels}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusLevels ? 'Select Difficulty' : '...'}
                value={difficultyValue}
                onFocus={() => setIsFocusLevels(true)}
                onBlur={() => setIsFocusLevels(false)}
                onChange={item => {
                  setDifficultyValue(item.value);
                  setDifficulty(item.label.toLowerCase());
                  setIsFocusLevels(false);
                }}
              />
              <Button
                title={'Reset'}
                onPress={() => {
                  handleReset(setDifficulty, setDifficultyValue);
                }}
                iconLeft={<FontAwesomeIcon icon={faRefresh} color={'white'} />}
                style={'items-center ml-2 bg-primary-dark rounded-md px-1 pt-1'}
                textStyle={'text-copy font-bold'}
              />
            </View>
            <View style={s`flex-row items-center`}>
              <Dropdown
                mode="modal"
                style={[styles.dropdown2, isFocus && {borderColor: '#904ce9'}]}
                containerStyle={s`bg-background rounded-lg border border-border`}
                activeColor="#904ce9"
                placeholderStyle={s`text-copy-light`}
                selectedTextStyle={s`text-copy-light font-semibold`}
                itemTextStyle={s`text-copy`}
                inputSearchStyle={s`rounded-md border-primary text-copy-lighter`}
                iconColor="#3d2e51"
                data={cities}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select City' : '...'}
                searchPlaceholder="Search..."
                value={cityValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setCityValue(item.value);
                  setCity(item.label);
                  setIsFocus(false);
                }}
              />
              <Button
                title={'Reset'}
                onPress={() => {
                  handleReset(setCity, setCityValue);
                }}
                iconLeft={<FontAwesomeIcon icon={faRefresh} color={'white'} />}
                style={'items-center ml-2 bg-primary-dark rounded-md px-1 pt-1'}
                textStyle={'text-copy font-bold'}
              />
            </View>
            <Button
              title="Filter"
              onPress={handleFilter}
              textStyle={' font-bold text-white text-md'}
              style={'flex-row mt-2 bg-primary-dark p-2 self-start rounded-lg'}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    gap: 15,
  },
  dropdown: {
    height: 42,
    width: 280,
    backgroundColor: '#251c31',
    borderColor: '#3d2e51',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdown2: {
    height: 42,
    width: 280,
    backgroundColor: '#251c31',
    borderColor: '#3d2e51',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
