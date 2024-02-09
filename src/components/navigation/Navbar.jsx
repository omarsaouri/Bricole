import React from 'react';
import {Text, View} from 'react-native';
import {s} from 'react-native-wind';
import {Link} from 'react-router-native';

const Navbar = () => {
  return (
    <View
      style={s`absolute bottom-0 flex-row justify-around w-full p-5 bg-primary-light `}>
      <Link to={'/'}>
        <Text>feed</Text>
      </Link>
      <Link to={'/requests'}>
        <Text>requests</Text>
      </Link>
      <Link to={'/account'}>
        <Text>account</Text>
      </Link>
    </View>
  );
};

export default Navbar;
