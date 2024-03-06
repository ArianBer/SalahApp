import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Linking } from "react-native";
import LinkLogo from "../../assets/svgs/LinkLogo";
import useTranslation from "../../hooks/useTranslation";
import { useAppSelector } from "../../redux/hooks";
import { LanguageType } from "../../services/translation/languges";
import { settingsData } from "../settings/settings-data";
import { SettingsRow } from "./SettingsRow";
import { SettingsRowsContainer } from "./SettingsRowsContainer";

const OtherApplicationsComponent = () => {
  const navigation = useNavigation<any>();
  const language = useAppSelector((state) => state.language);
  const t = useTranslation();

  const webLinks = Object.entries(
    settingsData[language?.languageSelected.value as LanguageType]?.web
  );

  const onPressLink = (url: string) => Linking.openURL(url);

  const onPressMoreApps = () => {
    navigation.navigate("OtherApplications");
  };

  const renderLinks = () => {
    const [title1, url1] = Object.values(webLinks)[0];
    const [title2, url2] = Object.values(webLinks)[1];

    return (
      <>
        <SettingsRow
          icon={<LinkLogo />}
          title={title1}
          titleProps={{ variant: "lg_bold" }}
          onPress={() => onPressLink(url1)}
        />
        <SettingsRow
          icon={<LinkLogo />}
          title={title2}
          titleProps={{ variant: "lg_bold" }}
          onPress={() => onPressLink(url2)}
        />
      </>
    );
  };

  return (
    <SettingsRowsContainer mt="25" title={t("other-applications")}>
      {renderLinks()}
      <SettingsRow
        title={t("others") + ".."}
        hideBottomLine
        hideLogo
        onPress={onPressMoreApps}
      />
    </SettingsRowsContainer>
  );
};

export default OtherApplicationsComponent;
