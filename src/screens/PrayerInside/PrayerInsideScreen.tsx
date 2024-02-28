import React from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowLeft, IconFile } from "tabler-icons-react-native";
import { Prayers } from "../../constants";
import { TextBox, ViewBox } from "../../styles/theme";
import PrayersVideo from "./components/PrayersVideo";
import { PrayerKey } from "./videos";
import i18n from "../../services/translation";

export function PrayerInsideScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { top } = useSafeAreaInsets();
  const prayer = (route?.params?.prayer ?? "") as PrayerKey | "";
  const prayerText = {
    [Prayers.ablution]: {
      description: "",
      title: i18n.t('ablution'),
    },
    [Prayers.fajr]: {
      title: i18n.t('fajr-prayer'),
      description: i18n.t("2-rak'ats"),
    },
    [Prayers.dhuhr]: {
      title: i18n.t('dhuhr-prayer'),
      description: i18n.t("4-rak'ats"),
    },
    [Prayers.asr]: {
      title: i18n.t('asr-prayer'),
      description: i18n.t("4-rak'ats"),
    },
    [Prayers.maghrib]: {
      title: i18n.t('maghrib-prayer'),
      description: i18n.t("3-rak'ats"),
    },
    [Prayers.isha]: {
      title: i18n.t('isha-prayer'),
      description: i18n.t("4-rak'ats"),
    },
  };

  const onPressLearn = () => {
    navigation?.navigate("PrayerInsideLearn");
  };


  if (!prayer) {
    return <></>;
  }

  return (
    <ViewBox flex={1} style={{ paddingTop: top }}>
      <ViewBox height={50} justifyContent="center">
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{ height: "100%", paddingHorizontal: 20 }}
        >
          <IconArrowLeft size={28} />
        </TouchableOpacity>
      </ViewBox>
      <PrayersVideo prayer={prayer} />

      <ViewBox flexDirection="row" width="100%" pt="xl" px="20" pb="9xl">
        <ViewBox flex={1}>
          <TextBox variant="xlBold" color="mainText">
            {prayerText[prayer]?.title}
          </TextBox>
          <TextBox variant="xl" color="mainText">
            {prayerText[prayer]?.description}
          </TextBox>
        </ViewBox>

        {prayer !== Prayers.ablution && (
          <TouchableOpacity onPress={onPressLearn}>
            <ViewBox
              height={44}
              backgroundColor="lightGreen"
              flexDirection="row"
              alignItems="center"
              px="lg"
              borderRadius="40"
            >
              <IconFile />
              <TextBox ml="xs" variant="xlBold">
                {i18n.t('learn')}
              </TextBox>
            </ViewBox>
          </TouchableOpacity>
        )}
      </ViewBox>
    </ViewBox>
  );
}
