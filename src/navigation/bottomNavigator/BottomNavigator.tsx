import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Kibla, Settings } from "../../screens";
import {
  HomeStackNavigator,
  PrayerTimesNavigator,
} from "../stackNavigator/StackNavigator";
import { BottomTabBar } from "./components/BottomTabBar";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle: {
    height: 90,
  },
  tabBarActiveTintColor: "#090E1B",
  tabBarInactiveTintColor: "#090E1B",
  headerShown: false,
};

function BottomNavigator() {
  return (
    <Tab.Navigator
      tabBar={BottomTabBar}
      initialRouteName="HomeTab"
      {...{ screenOptions }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="PrayerTimesTab" component={PrayerTimesNavigator} />
      <Tab.Screen name="Kibla" component={Kibla} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
