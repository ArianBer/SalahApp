import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowLeft, IconFile } from "tabler-icons-react-native";
import { TextBox, ViewBox } from "../../styles/theme";

import SabahuVideo from "../../assets/videos/Sabahu.mp4";
import DrekaVideo from "../../assets/videos/Jacia.mp4";
import IkindiaVideo from "../../assets/videos/Jacia.mp4";
import AkshamiVideo from "../../assets/videos/Akshami.mp4";
import JaciaVideo from "../../assets/videos/Jacia.mp4";
import { Prayers } from "../../constants";
import { ControlStates } from "./constants";

type PrayerKey = keyof typeof Prayers;

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

const prayerVideos = {
  [Prayers.sabahu]: SabahuVideo,
  [Prayers.dreka]: DrekaVideo,
  [Prayers.ikindia]: IkindiaVideo,
  [Prayers.akshami]: AkshamiVideo,
  [Prayers.jacia]: JaciaVideo,
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
});

export function PrayerInsideScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { top } = useSafeAreaInsets();
  const video = useRef<Video>(null);
  const prayer = (route?.params?.prayer ?? "") as PrayerKey | "";
  const [controlsState, setControlsState] = useState(ControlStates.Hidden);
  const onPressBack = () => {
    navigation.goBack();
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
          onPress={onPressBack}
          style={{ height: "100%", paddingHorizontal: 20 }}
        >
          <IconArrowLeft size={28} />
        </TouchableOpacity>
      </ViewBox>
      <ViewBox flex={1}>
        <Video
          ref={video}
          style={styles.video}
          source={prayerVideos[prayer]}
          useNativeControls
          resizeMode={ResizeMode.COVER}
        />
        <ViewBox
          pointerEvents={
            controlsState === ControlStates.Visible ? "auto" : "none"
          }
          position="absolute"
          top="50%"
          left="50%"
        ></ViewBox>
      </ViewBox>
      <ViewBox flexDirection="row" width="100%" pt="xl" px="xxxl" pb="9xl">
        <ViewBox flex={1}>
          <TextBox variant="xlBold" color="mainText">
            {prayerText[prayer]?.title}
          </TextBox>
          <TextBox variant="xl" color="mainText">
            {prayerText[prayer]?.description}
          </TextBox>
        </ViewBox>
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
      </ViewBox>
    </ViewBox>
  );
}
