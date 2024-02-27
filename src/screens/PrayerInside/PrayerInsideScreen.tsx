import React from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowLeft, IconFile } from "tabler-icons-react-native";
import { Prayers } from "../../constants";
import { TextBox, ViewBox } from "../../styles/theme";
import PrayersVideo from "./components/PrayersVideo";
import WuduVideo from "./components/WuduVideo";
import { PrayerKey } from "./videos";

const prayerText = {
  [Prayers.abdesi]: {
    description: "",
    title: "Abdesi",
  },
  [Prayers.sabahu]: {
    title: "Namazi i sabahut",
    description: "2 rekate",
  },
  [Prayers.dreka]: {
    title: "Namazi i drekes",
    description: "4 rekate",
  },
  [Prayers.ikindia]: {
    title: "Namazi i ikindise",
    description: "4 rekate",
  },
  [Prayers.akshami]: {
    title: "Namazi i akshamit",
    description: "3 rekate",
  },
  [Prayers.jacia]: {
    title: "Namazi i jacise",
    description: "4 rekate",
  },
};

export function PrayerInsideScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { top } = useSafeAreaInsets();
  const prayer = (route?.params?.prayer ?? "") as PrayerKey | "";

  const onPressLearn = () => {
    navigation?.navigate("PrayerInsideLearn");
  };

  console.log({ prayer });

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

        {prayer !== Prayers.abdesi && (
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
                Meso
              </TextBox>
            </ViewBox>
          </TouchableOpacity>
        )}
      </ViewBox>
    </ViewBox>
  );
}
