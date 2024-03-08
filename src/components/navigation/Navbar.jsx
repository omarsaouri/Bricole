import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {s} from 'react-native-wind';
import {Link, useNavigate} from 'react-router-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faHandshakeAngle} from '@fortawesome/free-solid-svg-icons/faHandshakeAngle';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';

const Navbar = ({selectedFeed, selectedRequests, selectedDemands}) => {
  const navigate = useNavigate();
  const handlePress = tab => {
    navigate(tab);
  };
  return (
    <View
      style={[
        s`absolute bottom-0 z-10 flex-row justify-around items-center w-full py-2 bg-foreground border-t-2 border-border`,
      ]}>
      <TouchableHighlight
        underlayColor={'#251c31'}
        onPress={() => {
          handlePress('/');
        }}
        style={s`flex-1`}>
        <View style={s`flex items-center`}>
          <FontAwesomeIcon
            icon={faHome}
            color={selectedFeed ? '#904ce9' : '#d7cee3'}
            size={25}
          />
          <Text
            style={
              selectedFeed
                ? s`text-lg text-primary font-bold`
                : s`text-lg text-copy font-bold`
            }>
            Feed
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          handlePress('/requests');
        }}
        underlayColor={'#251c31'}
        style={s`flex-1 `}>
        <View style={s`flex items-center`}>
          <FontAwesomeIcon
            icon={faHandshakeAngle}
            color={selectedRequests ? '#904ce9' : '#d7cee3'}
            size={25}
          />
          <Text
            style={
              selectedRequests
                ? s`text-lg text-primary font-bold`
                : s`text-lg text-copy font-bold`
            }>
            Requests
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          handlePress('/account');
        }}
        underlayColor={'#251c31'}
        style={s`flex-1 `}>
        <View style={s`flex items-center`}>
          <FontAwesomeIcon
            icon={faUsers}
            color={selectedDemands ? '#904ce9' : '#d7cee3'}
            size={25}
          />
          <Text
            style={
              selectedDemands
                ? s`text-lg text-primary font-bold`
                : s`text-lg text-copy font-bold`
            }>
            Demands
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Navbar;
