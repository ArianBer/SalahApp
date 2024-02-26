import React, { ReactNode } from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import { Image, TouchableOpacity } from "react-native";
import { IconChevronRight } from "tabler-icons-react-native";
import { Colors } from "../../styles/Color";

interface SettingsRowProps {
  onPress?: () => void;
  title: string;
  subTitle?: string;
  hideBottomLine?: boolean;
  icon?: ReactNode;
  iconUrl?: string;
}

export const SettingsRow = ({
  title,
  hideBottomLine,
  onPress,
  subTitle,
  icon,
  iconUrl,
}: SettingsRowProps) => {
  const hasLogo = Boolean(iconUrl || icon);

  const renderIcon = () => {
    if (iconUrl) {
      return (
        <Image
          source={{ uri: iconUrl }}
          style={{ height: "100%", width: "100%" }}
        />
      );
    }

    if (icon) {
      return icon;
    }

    return null;
  };

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
        {hasLogo && (
          <ViewBox
            height={40}
            borderRadius="20"
            width={40}
            justifyContent="center"
            alignItems="center"
            mr="20"
            bg="twilightBlue"
          >
            {renderIcon()}
          </ViewBox>
        )}
        <ViewBox flex={1}>
          <TextBox variant="xlBold" color="black">
            {title}
          </TextBox>
          {subTitle ? (
            <TextBox variant="md" color="blackRussian">
              {subTitle}
            </TextBox>
          ) : null}
        </ViewBox>
        <IconChevronRight color={Colors.darkGreen} />
      </ViewBox>
    </TouchableOpacity>
  );
};
