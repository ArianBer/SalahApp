import React, { ReactNode } from "react";
import { Pressable } from "react-native";
import { ViewBox } from "../../styles/theme";

interface SocialButtonProps {
  icon: ReactNode;
  onPress: () => void;
}

const SocialButton = ({ icon, onPress }: SocialButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <ViewBox
        height={78}
        width={78}
        borderRadius="14"
        justifyContent="center"
        alignItems="center"
        bg="lightGreen"
      >
        {icon}
      </ViewBox>
    </Pressable>
  );
};

export default SocialButton;
