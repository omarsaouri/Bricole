import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {s} from 'react-native-wind';
import Button from '../../components/atoms/Button';
import ValidationInput from '../../components/atoms/ValidationInput';
import useCities from '../../hooks/useCities';
import getLocation from '../../helpers/location/getLocation';
import locationToString from '../../helpers/location/locationToString';

const NewRequestScreen = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusLevels, setIsFocusLevels] = useState(false);
  const [difficulty, setDifficulty] = useState();
  const [difficultyValue, setDifficultyValue] = useState();
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorConvert, setErrorConvert] = useState(null);
  const [city, setCity] = useState('');
  const [cityValue, setCityValue] = useState('');

  const cities = useCities();

  const levels = [
    {label: 'Easy', value: '1'},
    {label: 'Normal', value: '2'},
    {label: 'Hard', value: '3'},
  ];

  const handleGetCurrentLocation = async () => {
    const location = await getLocation();
    const address = await locationToString(
      location.latitude,
      location.longitude,
    );
  };

  return (
    <View style={[s`flex-1 w-full h-full bg-background `]}>
      <View>
        <Text>New Request</Text>
        <Text>Ask help from the community</Text>
      </View>

      <View>
        <View>
          <Text>Describe what do you need help on :</Text>
          <ValidationInput />
        </View>

        <View>
          <Text>Specify a price :</Text>
          <ValidationInput />
        </View>

        <View>
          <Text>Specify a price :</Text>
          <ValidationInput />
        </View>

        <View>
          <Text>Specify a price :</Text>

          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#904ce9'}]}
            containerStyle={s`bg-background rounded-lg border border-border`}
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
              setDifficulty(item.label);
              setIsFocusLevels(false);
            }}
          />
        </View>

        <View>
          <Text>City : </Text>
          <Dropdown
            mode="modal"
            style={[styles.dropdown, isFocus && {borderColor: '#904ce9'}]}
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
    height: 50,
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
