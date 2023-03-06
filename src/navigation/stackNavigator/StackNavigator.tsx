import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Kibla, PrayerTimes, Settings, SinglePrayer } from '../../screens';
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown:false
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="SinglePrayer" component={SinglePrayer}/>
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

const KiblaStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Kibla" component={Kibla} />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, SettingsStackNavigator, PrayerTimesNavigator, KiblaStackNavigator };