import React, { ReactNode } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { CurrentPrayerType } from "../../redux/reducers/homeReducer";
import { ViewBox } from "../../styles/theme";

import Asr from "../../assets/images/Asr.png";
import Dhuhr from "../../assets/images/Dhuhr.png";
import Isha from "../../assets/images/Isha.png";
import Maghrib from "../../assets/images/Maghrib.png";
import Sunrise from "../../assets/images/Sunrise.png";
import Fajr from "../../assets/images/Fajr.png";

import { useAppSelector } from "../../redux/hooks";

interface HomeHeaderBackgroundProps {
  children: ReactNode;
}

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: "100%",
  },
});

const backgroundImages: Record<CurrentPrayerType, any> = {
  imsak: Fajr,
  sunrise: Sunrise,
  dhuhr: Dhuhr,
  asr: Asr,
  maghrib: Maghrib,
  isha: Isha,
};

export function HomeHeaderBackground({ children }: HomeHeaderBackgroundProps) {
  const { activePrayer } = useAppSelector((state) => state.home);
  console.log({activePrayer})
  const imageSourse = backgroundImages[activePrayer] ?? backgroundImages.isha;

  return (
    <ViewBox height={440}>
      <ImageBackground
        source={imageSourse}
        style={styles.banner}
        borderRadius={21}
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
      >
        {children}
      </ImageBackground>
    </ViewBox>
  );
}
