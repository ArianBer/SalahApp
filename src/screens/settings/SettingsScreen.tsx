import React from "react";
import { ScrollView, Share, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowLeft, IconShare, IconTable } from "tabler-icons-react-native";
import MILogo from "../../assets/svgs/MILogo";
import { TextBox, ViewBox } from "../../styles/theme";
import { SettingsRow } from "../components/SettingsRow";
import { SettingsRowsContainer } from "../components/SettingsRowsContainer";
import OtherApplicationsComponent from "../components/OtherApplicationsComponent";
import i18n from "../../services/translation";
import { useAppSelector } from "../../redux/hooks";

function SettingsScreen({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();
  const {country}  = useAppSelector((state) => state);

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
            {i18n.t("preferences")}
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
        <SettingsRowsContainer title={i18n.t("preferences")} mt="25">
          <SettingsRow
            onPress={onPressLanguage}
            icon={<MILogo />}
            title={i18n.t("language")}
            subTitle={i18n.t("choose-language")}
          />
          <SettingsRow
            onPress={onPressLocation}
            icon={<MILogo />}
            title={i18n.t("select-location")}
            subTitle={country.countrySelected.city + ', ' + country.countrySelected.country}
          />
          <SettingsRow
            onPress={onPressNotifications}
            icon={<MILogo />}
            title={i18n.t("notifications")}
            subTitle={i18n.t("edit")}
            hideBottomLine
          />
        </SettingsRowsContainer>
        <OtherApplicationsComponent />
      </ScrollView>
    </ViewBox>
  );
}

export default SettingsScreen;
