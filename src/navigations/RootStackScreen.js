import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirebaseScreen from '../screens/FirebaseScreen';
const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator
    initialRouteName="AuthStackScreen"
    screenOptions={{
      animation: 'slide_from_right',
      headerShown: false,
    }}>
    <RootStack.Screen name="FirebaseScreen" component={FirebaseScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
