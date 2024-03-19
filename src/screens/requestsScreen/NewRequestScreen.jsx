import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import {s} from 'react-native-wind';
import {useNavigate} from 'react-router-native';
import postRequest from '../../api/modules/request/postRequest';
import Button from '../../components/atoms/Button';
import ValidationInput from '../../components/atoms/ValidationInput';
import Topbar from '../../components/navigation/Topbar';
import clearAsyncStorage from '../../helpers/asyncStorage/clearAsyncStorage';
import getData from '../../helpers/asyncStorage/getData';
import getLocation from '../../helpers/location/getLocation';
import locationToString from '../../helpers/location/locationToString';
import useAuth from '../../hooks/useAuth';
import useCities from '../../hooks/useCities';

const NewRequestScreen = () => {
  useAuth();
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusLevels, setIsFocusLevels] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [difficulty, setDifficulty] = useState();
  const [difficultyValue, setDifficultyValue] = useState();
  const [city, setCity] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const cities = useCities();

  const levels = [
    {label: 'easy', value: '1'},
    {label: 'normal', value: '2'},
    {label: 'hard', value: '3'},
  ];

  const clearStorage = async () => {
    try {
      await clearAsyncStorage();
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const handleGetCurrentLocation = async () => {
    const location = await getLocation();
    const address = await locationToString(
      location.latitude,
      location.longitude,
    );
    setCity(address);
  };

  const handleSubmit = async () => {
    const userId = await getData('userId');

    const privatePhoneNumber = !toggleCheckBox;
    try {
      if (city !== '' && difficulty !== '') {
        const {data} = await postRequest(
          userId,
          description,
          parseInt(price, 10),
          city,
          dueDate,
          difficulty,
          privatePhoneNumber,
        );
        console.log(data);
        Toast.show({
          type: 'success',
          text1: 'Success. ',
        });
        navigate('/');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Please Fill the form',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred while posting your request.',
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <View style={[s`flex-1 w-full h-full bg-background`]}>
      <Topbar />
      <View style={s`flex px-2 py-1 mb-4`}>
        <Text style={s`text-copy font-bold text-3xl`}>New Request</Text>
        <Text style={s`text-copy-light font-semibold `}>
          Ask help from the community
        </Text>
      </View>

      <View style={[s`px-2 py-1 flex `]}>
        <View style={[s`flex`, {gap: 10}]}>
          <Text style={s`text-copy font-bold`}>
            Describe what do you need help on :
          </Text>
          <ValidationInput
            style="p-1 pb-2"
            text={description}
            setText={setDescription}
            regex={/^(?!\s*$).+/}
            setIsFormValid={setIsFormValid}
          />
        </View>

        <View style={[s`flex`, {gap: 10}]}>
          <Text style={s`text-copy font-bold`}>Specify a price :</Text>
          <ValidationInput
            style="p-1 pb-2"
            text={price}
            keyboardType={'numeric'}
            setText={setPrice}
            regex={/^(?=.*[0-9])\s*\d+(?:\.\d+)?\s*$/}
            setIsFormValid={setIsFormValid}
          />
        </View>

        <View style={[s`flex-row`, {gap: 20}]}>
          <View>
            <Text style={s`text-copy font-bold mb-3`}>
              Difficulty of your request :
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
          </View>
          <View>
            <Text style={s`text-copy font-bold mb-3`}>Deadline : </Text>
            <Button
              title="Choose a due date"
              style="bg-primary px-4 py-3 rounded-lg"
              textStyle="text-copy text-md font-bold"
              onPress={() => setOpen(true)}
            />
            <DatePicker
              modal
              open={open}
              date={dueDate}
              onConfirm={date => {
                setOpen(false);
                setDueDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>

        <View style={[s`flex`, {gap: 10}]}>
          <Text style={s`text-copy font-bold mt-3`}>City : </Text>
          <View style={s`flex-row justify-between items-center`}>
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
              title="Use current location"
              onPress={handleGetCurrentLocation}
              style="bg-primary px-2 py-3 rounded-lg"
              textStyle="text-copy text-md font-bold"
            />
          </View>
        </View>

        <View style={s`flex-row mt-5`}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColor="#3d2e51"
            onCheckColor="#904ce9"
            onTintColor="#904ce9"
          />
          <Text style={s` text-copy-light w-72 ml-3`}>
            Check if you want to share your phone number without accepting the
            help.
          </Text>
        </View>

        <View style={s`flex-row items-center mt-5 justify-around`}>
          <Button
            title="Cancel"
            onPress={handleCancel}
            style="bg-error w-24 h-10 flex justify-center items-center rounded-md"
            textStyle="text-copy text-lg font-bold"
          />
          <Button
            title="Post"
            onPress={handleSubmit}
            style="bg-primary-dark w-24 h-10 flex justify-center items-center rounded-md"
            textStyle="text-copy text-lg font-bold"
          />
        </View>
      </View>
    </View>
  );
};

export default NewRequestScreen;

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
