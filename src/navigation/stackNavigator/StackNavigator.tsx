import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, PrayerTimes, Settings} from '../../screens/index';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown:false
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}  options={{headerShown: false}}/>
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

const PrayerTimesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="PrayerTimes" component={PrayerTimes} />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, SettingsStackNavigator, PrayerTimesNavigator };