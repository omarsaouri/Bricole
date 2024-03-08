import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {s} from 'react-native-wind';

const MyTouchableOpacity = ({
  onPress,
  onLongPress,
  disabled,
  activeOpacity,
  style,
  disabledStyle,
  textStyle,
  title,
  iconLeft,
  iconRight,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[styles.button, disabled ? styles.disabled : null, s`${style}`]}>
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

const styles = StyleSheet.create({
  button: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default MyTouchableOpacity;
