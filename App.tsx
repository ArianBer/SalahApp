import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './src/navigation/bottomNavigator/BottomNavigator';
import  { useEffect } from "react";
import { useLoadFonts } from "./src/hooks/useLoadFonts";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from "./src/components/theme";

function App() {
  const fontsLoaded = useLoadFonts();
  const {i18n} = useTranslation();

  useEffect(() => {
    const readData = async () => {
      await AsyncStorage.getItem('firstLaunchKey').then((response: any) => {
        if (response) {
          i18n.changeLanguage('al');
        }
      });
    };
    readData();
  }, [i18n]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <BottomNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
