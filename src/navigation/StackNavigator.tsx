import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Home,Settings} from '../screens/index';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown:false
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, SettingsStackNavigator };