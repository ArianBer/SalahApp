import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { ViewBox } from "../../../styles/theme";
import { BottomTabKeys, TabBarItem } from "./TabBarItem";

export function BottomTabBar({ state, navigation, insets }: BottomTabBarProps) {
  const marginBottom = insets.bottom ? 15 : 0;
  const height = insets.bottom ? 100 : 90;

  return (
    <ViewBox height={height} flexDirection="row" backgroundColor="white">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabBarItem
            bottom={marginBottom}
            key={route.key}
            isFocused={isFocused}
            name={route.name as BottomTabKeys}
            onPress={onPress}
          />
        );
      })}
    </ViewBox>
  );
}
