import { createBox, createText, createTheme } from "@shopify/restyle";
import { Colors } from "./Color";
import { Fonts } from "./Fonts";

export const lightTheme = createTheme({
  colors: {
    ...Colors,
    mainBackground: Colors.lightGrey,
    mainText: Colors.blackRussian,
    lightGreen: Colors.lightGreen,
    white: Colors.white,
    darkGreen: Colors.darkGreen,
    dargGreenWithOpacity: Colors.darkGreenWithOpacity,
  },
  spacing: {
    xs: 4,
    "6": 6,
    "8": 8,
    "2": 2,
    "20": 20,
    "24": 24,
    "25": 25,
    "27": 27,
    "37": 37,
    "54": 54,
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
    "sm-medium": {
      fontSize: 14,
      lineHeight: 17,
      fontFamily: Fonts.Medium,
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
    "md-medium": {
      fontSize: 16,
      fontFamily: Fonts.Medium,
    },
    "md-bold": {
      fontSize: 16,
      fontFamily: Fonts.Bold,
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
