import React, {useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {s} from 'react-native-wind';
import getUser from '../../api/modules/user/getUser';
import Button from '../atoms/Button';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle as solidCircle} from '@fortawesome/free-solid-svg-icons/faCircle';
import {faCircle as regularCircle} from '@fortawesome/free-regular-svg-icons/faCircle';
import postDemand from '../../api/modules/request/postDemand';
import getData from '../../helpers/asyncStorage/getData';
import Toast from 'react-native-toast-message';
import {
  faClipboard,
  faClipboardList,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import Clipboard from '@react-native-clipboard/clipboard';

const Request = ({request}) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [difficulty, setDifficulty] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const initials = firstName?.charAt(0) + lastName?.charAt(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const copyToClipboard = () => {
    Clipboard.setString(phoneNumber);
    Toast.show({
      type: 'success',
      text1: 'Phone number copied to clipboard',
    });
  };

  const handleInterested = async () => {
    const id = await getData('userId');
    try {
      const {data} = await postDemand(
        parseInt(request.id),
        parseInt(id),
        false,
        'pending',
      );
      if (data.phoneNumber) {
        setPhoneNumber(data.phoneNumber);
        Toast.show({
          type: 'success',
          text1: 'Your demand is sent',
        });
        toggleModal();
      } else {
        Toast.show({
          type: 'success',
          text1: 'Your demand is sent',
        });
      }
    } catch (error) {
      console.log(error.response.data.error);
      Toast.show({
        type: 'error',
        text1: error.response.data.error,
      });
    }
  };

  useEffect(() => {
    setDifficulty(request.difficulty);
    fetchUser();
    console.log(request);
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const fetchUser = async () => {
    try {
      const {data} = await getUser(request.user_id);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    } catch (error) {
      console.log(error);
    }
  };

  const createdAtDate = new Date(request.created_at);
  const dueDateDate = new Date(request.dueDate);
  const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
  const formattedDueDate = dueDateDate.toLocaleDateString('en-GB', options);
  const timeDifference = new Date() - createdAtDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
  );
  let timeAgoString = '';

  if (daysDifference > 0) {
    timeAgoString = daysDifference + 'd ago';
  } else if (hoursDifference > 0) {
    timeAgoString = hoursDifference + 'h ago';
  } else {
    timeAgoString = minutesDifference + 'm ago';
  }

  return (
    <View
      style={[
        s`flex bg-foreground p-3 rounded-lg border-border border-2 w-full`,
        {gap: 7},
      ]}>
      <View style={[s`flex-row items-center justify-between`]}>
        <View style={[s`flex-row items-center`, {gap: 10}]}>
          <View
            style={s`border-copy-lighter border-2 rounded-full flex items-center justify-center p-2`}>
            <Text style={s`text-copy-lighter text-lg tracking-wide font-bold `}>
              {initials}
            </Text>
          </View>
          <View>
            <Text style={s`text-copy font-bold`}>
              {firstName + ' ' + lastName}
            </Text>
            <Text style={s`text-copy-light font-semibold`}>
              {timeAgoString}
            </Text>
          </View>
        </View>
        <View style={[s`flex-row`, {gap: 4}]}>
          <FontAwesomeIcon
            icon={solidCircle}
            color={
              difficulty === 'easy'
                ? '#4ce94c'
                : difficulty === 'normal'
                ? '#e9e94c'
                : '#e94c4c'
            }
            size={15}
          />
          <FontAwesomeIcon
            icon={
              difficulty === 'normal' || difficulty === 'hard'
                ? solidCircle
                : regularCircle
            }
            color={
              difficulty === 'easy'
                ? '#4ce94c'
                : difficulty === 'normal'
                ? '#e9e94c'
                : '#e94c4c'
            }
            size={15}
          />
          <FontAwesomeIcon
            icon={difficulty === 'hard' ? solidCircle : regularCircle}
            color={
              difficulty === 'easy'
                ? '#4ce94c'
                : difficulty === 'normal'
                ? '#e9e94c'
                : '#e94c4c'
            }
            size={15}
          />
        </View>
      </View>
      <View style={[s`flex`, {gap: 6}]}>
        <View>
          <Text
            numberOfLines={!expanded ? 3 : undefined}
            style={[s`text-copy`, {fontSize: 16}]}>
            {request.description}
          </Text>
          {!expanded && request.description.length > 100 && (
            <TouchableOpacity onPress={toggleExpand}>
              <Text
                style={[s`text-copy-lighter mt-2 underline `, {fontSize: 14}]}>
                Show More
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={s`text-copy mt-3`}>{request.city}, Morocco</Text>
        <Text style={s`text-copy-lighter font-bold `}>
          {'Due : ' + formattedDueDate}
        </Text>
      </View>
      <View style={s`flex-row justify-between items-center`}>
        <Text style={s`text-primary font-bold text-2xl`}>
          {request.price} DH
        </Text>
        <Button
          style={'bg-primary-dark flex justify-center rounded-md p-2'}
          textStyle={'text-primary-content text-md font-bold'}
          title="I'm interested"
          onPress={handleInterested}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={[
              {
                elevation: 5,
                gap: 10,
              },
              s`flex rouned-lg bg-background p-8 rounded-lg w-11/12 border-border border`,
            ]}>
            <Button
              iconLeft={
                <FontAwesomeIcon icon={faX} size={20} color="#e94c4c" />
              }
              onPress={toggleModal}
            />
            <View style={[s`flex-row items-center justify-center`, {gap: 10}]}>
              <Text style={s`text-center font-bold text-2xl text-copy`}>
                {phoneNumber}
              </Text>
              <Button
                iconLeft={
                  <FontAwesomeIcon icon={faClipboardList} color="#a28dbe" />
                }
                style="pt-4"
                onPress={copyToClipboard}
              />
            </View>

            <Text style={s`text-copy-light font-semibold text-justify `}>
              This user has{' '}
              <Text style={s`text-primary`}>private number disabled</Text>, so
              you have direct access to his phone number. Please
              <Text style={s`text-primary`}> contact</Text> them as soon as
              possible.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Request;
