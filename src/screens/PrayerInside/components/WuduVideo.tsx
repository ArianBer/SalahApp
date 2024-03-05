import { useFocusEffect } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Video, { TextTrackType } from "react-native-video";
import { ViewBox } from "../../../styles/theme";
import { prayerVideos } from "../videos";
import PlayButton from "./PlayButton";
import { Prayers } from "../../../constants";
import Abdesti from "../../../assets/videos/abdesti.mp4";

const textTracks = [
  {
    title: "Shqip",
    language: "al",
    type: TextTrackType.SRT,
    uri: "https://drive.google.com/file/d/1jyZXKvxnZTnYDUmoG7VLkcSaYpD1xg4w/view?usp=drive_link.srt",
    // "text/vtt"
    // uri: require("../../../assets/abdesti.srt"),
  },
];
const WuduVideo = () => {
  const video = useRef<Video>(null);
  const [isFocused, setIsFocused] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
        setIsVideoPlaying(false);
      };
    }, [])
  );

  const handlePlayVideoPress = () => {
    if (video.current) {
      setIsVideoPlaying(!isVideoPlaying);
    }
  };
  return (
    <ViewBox flex={1}>
      {/* {isFocused && ( */}
      <Video
        ref={video}
        paused={!isVideoPlaying}
        style={styles.video}
        source={Abdesti}
        textTracks={textTracks}
        selectedTextTrack={{
          type: "title",
          value: "al",
        }}
        resizeMode="contain"
        controls
      />
      {/* )} */}
      {!isVideoPlaying && <PlayButton onPressPLay={handlePlayVideoPress} />}
    </ViewBox>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
});

export default WuduVideo;
