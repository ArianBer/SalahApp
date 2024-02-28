import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import BottomNavigator from "./bottomNavigator/BottomNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAppSelector } from "../redux/hooks";

const RootNavigator = () => {
  const isOnBoarded = useAppSelector((state) => state.auth.isOnBoarded);

  return (
    <NavigationContainer>
      {isOnBoarded ? <BottomNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
