import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {useNavigate} from 'react-router-native';

import Button from './Button';
export default function ({path, style}) {
  const navigate = useNavigate();

  return (
    <Button
      style={style}
      title={<FontAwesomeIcon icon={faChevronLeft} color="#904ce9" size={20} />}
      onPress={() => {
        navigate(-1);
      }}
    />
  );
}
