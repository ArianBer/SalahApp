import React from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import { TouchableOpacity } from "react-native";
import { IconChevronRight } from "tabler-icons-react-native";
import { Colors } from "../../styles/Color";

interface SettingsRowProps {
  onPress?: () => void;
  title: string;
  subTitle?: string;
  hideBottomLine?: boolean;
}

export const SettingsRow = ({
  title,
  hideBottomLine,
  onPress,
  subTitle,
}: SettingsRowProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ViewBox
        width="100%"
        py="20"
        px="25"
        borderBottomWidth={hideBottomLine ? 0 : 1}
        borderColor="lightGrey"
        flexDirection="row"
        alignItems="center"
      >
        <ViewBox flex={1}>
          <TextBox variant="xlBold" color="black">
            {title}
          </TextBox>
          <TextBox variant="md" color="blackRussian">
            {subTitle}
          </TextBox>
        </ViewBox>
        <IconChevronRight color={Colors.darkGreen} />
      </ViewBox>
    </TouchableOpacity>
  );
};
