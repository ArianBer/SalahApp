import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Provider } from "react-redux";
import { ThemeProvider } from "./src/components/theme";
import { useLoadFonts } from "./src/hooks/useLoadFonts";
import RootNavigator from "./src/navigation/RootNavigator";
import { store } from "./src/redux/store";
import { timeout } from "./src/utilts/timeout";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsLoaded = useLoadFonts();
  const { i18n } = useTranslation();

  useEffect(() => {
    const readData = async () => {
      i18n.changeLanguage('al');
    };
    readData();
  }, [i18n]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await timeout(1);
      await SplashScreen.hideAsync();
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
