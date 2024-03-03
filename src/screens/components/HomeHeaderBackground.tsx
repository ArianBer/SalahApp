import React, { ReactNode } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { CurrentPrayerType } from "../../redux/reducers/homeReducer";
import { TextBox, ViewBox } from "../../styles/theme";

import Asr from "../../assets/images/Asr.png";
import Dhuhr from "../../assets/images/Dhuhr.png";
import Isha from "../../assets/images/Isha.png";
import Maghrib from "../../assets/images/Maghrib.png";
import Sunrise from "../../assets/images/Sunrise.png";
import Fajr from "../../assets/images/Fajr.png";

import { useAppSelector } from "../../redux/hooks";
import i18n from "../../services/translation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconFileText } from "tabler-icons-react-native";
import { useNavigation } from "@react-navigation/native";

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
  const imageSourse = activePrayer === 'sunrises' ? backgroundImages['sunrise'] : backgroundImages[activePrayer] ?? backgroundImages.isha;
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const onPressLearn = () => {
    navigation?.navigate("PrayerInsideLearn");
  };

  return (
    <ViewBox height={460}>
      <ImageBackground
        source={imageSourse}
        style={styles.banner}
        borderRadius={21}
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
      >
        {children}
        <TouchableOpacity onPress={onPressLearn}>
          <ViewBox 
            flexDirection='row' 
            alignItems='center' 
            position='absolute' 
            right={0} 
            top={0} 
            style={{marginTop:top + 10}} 
            marginRight='37' 
            padding='10' 
            borderRadius='50' 
            backgroundColor='lightGreen'
            >
            <IconFileText color="black"/>
            <TextBox marginLeft='2' color='black' variant='md-bold'>{i18n.t('learn')}</TextBox>
          </ViewBox>
        </TouchableOpacity>
      </ImageBackground>
    </ViewBox>
  );
}
