import React, { useEffect } from "react";
import prayerData from "../../data/times.json";
import { usePrayerTimes } from "../../hooks/usePrayerTimes";
import { retrunIconPrayerTimes } from "../../services/returnIconsFromPrayerTime";
import { TextBox, ViewBox } from "../../styles/theme";
import useTranslation from "../../hooks/useTranslation";
import { useAppSelector } from "../../redux/hooks";

type PrayerBannerProps = {
  isAbsolute: boolean;
  icon: any;
  customIcon: boolean;
};
function PrayerBox({ isAbsolute, icon, customIcon }: PrayerBannerProps) {
  const {
    remainingTimeUntilNextPrayer,
    getPrayerTimesForToday,
    activePrayer,
    hoursRemaining,
    secondsRemaining,
  } = usePrayerTimes(prayerData);
  const t = useTranslation();
  const language = useAppSelector((state) => state.language);


  const returnPrayerNamesFromAlbanian = (prayer: string) => {
    const prayers = {
      imsak: 'Imsak',
      sunrise: 'Lindjen e diellit',
      dhuhr: 'Drekë',
      asr: 'Ikindi',
      maghrib: 'Aksham',
      fajr: 'Jaci',
    }

    if(prayers[prayer]){
      return prayers[prayer];
    }
  }

  useEffect(() => {
    const prayerTimesForToday = getPrayerTimesForToday();
    remainingTimeUntilNextPrayer(prayerTimesForToday);

    const intervalId = setInterval(() => {
      remainingTimeUntilNextPrayer(prayerTimesForToday);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [activePrayer]);

  return (
    <ViewBox
      left={0}
      right={0}
      flexDirection="row"
      height={128}
      backgroundColor="white"
      position={isAbsolute ? "absolute" : "relative"}
      style={{ bottom: isAbsolute ? 45 : 0 }}
      marginHorizontal="xxl"
      borderRadius="14"
      alignItems="center"
      justifyContent="space-between"
      paddingRight="xxxxl"
    >
      <ViewBox flexDirection="column">
        <ViewBox flexDirection="row" alignItems="flex-start">
          <TextBox
            paddingLeft="xxxxxl"
            fontSize={48}
            fontWeight="bold"
            color="mainText"
            lineHeight={58}
          >
            {hoursRemaining}
          </TextBox>
          <TextBox
            fontSize={32}
            color="darkGreen"
            fontWeight="900"
            paddingLeft="sm"
          >
            {secondsRemaining}
          </TextBox>
        </ViewBox>
        <TextBox
          paddingLeft="xxxxxl"
          fontSize={16}
          fontWeight="400"
          lineHeight={15}
        >
          {t("until") + " " + (language.languageSelected.value === 'al' ? returnPrayerNamesFromAlbanian(activePrayer.toLowerCase()) : t(activePrayer?.toLowerCase()))}
        </TextBox>
      </ViewBox>
      <ViewBox>
        {customIcon ? retrunIconPrayerTimes(activePrayer, 48, "#56791D") : icon}
      </ViewBox>
    </ViewBox>
  );
}

export default PrayerBox;
