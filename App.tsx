import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./src/navigation/BottomNavigator";
import { useLoadFonts } from "./src/hooks/useLoadFonts";
import { ThemeProvider } from "./src/components/theme";

function App() {
  const fontsLoaded = useLoadFonts();

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
