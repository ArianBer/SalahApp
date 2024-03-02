import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home, PrayerTimes, SettingsScreen } from "../../screens";
import { PrayerInsideScreen } from "../../screens/PrayerInside";
import { PrayerInsideLearnScreen } from "../../screens/PrayerInsideLearn";
import LocationScreen from "../../screens/auth/LocationScreen";
import LocationSelectedScreen from "../../screens/auth/LocationSelectedScreen";
import ChangeLanguageScreen from "../../screens/settings/ChangeLanguageScreen";
import ChangeNotificationsScreen from "../../screens/settings/ChangeNotificationsScreen";
import OtherApplicationsScreen from "../../screens/settings/OtherApplicationsScreen";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
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

function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Setting" component={SettingsScreen} />
      <Stack.Screen
        name="OtherApplications"
        component={OtherApplicationsScreen}
      />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} />
      {/*using same screen for now*/}
      <Stack.Screen name="ChangeLocation" component={LocationScreen} />
      <Stack.Screen
        name="LocationSelected"
        component={LocationSelectedScreen}
      />
      <Stack.Screen
        name="ChangeNotifications"
        component={ChangeNotificationsScreen}
      />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, PrayerTimesNavigator, SettingsNavigator };
