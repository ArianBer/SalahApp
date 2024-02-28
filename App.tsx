import "react-native-gesture-handler";
import { Audio } from "expo-av";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Platform, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./src/components/theme";
import { useLoadFonts } from "./src/hooks/useLoadFonts";
import RootNavigator from "./src/navigation/RootNavigator";
import { persistor, store } from "./src/redux/store";
import { timeout } from "./src/utilts/timeout";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsLoaded = useLoadFonts();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (Platform.OS === "ios") {
      Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
    }
  }, []);

  useEffect(() => {
    const readData = async () => {
      i18n.changeLanguage("al");
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
        <PersistGate persistor={persistor}>
          <ThemeProvider>
            <RootNavigator />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </View>
  );
}
