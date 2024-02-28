import React, { useRef, useState } from "react";
import { PrayerKey, prayerVideos } from "../videos";
import { ViewBox } from "../../../styles/theme";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import { StyleSheet } from "react-native";
import PlayButton from "./PlayButton";

interface PrayersVideoProps {
  prayer: PrayerKey;
}

const PrayersVideo = ({ prayer }: PrayersVideoProps) => {
  const video = useRef<Video>(null);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const onPlaybackStatusUpdate = (_status: AVPlaybackStatus) => {
    const status = _status as AVPlaybackStatusSuccess;

    if (!status?.isPlaying && !status?.positionMillis) {
      setShowPlayButton(true);
    } else {
      setShowPlayButton(false);
    }
  };

  const onPressPlay = () => {
    video.current?.playAsync();
  };

  return (
    <ViewBox flex={1}>
      <Video
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        ref={video}
        style={styles.video}
        source={prayerVideos[prayer]}
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
