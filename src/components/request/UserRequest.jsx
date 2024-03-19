import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import {s} from 'react-native-wind';
import updateState from '../../api/modules/request/updateRequest';
import Button from '../atoms/Button';

const UserRequest = ({request, setIsRequestEdited}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [state, setState] = useState(request.state);
  const [stateValue, setStateValue] = useState('');

  const formattedDate = request?.dueDate
    ? new Date(request?.dueDate).toLocaleDateString('en-GB')
    : '';

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleUpdateState = async () => {
    try {
      const response = await updateState(request.id, state);
      console.log(response);
      toggleModal();
      Toast.show({
        type: 'success',
        text1: 'Success. ',
      });
      setIsRequestEdited(true);
    } catch (error) {
      console.log(error);
    }
  };

  const states = [
    {label: 'idle', value: '1'},
    {label: 'pending', value: '2'},
    {label: 'failed', value: '3'},
    {label: 'finished', value: '4'},
  ];

  return (
    <View
      style={[
        s`flex bg-foreground p-2 border-border border-t-2 border-b-2 w-full`,
        {gap: 7},
      ]}>
      <View style={s`flex-row w-full justify-between items-center`}>
        <Text style={s`text-copy text-lg w-52 font-semibold`}>
          {request?.description}
        </Text>

        <View style={[s`flex-row items-center `, {gap: 5}]}>
          <Text
            style={
              request?.state === 'idle'
                ? s`text-copy-lighter text-lg font-bold`
                : request?.state === 'pending'
                ? s`text-primary-light text-lg font-bold`
                : request?.state === 'failed'
                ? s`text-error text-lg font-bold`
                : s`text-success text-lg font-bold`
            }>
            {request?.state &&
              request.state.charAt(0).toUpperCase() + request.state.slice(1)}
          </Text>
          <Button
            iconLeft={
              <FontAwesomeIcon icon={faPen} color={'white'} size={10} />
            }
            style={
              'flex justify-center items-center bg-copy-lighter h-6 w-6 pt-3 rounded-lg'
            }
            textStyle={'text-primary-content text-md font-bold'}
            onPress={toggleModal}
          />
        </View>
      </View>
      <View style={[s`flex`, {gap: 2}]}>
        <Text style={s`text-copy-light font-semibold`}>
          {request?.city}, Morocco
        </Text>
        <Text style={s`text-copy-lighter font-bold`}>{formattedDate}</Text>
      </View>
      <View style={s`flex-row justify-between items-center`}>
        <Text style={s`text-primary text-xl font-bold`}>
          {request?.price} DH
        </Text>
        <View style={[s`flex-row`, {gap: 10}]}>
          <Button
            iconLeft={
              <FontAwesomeIcon icon={faPenToSquare} color={'white'} size={15} />
            }
            style={
              'bg-primary-dark flex-row justify-center items-center rounded-md pl-3 p-2'
            }
            textStyle={'text-primary-content text-md font-bold'}
          />
          <Button
            iconLeft={
              <FontAwesomeIcon icon={faTrash} color={'white'} size={15} />
            }
            style={
              'bg-error flex-row justify-center items-center rounded-md pl-3 p-2'
            }
            textStyle={'text-primary-content text-md font-bold'}
          />
        </View>
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
                gap: 20,
              },
              s`flex rouned-lg bg-background p-8 rounded-lg w-11/12 border-border border`,
            ]}>
            <Text style={s`text-lg text-copy font-bold`}>
              Update the state of the request
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: '#904ce9'}]}
              containerStyle={s`bg-background rounded-lg border border-border `}
              activeColor="#904ce9"
              placeholderStyle={s`text-copy-light`}
              selectedTextStyle={s`text-copy-light font-semibold`}
              itemTextStyle={s`text-copy`}
              inputSearchStyle={s`rounded-md border-primary text-copy-lighter`}
              iconColor="#3d2e51"
              data={states}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select State' : '...'}
              value={stateValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setStateValue(item.value);
                setState(item.label.toLowerCase());
                setIsFocus(false);
              }}
            />
            <View style={s`flex-row items-center mt-5 justify-around`}>
              <Button
                title="Cancel"
                onPress={toggleModal}
                style="bg-error w-24 h-10 flex justify-center items-center rounded-md"
                textStyle="text-copy text-lg font-bold"
              />
              <Button
                title="Update"
                onPress={handleUpdateState}
                style="bg-primary-dark w-24 h-10 flex justify-center items-center rounded-md"
                textStyle="text-copy text-lg font-bold"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserRequest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    gap: 15,
  },
  dropdown: {
    height: 42,
    backgroundColor: '#251c31',
    borderColor: '#3d2e51',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdown2: {
    height: 42,
    width: 180,
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
