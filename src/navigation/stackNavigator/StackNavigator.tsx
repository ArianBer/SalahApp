import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home, PrayerTimes, SinglePrayer } from "../../screens";
import { PrayerInsideScreen } from "../../screens/PrayerInside";
import { PrayerInsideLearnScreen } from "../../screens/PrayerInsideLearn";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SinglePrayer" component={SinglePrayer} />
      <Stack.Screen name="PrayerInside" component={PrayerInsideScreen} />
      <Stack.Screen
        name="PrayerInsideLearn"
        component={PrayerInsideLearnScreen}
      />
    </Stack.Navigator>
  );
}

function PrayerTimesNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="PrayerTimes" component={PrayerTimes} />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, PrayerTimesNavigator };
