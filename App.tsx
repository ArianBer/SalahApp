import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { ThemeProvider } from "./src/components/theme";
import { useLoadFonts } from "./src/hooks/useLoadFonts";
import BottomNavigator from "./src/navigation/bottomNavigator/BottomNavigator";
import { store } from "./src/redux/store";
// import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { useAppSelector } from "./src/redux/hooks";
import AuthNavigator from "./src/navigation/AuthNavigator";
import RootNavigator from "./src/navigation/RootNavigator";
// import { timeout } from "./src/utilts/timeout";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsLoaded = useLoadFonts();
  const { i18n } = useTranslation();

  useEffect(() => {
    const readData = async () => {
      await AsyncStorage.getItem("firstLaunchKey").then((response: any) => {
        if (response) {
          i18n.changeLanguage("al");
        }
      });
    };
    readData();
  }, [i18n]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await timeout(1);
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </Provider>
    </View>
  );
}
