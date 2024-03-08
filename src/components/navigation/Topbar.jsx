import {View, Text} from 'react-native';
import React from 'react';
import {s} from 'react-native-wind';
import BackButton from '../atoms/BackButton';
import Logo from '../brand/Logo';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';

const Topbar = ({stackLength}) => {
  return (
    <View
      style={s`flex-row items-center w-full px-4 justify-between border-b-2 border-border shadow mb-2`}>
      {stackLength !== 0 ? <BackButton /> : <View style={s`w-5`}></View>}
      <Logo size={16} marginBottom={0} />
      <FontAwesomeIcon icon={faUser} color="#904ce9" size={25} />
    </View>
  );
};

export default Topbar;
