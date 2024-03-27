import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Kibla } from "../../screens";
import {
  HomeStackNavigator,
  PrayerTimesNavigator,
  SettingsNavigator,
} from "../stackNavigator/StackNavigator";
import { BottomTabBar } from "./components/BottomTabBar";
import { useAppSelector } from "../../redux/hooks";
import { createStackNavigator } from "@react-navigation/stack";
import LocationScreen from "../../screens/auth/LocationScreen";
import LocationSelectedScreen from "../../screens/auth/LocationSelectedScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  tabBarStyle: {
    height: 90,
  },
  tabBarActiveTintColor: "#090E1B",
  tabBarInactiveTintColor: "#090E1B",
  headerShown: false,
};

function BottomNavigator() {
  const [initialRoute, setInitialRoute] = useState("HomeTab");
  const showLocationScreens = useAppSelector(
    (state) => state.auth.showChangeLocationScreens
  );

  useEffect(() => {
    if (showLocationScreens) {
      setInitialRoute("SettingsTab");
    }
  }, [showLocationScreens]);

  if (showLocationScreens) {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationTypeForReplace: "push" }}
      >
        <Stack.Screen
          name="ChangeLocation"
          component={LocationScreen}
          initialParams={{ isFromSettings: true }}
        />
        <Stack.Screen
          name="LocationSelected"
          component={LocationSelectedScreen}
          initialParams={{ isFromSettings: true }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      tabBar={BottomTabBar}
      initialRouteName={initialRoute}
      {...{ screenOptions }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="PrayerTimesTab" component={PrayerTimesNavigator} />
      <Tab.Screen name="Kibla" component={Kibla} />
      <Tab.Screen name="SettingsTab" component={SettingsNavigator} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
