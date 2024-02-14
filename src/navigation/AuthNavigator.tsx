import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import OnBoardingScreen from "../screens/auth/OnBoardingScreen";
import LanguageScreen from "../screens/auth/LanguageScreen";
import LocationScreen from "../screens/auth/LocationScreen";
import LocationSelectedScreen from "../screens/auth/LocationSelectedScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Language"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="LocationSelected" component={LocationSelectedScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
