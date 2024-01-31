import {View, Text} from 'react-native';
import React from 'react';
import Button from './Button';
import {useNavigate} from 'react-router-native';

export default function ({path}) {
  const navigate = useNavigate();
  return (
    <Button
      title={'back'}
      onPress={() => {
        navigate(path);
      }}
    />
  );
}
