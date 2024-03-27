import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { Colors } from "../styles/Color";
import { AnimatedBox } from "../styles/theme";

const FullScreenLoader = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return (
    <AnimatedBox
      flex={1}
      justifyContent="center"
      alignItems="center"
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={style}
    >
      <ActivityIndicator size="large" color={Colors.darkGreen} />
    </AnimatedBox>
  );
};

export default FullScreenLoader;
