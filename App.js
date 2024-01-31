import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {s} from 'react-native-wind';
import {NativeRouter, Route, Routes} from 'react-router-native';
import LandingScreen from './src/screens/landingScreen/LandingScreen';
import RegisterScreen from './src/screens/authScreens/RegisterScreen';
import LoginScreen from './src/screens/authScreens/LoginScreen';
import test from './src/screens/test';

function App() {
  return (
    <SafeAreaView style={s`flex-1`}>
      <NativeRouter>
        <Routes>
          <Route exact path="/" Component={LandingScreen} />
          {/* <Route path="/" Component={test} /> */}
          <Route path="/register" Component={RegisterScreen} />
          <Route path="/login" Component={LoginScreen} />
        </Routes>
      </NativeRouter>
    </SafeAreaView>
  );
}

export default App;
