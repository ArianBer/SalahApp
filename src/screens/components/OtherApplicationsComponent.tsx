import React from "react";
import { Linking } from "react-native";
import YoutubeLogo from "../../assets/svgs/YoutubeLogo";
import { settingsData } from "../settings/settings-data";
import { SettingsRow } from "./SettingsRow";
import { SettingsRowsContainer } from "./SettingsRowsContainer";
import { useNavigation } from "@react-navigation/native";
import { isIos } from "../../utilts/isIos";
import { useAppSelector } from "../../redux/hooks";
import i18n from "../../services/translation";

const OtherApplicationsComponent = () => {
  const navigation = useNavigation<any>();
  const { language } = useAppSelector((state) => state);
  const applications = Object.entries(
    settingsData[language?.languageSelected.value]?.applications
  );
  const youtubeLinks = Object.entries(
    settingsData[language?.languageSelected.value]?.youtube
  );

  const onPressLink = (url: string) => Linking.openURL(url);

  const onPressMoreApps = () => {
    navigation.navigate("OtherApplications");
  };

  const renderApplication = () => {
    const [title, data] = Object.values(applications)[0];
    const {
      url: { ios, android },
    } = data;

    return (
      <SettingsRow
        iconUrl={data.image}
        title={title}
        titleProps={{ variant: "lg_bold" }}
        onPress={() => onPressLink(isIos ? ios : android)}
      />
    );
  };

  const renderYoutube = () => {
    const [title, url] = Object.values(youtubeLinks)[0];

    return (
      <SettingsRow
        icon={<YoutubeLogo />}
        title={title}
        titleProps={{ variant: "lg_bold" }}
        onPress={() => onPressLink(url)}
      />
    );
  };

  return (
    <SettingsRowsContainer mt="25" title={i18n.t("other-applications")}>
      {renderApplication()}
      {renderYoutube()}
      <SettingsRow
        title={i18n.t("others") + ".."}
        hideBottomLine
        onPress={onPressMoreApps}
      />
    </SettingsRowsContainer>
  );
};

export default OtherApplicationsComponent;
