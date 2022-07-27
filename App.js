import React, {useEffect} from 'react';
import {
  LogBox,
  StyleSheet,
  Dimensions,
  View,
  Image,
  StatusBar,
  Text,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './src/navigations/RootStackScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import {Images, Colors} from './src/constants';
LogBox.ignoreAllLogs();

const App = () => {
  const getToken = () => {
    setTimeout(async () => {
      SplashScreen.hide();
    }, 2000);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <ToastProvider>
      <NavigationContainer theme={{colors: {background: Colors.white}}}>
        <RootStackScreen />
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  splashStyle: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
