import React from "react";
import { Pressable } from "react-native";
import { TextBox, ThemeType, ViewBox } from "../styles/theme";
import { BoxProps } from "@shopify/restyle";

interface LanguageButtonProps extends BoxProps<ThemeType> {
  isSelected?: boolean;
  language: string;
  onPress: () => void;
  disabled?: boolean;
}

const LanguageButton = ({
  isSelected,
  onPress,
  disabled,
  language,
  ...props
}: LanguageButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <ViewBox
        width="100%"
        height={53}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius="14"
        backgroundColor={isSelected ? "green" : "white"}
        {...props}
      >
        <TextBox
          color={isSelected ? "white" : "blackRussian"}
          variant={isSelected ? "lg_bold" : "lg_medium"}
        >
          {language}
        </TextBox>
      </ViewBox>
    </Pressable>
  );
};

export default LanguageButton;
