import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {s} from 'react-native-wind';
import {NativeRouter, Route, Routes} from 'react-router-native';
import MyStatusBar from './src/components/statusBar/MyStatusBar';
import AccountScreen from './src/screens/accountScreen/AccountScreen';
import LoginScreen from './src/screens/authScreens/LoginScreen';
import RegisterScreen from './src/screens/authScreens/RegisterScreen';
import FeedScreen from './src/screens/feedScreen/FeedScreen';
import LandingScreen from './src/screens/landingScreen/LandingScreen';
import RequestsScreen from './src/screens/requestsScreen/RequestsScreen';
import 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {ErrorToast, SuccessToast} from 'react-native-toast-message';
import RegisterMoreInfosScreen from './src/screens/authScreens/RegisterMoreInfosScreen';
import NewRequestScreen from './src/screens/requestsScreen/NewRequestScreen';

function App() {
  const toastConfig = {
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
          color: '#e94c4c',
        }}
        style={{
          backgroundColor: '#251c31',
          borderLeftColor: '#e94c4c',
        }}
      />
    ),

    success: props => (
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: 17,
          color: 'white',
        }}
        style={{
          backgroundColor: '#251c31',
          borderLeftColor: '#4ce94c',
        }}
      />
    ),
  };
  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor="#191221" barStyle="light-content" />
      <NativeRouter>
        <Routes>
          <Route exact path="/" Component={FeedScreen} />
          <Route path="/requests" Component={RequestsScreen} />
          <Route path="/newRequest" Component={NewRequestScreen} />
          <Route path="/account" Component={AccountScreen} />
          <Route path="/landing" Component={LandingScreen} />
          <Route path="/register" Component={RegisterScreen} />
          <Route path="/registermore" Component={RegisterMoreInfosScreen} />
          <Route path="/login" Component={LoginScreen} />
        </Routes>
      </NativeRouter>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

export default App;
