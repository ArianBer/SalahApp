import React from "react";
import { IconArrowLeft, IconSettings } from "tabler-icons-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextBox, ViewBox } from "../../styles/theme";
import { PlayableItem } from "./PlayableItem";
import { duate } from "../../data/duate";

export function PrayerInsideLearnScreen({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();

  const onPressBack = () => navigation?.goBack();

  return (
    <ViewBox style={{ paddingTop: top }} flex={1}>
      <ViewBox height={50} alignItems="center" width="100%" flexDirection="row">
        <TouchableOpacity
          onPress={onPressBack}
          hitSlop={{ top: 20, bottom: 10 }}
          style={{ paddingHorizontal: 30 }}
        >
          <IconArrowLeft size={28} />
        </TouchableOpacity>
        <ViewBox flex={1} justifyContent="center" alignItems="center">
          <TextBox variant="2xl" color="mainText">
            Meso Suret
          </TextBox>
        </ViewBox>
        <ViewBox style={{ marginHorizontal: 30, width: 28 }}></ViewBox>
      </ViewBox>

      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        {duate.map((item, index) => (
          <PlayableItem
            key={index}
            sound={item.sound}
            title={item.title}
            transliteration={item.reading}
            translation={item.translation}
          />
        ))}
      </ScrollView>
    </ViewBox>
  );
}
