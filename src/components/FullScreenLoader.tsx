import React from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "../styles/Color";
import { AnimatedBox } from "../styles/theme";
import { FadeIn, FadeOut } from "react-native-reanimated";

const FullScreenLoader = () => {
  return (
    <AnimatedBox flex={1} justifyContent="center" alignItems="center" entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
      <ActivityIndicator size="large" color={Colors.darkGreen} />
    </AnimatedBox>
  );
};

export default FullScreenLoader;
