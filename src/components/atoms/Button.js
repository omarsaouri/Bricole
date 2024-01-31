import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {s} from 'react-native-wind';

const Button = ({
  onPress,
  onLongPress,
  title,
  iconLeft,
  iconRight,
  disabledStyle,
  style,
  textStyle,
  disabled,
  activeOpacity,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={disabled ? s`${disabledStyle}` : s`${style}`}>
      {iconLeft}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={s`${textStyle}`}>{title}</Text>
      )}
      {iconRight}
    </TouchableOpacity>
  );
};

export default Button;
