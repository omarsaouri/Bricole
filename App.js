import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {s} from 'react-native-wind';
import {NativeRouter, Route, Routes} from 'react-router-native';
import LandingScreen from './src/screens/landingScreen/LandingScreen';
import RegisterScreen from './src/screens/authScreens/RegisterScreen';
import LoginScreen from './src/screens/authScreens/LoginScreen';
import FeedScreen from './src/screens/feedScreen/FeedScreen';
import RequestsScreen from './src/screens/requestsScreen/RequestsScreen';
import AccountScreen from './src/screens/accountScreen/AccountScreen';

function App() {
  return (
    <SafeAreaView style={s`flex-1`}>
      <NativeRouter>
        <Routes>
          <Route path="/" Component={FeedScreen} />
          <Route path="/requests" Component={RequestsScreen} />
          <Route path="/account" Component={AccountScreen} />

          <Route exact path="/landing" Component={LandingScreen} />
          <Route path="/register" Component={RegisterScreen} />
          <Route path="/login" Component={LoginScreen} />
        </Routes>
      </NativeRouter>
    </SafeAreaView>
  );
}

export default App;
