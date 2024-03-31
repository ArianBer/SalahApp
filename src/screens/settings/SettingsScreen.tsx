import React from "react";
import { ScrollView, Share, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconShare } from "tabler-icons-react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TextBox, ViewBox } from "../../styles/theme";
import OtherApplicationsComponent from "../components/OtherApplicationsComponent";
import { SettingsRow } from "../components/SettingsRow";
import { SettingsRowsContainer } from "../components/SettingsRowsContainer";
import WebLogo from "../../assets/svgs/WebLogo";
import LocationIcon from "../../assets/svgs/LocationIcon";
import SettingsContactUsSection from "../components/SettingsContactUsSection";
import { APP_DOWNLOAD_LINK } from "../../constants";
import { setShowChangeLocationScreens } from "../../redux/reducers/authReducer";
import { useTranslation } from "react-i18next";

function SettingsScreen({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { city, country } = useAppSelector(
    (state) => state.country.countrySelected
  );
  const { t } = useTranslation();

  const onPressShare = () => {
    Share.share(
      {
        message: `${t("share-app")}: ${APP_DOWNLOAD_LINK}`,
        title: "Prayer Hub",
      },
      {}
    );
  };

  const onPressLanguage = () => navigation.navigate("ChangeLanguage");

  const onPressChangeLocation = () => {
    dispatch(setShowChangeLocationScreens(true));
  };

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
            onPress={onPressChangeLocation}
            icon={<LocationIcon />}
            title={t("select-location")}
            subTitle={(city ? city + ", " : "") + country}
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
