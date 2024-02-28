import React, { ReactNode, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  IconCalendarMinus,
  IconCompass,
  IconHome,
  IconSettings,
} from "tabler-icons-react-native";
import { TextBox, ViewBox } from "../../../styles/theme";
import i18n from "../../../services/translation";

export type BottomTabKeys =
  | "HomeTab"
  | "PrayerTimesTab"
  | "Kibla"
  | "SettingsTab";

type TabBarItemProps = {
  name: BottomTabKeys;
  isFocused: boolean;
  onPress: () => void;
  bottom: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const getIcon = ({ name }: { name: BottomTabKeys }) => {
  const icons: Record<BottomTabKeys, ReactNode> = {
    HomeTab: <IconHome />,
    Kibla: <IconCompass />,
    PrayerTimesTab: <IconCalendarMinus />,
    SettingsTab: <IconSettings />,
  };

  return icons[name];
};

const getText = ({ name }: { name: BottomTabKeys }) => {
  const texts: Record<BottomTabKeys, string> = {
    HomeTab: i18n.t("home"),
    Kibla: i18n.t("qibla"),
    PrayerTimesTab: i18n.t("prayer-calendar"),
    SettingsTab: i18n.t("preferences"),
  };

  return texts[name];
};

export function TabBarItem({
  bottom,
  isFocused,
  name,
  onPress,
}: TabBarItemProps) {
  const [text, setText] = useState(getText({ name }));
  i18n.onChange(() => {
    setText(getText({ name }));
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { marginBottom: bottom }]}
    >
      <ViewBox
        width={58}
        height={34}
        backgroundColor={isFocused ? "lightGreen" : "white"}
        borderRadius="37"
        justifyContent="center"
        alignItems="center"
      >
        {getIcon({ name })}
      </ViewBox>
      <TextBox mt="2" variant="sm-medium" textAlign="center">
        {text}
      </TextBox>
    </TouchableOpacity>
  );
}
