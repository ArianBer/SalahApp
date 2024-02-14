import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import BottomNavigator from "./bottomNavigator/BottomNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAppSelector } from "../redux/hooks";
import { useTranslation } from "react-i18next";
import { store } from "../redux/store";

const RootNavigator = () => {
  const isOnBoarded = useAppSelector((state) => state.auth.isOnBoarded);
  const language = useAppSelector((state) => state.auth.language);
  const { i18n } = useTranslation();

  useEffect(() => {
    // i18n?.changeLanguage(language);
  }, [language]);

  return (
    <NavigationContainer>
      {isOnBoarded ? <BottomNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
