import React, { ReactNode, useCallback } from "react";
import { Image, Pressable } from "react-native";
import { TextBox, ThemeType, ViewBox } from "../styles/theme";
import { BoxProps } from "@shopify/restyle";
import { LanguageType, languages } from "../services/translation/languges";

interface LanguageButtonProps extends BoxProps<ThemeType> {
  isSelected?: boolean;
  language: string;
  onPress: () => void;
  disabled?: boolean;
  languageIcon?: ReactNode;
}

export const flags: Record<LanguageType, any> = {
  al: require("../assets/images/flag-al.png"),
  de: require("../assets/images/de.png"),
  en: require("../assets/images/flag-england.png"),
  mk: require("../assets/images/flag-mk.png"),
  tr: require("../assets/images/flag-tr.png"),
  xk: require("../assets/images/flag-xk.png"),
};

const LanguageButton = ({
  isSelected,
  onPress,
  disabled,
  language,
  languageIcon,
  ...props
}: LanguageButtonProps) => {
  const renderFlag = useCallback(() => {
    if (languageIcon) return languageIcon;

    const languageObj = languages.find((x) => x.name === language);
    const source = languageObj?.value ? flags[languageObj?.value] : null;

    return source ? (
      <Image style={{ height: 24, width: 24 }} source={source} />
    ) : null;
  }, [language, languageIcon]);

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <ViewBox
        width="100%"
        height={53}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius="14"
        flexDirection="row"
        backgroundColor={isSelected ? "green" : "white"}
        {...props}
      >
        {renderFlag()}
        <TextBox
          ml="8"
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
