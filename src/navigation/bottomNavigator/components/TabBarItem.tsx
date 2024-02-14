import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  IconCalendarMinus,
  IconCompass,
  IconHome,
  IconSettings,
} from "tabler-icons-react-native";
import { TextBox, ViewBox } from "../../../styles/theme";

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
    HomeTab: "Ballina",
    Kibla: "Kibla",
    PrayerTimesTab: "Takvimi",
    SettingsTab: "Preferencat",
  };

  return texts[name];
};

export function TabBarItem({
  bottom,
  isFocused,
  name,
  onPress,
}: TabBarItemProps) {
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
      <TextBox mt="2" variant="sm-medium">
        {getText({ name })}
      </TextBox>
    </TouchableOpacity>
  );
}
