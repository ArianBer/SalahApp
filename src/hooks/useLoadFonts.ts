import { useFonts } from "expo-font";
import RegularFont from "../assets/fonts/Satoshi-Regular.otf";
import MediumFont from "../assets/fonts/Satoshi-Medium.otf";
import BoldFont from "../assets/fonts/Satoshi-Bold.otf";
import ExtraBoldFont from "../assets/fonts/Satoshi-Black.otf";

type useFontsType = Record<string, typeof RegularFont>;

const mappedFonts: useFontsType = {
  "Satoshi-Regular": RegularFont,
  "Satoshi-Medium": MediumFont,
  "Satoshi-Bold": BoldFont,
  "Satoshi-Black": ExtraBoldFont,
};

export function useLoadFonts() {
  const [fontsLoaded] = useFonts(mappedFonts);

  return fontsLoaded;
}
