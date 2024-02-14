import React from "react";
import { ScrollView, Share, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowLeft, IconShare, IconTable } from "tabler-icons-react-native";
import MILogo from "../../assets/svgs/MILogo";
import { TextBox, ViewBox } from "../../styles/theme";
import { SettingsRow } from "../components/SettingsRow";
import { SettingsRowsContainer } from "../components/SettingsRowsContainer";
import OtherApplicationsComponent from "../components/OtherApplicationsComponent";

function SettingsScreen({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();

  const onPressBack = () => navigation?.goBack();

  const onPressShare = () => {
    Share.share(
      {
        message: "Shperndaje Aplikacionin SalahApp: https://www.google.com",
        title: "SalahApp",
      },
      {}
    );
  };

  const onPressLanguage = () => navigation.navigate("ChangeLanguage");

  const onPressLocation = () => navigation.navigate("ChangeLocation");

  const onPressNotifications = () => navigation.navigate("ChangeNotifications");

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
        <TouchableOpacity
          onPress={onPressShare}
          hitSlop={{ top: 20, bottom: 10 }}
          style={{ paddingHorizontal: 30 }}
        >
          <IconShare size={28} />
        </TouchableOpacity>
      </ViewBox>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 26 }}>
        <SettingsRowsContainer title="Preferencat" mt="25">
          <SettingsRow
            onPress={onPressLanguage}
            icon={<MILogo />}
            title="Gjuha"
            subTitle="Zgjedh gjuhen"
          />
          <SettingsRow
            onPress={onPressLocation}
            icon={<MILogo />}
            title="Zgjedh Lokacionin"
            subTitle="Prishtine, Kosove"
          />
          <SettingsRow
            onPress={onPressNotifications}
            icon={<MILogo />}
            title="Notifikacionet"
            subTitle="ndrysho"
            hideBottomLine
          />
        </SettingsRowsContainer>
        <OtherApplicationsComponent />
      </ScrollView>
    </ViewBox>
  );
}

export default SettingsScreen;
