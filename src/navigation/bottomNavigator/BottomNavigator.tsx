import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  IconCalendarMinus,
  IconCompass,
  IconDotsCircleHorizontal,
  IconHome,
} from "tabler-icons-react-native";
import {
  HomeStackNavigator,
  KiblaStackNavigator,
  PrayerTimesNavigator,
  SettingsStackNavigator,
} from "../stackNavigator/StackNavigator";
import { SetActiveTabScreenIcon } from "./ActiveTabScreenIcon";

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
    <Tab.Navigator initialRouteName="Feed" {...{ screenOptions }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Ballina",
          tabBarIcon: ({ focused }) => (
            <SetActiveTabScreenIcon
              focused={focused}
              icon={<IconHome size={23} color="black" />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PrayerTimes"
        component={PrayerTimesNavigator}
        options={{
          tabBarLabel: "Takvimi",
          tabBarIcon: ({ focused }) => (
            <SetActiveTabScreenIcon
              focused={focused}
              icon={<IconCalendarMinus size={23} color="black" />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Kibla"
        component={KiblaStackNavigator}
        options={{
          tabBarLabel: "Kibla",
          tabBarIcon: ({ focused }) => (
            <SetActiveTabScreenIcon
              focused={focused}
              icon={<IconCompass size={23} color="black" />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: "Tjera",
          tabBarIcon: ({ focused }) => (
            <SetActiveTabScreenIcon
              focused={focused}
              icon={<IconDotsCircleHorizontal size={23} color="black" />}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
