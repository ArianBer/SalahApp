import React from "react";
import { ScrollView, Share, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconShare } from "tabler-icons-react-native";
import useTranslation from "../../hooks/useTranslation";
import { useAppSelector } from "../../redux/hooks";
import { TextBox, ViewBox } from "../../styles/theme";
import OtherApplicationsComponent from "../components/OtherApplicationsComponent";
import { SettingsRow } from "../components/SettingsRow";
import { SettingsRowsContainer } from "../components/SettingsRowsContainer";
import WebLogo from "../../assets/svgs/WebLogo";
import LocationIcon from "../../assets/svgs/LocationIcon";
import SettingsContactUsSection from "../components/SettingsContactUsSection";

function SettingsScreen({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();
  const country = useAppSelector((state) => state.country);
  const t = useTranslation();

  const onPressShare = () => {
    Share.share(
      {
        message: `${t("share-app")}: APP_DOWNLOAD_LINK`,
        title: "Prayer Hub",
      },
      {}
    );
  };

  const onPressLanguage = () => navigation.navigate("ChangeLanguage");

  const onPressLocation = () =>
    navigation.navigate("ChangeLocation", { isFromSettings: true });

  const onPressNotifications = () => navigation.navigate("ChangeNotifications");

  return (
    <ViewBox
      style={{ paddingTop: top }}
      flex={1}
      backgroundColor="twilightBlue"
    >
      <ViewBox height={50} alignItems="center" width="100%" flexDirection="row">
        <ViewBox width={88} />
        <ViewBox flex={1} justifyContent="center" alignItems="center">
          <TextBox variant="2xl" color="mainText">
            {t("preferences")}
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
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 26, paddingBottom: 20 }}
      >
        <SettingsRowsContainer title={t("preferences")} mt="25">
          <SettingsRow
            onPress={onPressLanguage}
            icon={<WebLogo />}
            title={t("language")}
            subTitle={t("choose-language")}
          />
          <SettingsRow
            onPress={onPressLocation}
            icon={<LocationIcon />}
            title={t("select-location")}
            subTitle={
              country.countrySelected.city +
              ", " +
              country.countrySelected.country
            }
            hideBottomLine
          />
        </SettingsRowsContainer>
        <OtherApplicationsComponent />
        <SettingsContactUsSection />
      </ScrollView>
    </ViewBox>
  );
}

export default SettingsScreen;
