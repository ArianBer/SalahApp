import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { FadeIn } from "react-native-reanimated";
import { IconPlayerPause, IconPlayerPlay } from "tabler-icons-react-native";
import useTranslation from "../../hooks/useTranslation";
import i18n from "../../services/translation";
import { AnimatedBox, TextBox, ViewBox } from "../../styles/theme";

interface Props {
  title: string;
  sound: Audio.Sound;
  transliteration: string;
  translation?: string;
  onPressPlay: () => void;
  isAnotherSoundPlaying: boolean;
}

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export function PlayableItem({
  sound,
  translation,
  title,
  transliteration,
  isAnotherSoundPlaying,
  onPressPlay,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundDuration, setSoundDuration] = useState<number | null>(null);
  const [playbackPosition, setPlaybackPosition] = useState<number | null>(null);
  const t = useTranslation();

  useEffect(() => {
    calculateSoundDuration();
    listenForStatusUpdate();
  }, [sound]);

  const listenForStatusUpdate = () => {
    sound?.setOnPlaybackStatusUpdate((status) => {
      if (status?.["didJustFinish"]) {
        setIsPlaying(false);
      }
      setPlaybackPosition(status["positionMillis"]);
    });
  };

  const calculateSoundDuration = async () => {
    const status = await sound?.getStatusAsync();
    setSoundDuration(status["durationMillis"]);
  };

  useEffect(() => {
    if (isAnotherSoundPlaying) {
      pauseSound();
    }
  }, [isAnotherSoundPlaying]);

  const playSound = async () => {
    if (sound) {
      try {
        onPressPlay();

        await sound?.replayAsync();
        setIsPlaying(true);
      } catch (error) {
        console.log("Failed to play sound", error);
      }
    }
  };

  const pauseSound = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setIsPlaying(false);
      } catch (error) {
        console.log("Failed to stop sound", error);
      }
    }
  };

  return (
    <AnimatedBox
      entering={FadeIn.duration(200)}
      py="20"
      pl="20"
      pr="20"
      width="100%"
      borderBottomWidth={1}
      borderBottomColor={isPlaying ? "white" : "silver"}
      bg={isPlaying ? "white" : undefined}
    >
      <TextBox color="mainText" variant="md-bold">
        {title}
      </TextBox>
      <ViewBox mt="xxxl" width="100%" flexDirection="row" alignItems="center">
        <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
          <ViewBox
            height={46}
            width={46}
            borderRadius="23"
            backgroundColor="lightGreen"
            justifyContent="center"
            alignItems="center"
          >
            {isPlaying ? (
              <IconPlayerPause fill="black" radius={20} />
            ) : (
              <IconPlayerPlay fill="black" radius={20} />
            )}
          </ViewBox>
        </TouchableOpacity>

        <TextBox ml="16" variant="lg" color="mainText">
          {soundDuration !== null && formatTime(playbackPosition || 0) + " / "}
          {soundDuration !== null && formatTime(soundDuration)}
        </TextBox>

        {/*  //TODO: implement slider later
        <ViewBox flex={1} ml="xl" flexDirection="row" alignItems="center">
          <ViewBox
            position="absolute"
            height={14}
            width={14}
            zIndex={1}
            borderRadius="12"
            backgroundColor="darkGreen"
          />
          <ViewBox height={2} borderRadius="20" backgroundColor="darkGreen" />
          <ViewBox
            width="70%"
            height={2}
            borderRadius="20"
            backgroundColor="grey"
          />
        </ViewBox> */}
      </ViewBox>
      <TextBox mt="27" variant="md-medium" color="blackRussian">
        {transliteration}
      </TextBox>
      <TextBox mt="24" variant="md" color="blackRussian">
        <TextBox color="darkGreen" variant="md-bold">
          {i18n.t("translate")}
        </TextBox>
        {translation}
      </TextBox>
    </AnimatedBox>
  );
}
