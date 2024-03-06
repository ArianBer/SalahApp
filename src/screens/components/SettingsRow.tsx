import React, { ReactNode } from "react";
import { TextBox, ThemeType, ViewBox } from "../../styles/theme";
import { Image, TouchableOpacity } from "react-native";
import { IconChevronRight } from "tabler-icons-react-native";
import { Colors } from "../../styles/Color";
import { TextProps } from "@shopify/restyle";

interface SettingsRowProps {
  onPress?: () => void;
  title: string;
  titleProps?: TextProps<ThemeType>;
  subTitle?: string;
  hideBottomLine?: boolean;
  icon?: ReactNode;
  iconUrl?: string;
  hideLogo?: boolean;
}

export const SettingsRow = ({
  title,
  hideBottomLine,
  onPress,
  subTitle,
  icon,
  hideLogo,
  iconUrl,
  titleProps,
}: SettingsRowProps) => {
  const hasLogo = Boolean(iconUrl || icon);

  const renderIcon = () => {
    if (hideLogo) return null;

    return (
      <ViewBox
        p="6"
        bg="twilightBlue"
        borderRadius="12"
        height={40}
        width={40}
        justifyContent="center"
        alignItems="center"
      >
        {iconUrl ? (
          <Image
            source={{ uri: iconUrl }}
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          icon
        )}
      </ViewBox>
    );
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <ViewBox
        width="100%"
        p="20"
        borderBottomWidth={hideBottomLine ? 0 : 1}
        borderColor="lightGrey"
        flexDirection="row"
        alignItems="center"
      >
        {!hideLogo && (
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
          <TextBox variant="lg_bold" color="black" {...titleProps}>
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
