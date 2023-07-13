import React from "react";
import { IconArrowLeft, IconSettings } from "tabler-icons-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextBox, ViewBox } from "../../styles/theme";
import { PlayableItem } from "./PlayableItem";

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
        <TouchableOpacity
          onPress={onPressBack}
          hitSlop={{ top: 20, bottom: 10 }}
          style={{ paddingHorizontal: 30 }}
        >
          <IconSettings size={28} />
        </TouchableOpacity>
      </ViewBox>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 30 }}>
        <PlayableItem
          sound=""
          title="Duaja hyrese"
          transliteration="Subhanek’Allahumme, ve bihamdike, ve tebareke’smuke, ve teala xhedduke, ve la ilahe gajruke."
        />
        <PlayableItem
          sound=""
          title="Fatiha (më zë)"
          transliteration="Bismilahirr-Rrahmanirr-Rrahim Elhamdu lil-lahi Rabil-alemin Err-Rrahmanirr-Rrahim, Maliki jevmid-din ijjake na’budu ve ijjake neste’in ihdinas-siratal-mustekim, siratal-ledhine en’amte ’alejhim gajril-magdubi 'alejhim ve led-daalin. AMIN"
        />
      </ScrollView>
    </ViewBox>
  );
}
