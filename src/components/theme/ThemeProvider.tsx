import { ThemeProvider as Provider } from "@shopify/restyle";
import React, { ReactNode, useLayoutEffect, useState } from "react";
import { darkTheme, lightTheme } from "../../styles/theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useLayoutEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <Provider theme={darkMode ? darkTheme : lightTheme}>{children}</Provider>
  );
}
