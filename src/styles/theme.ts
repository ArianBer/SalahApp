import { createBox, createText, createTheme } from "@shopify/restyle";
import { Colors } from "./Color";
import { Fonts } from "./Fonts";

export const lightTheme = createTheme({
  colors: {
    mainBackground: Colors.lightGrey,
    mainText: Colors.blackRussian,
    lightGreen: Colors.lightGreen,
    white: Colors.white,
    darkGreen: Colors.darkGreen,
    dargGreenWithOpacity: Colors.darkGreenWithOpacity,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    xxxxl: 30,
    xxxxxl: 38,
    xxxxxxl: 45,
    xxxxxxxl: 50,
    "9xl": 80,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      color: "mainText",
      fontFamily: Fonts.Regular,
    },
    xs: {
      fontSize: 12,
    },
    sm: {
      fontSize: 14,
    },
    smMedium: {
      fontSize: 12,
      fontFamily: Fonts.Medium,
    },
    md: {
      fontSize: 16,
    },
    lg: {
      fontSize: 18,
    },
    xl: {
      fontSize: 20,
    },
    xlBold: {
      fontSize: 20,
      fontFamily: Fonts.Bold,
    },
    "2xl": {
      fontSize: 24,
    },
    "3xl": {
      fontSize: 32,
    },
    "3xlBold": {
      fontSize: 32,
      fontFamily: Fonts.Bold,
    },
    "3xlExtraBold": {
      fontSize: 32,
      fontFamily: Fonts.ExtraBold,
    },
    "5xl": {
      fontSize: 48,
    },
  },
});

export type ThemeType = typeof lightTheme;

export const darkTheme = createTheme<ThemeType>({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    mainBackground: Colors.black,
    mainText: Colors.white,
  },
});

export const ViewBox = createBox<ThemeType>();
export const TextBox = createText<ThemeType>();
