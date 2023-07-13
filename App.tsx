import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { ThemeProvider } from "./src/components/theme";
import { useLoadFonts } from "./src/hooks/useLoadFonts";
import BottomNavigator from "./src/navigation/bottomNavigator/BottomNavigator";
import { store } from "./src/redux/store";

function App() {
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <BottomNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
