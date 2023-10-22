import { BoxProps, TextProps } from "@shopify/restyle";
import React, { ReactNode } from "react";
import { TextBox, ThemeType, ViewBox } from "../styles/theme";
import { Pressable } from "react-native";

interface ButtonProps extends BoxProps<ThemeType> {
  onPress?: () => void;
  text: string;
  icon?: ReactNode;
  disabled?: boolean;
  textProps?: TextProps<ThemeType>;
}

const Button = ({
  text,
  disabled,
  onPress,
  icon,
  textProps,
  ...props
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <ViewBox
        bg="green"
        borderRadius="14"
        height={50}
        justifyContent="center"
        alignItems="center"
        flexDirection={"row"}
        opacity={disabled ? 0.5 : 1}
        {...props}
      >
        <TextBox
          variant="md-bold"
          color="white"
          mr={!!icon ? "20" : undefined}
          {...textProps}
        >
          {text}
        </TextBox>
        {icon}
      </ViewBox>
    </Pressable>
  );
};

export default Button;
