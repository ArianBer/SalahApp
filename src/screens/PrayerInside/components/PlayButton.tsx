import React from "react";
import { ViewBox } from "../../../styles/theme";
import { Pressable, StyleSheet } from "react-native";
import { IconPlayerPlay } from "tabler-icons-react-native";

interface PlayButtonProps {
  onPressPLay: () => void;
}
const PlayButton = ({ onPressPLay }: PlayButtonProps) => {
  return (
    <ViewBox
      position="absolute"
      top={0}
      left={0}
      right={0}
      opacity={0.8}
      width="100%"
      height="100%"
      bg="black"
    >
      <Pressable onPress={onPressPLay} style={styles.button}>
        <IconPlayerPlay size={80} fill="white" color="white" />
      </Pressable>
    </ViewBox>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default PlayButton;
