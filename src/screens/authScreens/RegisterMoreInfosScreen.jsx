import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import {s} from 'react-native-wind';
import finishRegisterUser from '../../api/modules/auth/finishRegisterUser';
import Button from '../../components/atoms/Button';
import getData from '../../helpers/asyncStorage/getData';
import useCities from '../../hooks/useCities';

const RegisterMoreInfosScreen = () => {
  const [city, setCity] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [difficulty, setDifficulty] = useState();
  const [difficultyValue, setDifficultyValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusLevels, setIsFocusLevels] = useState(false);
  const cities = useCities();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const id = await getData('id');
    try {
      if (city !== '' && difficulty !== '') {
        const {data} = await finishRegisterUser(id, difficulty, city);
        console.log(data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Please select a city and a difficulty.',
        });
      }
      navigate('/');
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred while finishing registration.',
      });
    }
  };

  const levels = [
    {label: 'Easy', value: '1'},
    {label: 'Normal', value: '2'},
    {label: 'Hard', value: '3'},
  ];

  return (
    <View
      style={[
        s`flex flex-1 w-full h-full justify-between px-5 py-8  bg-background`,
      ]}>
      <View style={([s`flex w-72`], {gap: 15})}>
        <Text style={s`text-primary text-4xl font-bold`}>
          Let us know more about you
        </Text>
        <Text style={s`text-copy-light text-lg`}>
          We are using this informations to provide you with the most suitable
          requests to fulfill.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={s`text-xl font-bold text-copy tracking-wide `}>
          Request's difficulty :
        </Text>
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

      <View style={styles.container}>
        <Text style={s`text-xl font-bold text-copy tracking-wide `}>
          City :
        </Text>
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
      </View>

      <Button
        title="Finish"
        onPress={handleSubmit}
        style={'bg-primary-dark p-3 rounded-lg'}
        textStyle={'text-xl text-copy text-center font-bold'}
      />
    </View>
  );
};

export default RegisterMoreInfosScreen;

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
