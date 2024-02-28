import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home, PrayerTimes, SettingsScreen } from "../../screens";
import { PrayerInsideScreen } from "../../screens/PrayerInside";
import { PrayerInsideLearnScreen } from "../../screens/PrayerInsideLearn";
import OtherApplicationsScreen from "../../screens/settings/OtherApplicationsScreen";
import ChangeLanguageScreen from "../../screens/settings/ChangeLanguageScreen";
import ChangeLocationScreen from "../../screens/settings/ChangeLocationScreen";
import ChangeNotificationsScreen from "../../screens/settings/ChangeNotificationsScreen";

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
      <Stack.Screen name="ChangeLocation" component={ChangeLocationScreen} />
      <Stack.Screen
        name="ChangeNotifications"
        component={ChangeNotificationsScreen}
      />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, PrayerTimesNavigator, SettingsNavigator };
