import { useIsFocused } from "@react-navigation/native";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import { ViewBox } from "../../../styles/theme";
import { PrayerKey, prayerVideos } from "../videos";
import PlayButton from "./PlayButton";

interface PrayersVideoProps {
  prayer: PrayerKey;
}

const PrayersVideo = ({ prayer }: PrayersVideoProps) => {
  const video = useRef<Video>(null);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const languageKey = useAppSelector(
    (state) => state.language.languageSelected
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      stopVideo();
    }
  }, [isFocused]);

  const onPlaybackStatusUpdate = (_status: AVPlaybackStatus) => {
    const status = _status as AVPlaybackStatusSuccess;

    if (!status?.isPlaying && !status?.positionMillis) {
      setShowPlayButton(true);
    } else {
      setShowPlayButton(false);
    }
  };

  const stopVideo = () => {
    video.current?.stopAsync();
  };

  const onPressPlay = () => {
    video.current?.playAsync();
  };

  const videoSource = useMemo(() => {
    const key = prayer === "ablution" ? prayer + languageKey.value : prayer;
    return prayerVideos[key];
  }, [prayer, languageKey]);

  return (
    <ViewBox flex={1}>
      <Video
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        ref={video}
        style={styles.video}
        source={videoSource}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
      />
      {showPlayButton && <PlayButton onPressPLay={onPressPlay} />}
    </ViewBox>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
});

export default PrayersVideo;
