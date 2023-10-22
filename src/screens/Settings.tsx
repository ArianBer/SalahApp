import React from "react";
import { TextBox, ViewBox } from "../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native";
import { IconArrowLeft } from "tabler-icons-react-native";
import { SettingsRowsContainer } from "./components/SettingsRowsContainer";
import { SettingsRow } from "./components/SettingsRow";

function Settings({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();
  const onPressBack = () => navigation?.goBack();

  return (
    <ViewBox
      style={{ paddingTop: top }}
      flex={1}
      backgroundColor="twilightBlue"
    >
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
            Preferencat
          </TextBox>
        </ViewBox>
        <ViewBox style={{ marginHorizontal: 30, width: 28 }} />
      </ViewBox>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 26 }}>
        <SettingsRowsContainer title="Lokacioni" mt="25">
          <SettingsRow
            title="Zgjedh Lokacionin"
            subTitle="Prishtine, Kosove"
            hideBottomLine
          />
        </SettingsRowsContainer>

        <SettingsRowsContainer mt="25">
          <SettingsRow title="Gjuha" subTitle="Zgjedh gjuhen" />
          <SettingsRow
            title="Notifikacionet"
            subTitle="ndrysho"
            hideBottomLine
          />
        </SettingsRowsContainer>
        <SettingsRowsContainer mt="25">
          <SettingsRow
            title="Aplikacione te tjera"
            subTitle="Shiko"
            hideBottomLine
          />
        </SettingsRowsContainer>
      </ScrollView>
    </ViewBox>
  );
}

export default Settings;
