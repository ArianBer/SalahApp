import React, { ReactNode } from "react";
import { StyleSheet, ImageBackground } from "react-native";
// eslint-disable-next-line import/namespace
import { CurrentPrayerType } from "../../redux/reducers/homeReducer";
import { ViewBox } from "../../styles/theme";

import Sunrise from "../../assets/images/Sunrise.png";
import Dhuhr from "../../assets/images/Dhuhr.png";
import Asr from "../../assets/images/Asr.png";
import Maghrib from "../../assets/images/Maghrib.png";
import Isha from "../../assets/images/Isha.png";
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
  imsak: Sunrise,
  sunrise: Sunrise,
  dhuhr: Dhuhr,
  asr: Asr,
  maghrib: Maghrib,
  isha: Isha,
};

export function HomeHeaderBackground({ children }: HomeHeaderBackgroundProps) {
  const { activePrayer } = useAppSelector((state) => state.home);

  const imageSourse = backgroundImages[activePrayer];
  return (
    <ViewBox height={380}>
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
