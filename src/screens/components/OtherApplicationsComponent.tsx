import React from "react";
import { Linking, Platform } from "react-native";
import MILogo from "../../assets/svgs/MILogo";
import YoutubeLogo from "../../assets/svgs/YoutubeLogo";
import { LanguageType } from "../../services/translation/languges";
import { settingsData } from "../settings/settings-data";
import { SettingsRow } from "./SettingsRow";
import { SettingsRowsContainer } from "./SettingsRowsContainer";
import { useNavigation } from "@react-navigation/native";
import { isIos } from "../../utilts/isIos";
import { useAppSelector } from "../../redux/hooks";

const OtherApplicationsComponent = () => {
  const navigation = useNavigation<any>();
  const language = useAppSelector((state) => state.auth.language);
  const applications = Object.entries(settingsData[language].applications);
  const youtubeLinks = Object.entries(settingsData[language].youtube);

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
    <SettingsRowsContainer mt="25" title="Aplikacione te tjera">
      {renderApplication()}
      {renderYoutube()}
      <SettingsRow
        title="Tjera..."
        hideBottomLine
        onPress={onPressMoreApps}
        titleProps={{ variant: "lg_bold" }}
      />
    </SettingsRowsContainer>
  );
};

export default OtherApplicationsComponent;
