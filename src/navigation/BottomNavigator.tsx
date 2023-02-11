import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconBrandGoogleHome } from "tabler-icons-react-native";
import { HomeStackNavigator, SettingsStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <IconBrandGoogleHome size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <IconBrandGoogleHome size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
