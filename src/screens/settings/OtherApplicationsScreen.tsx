import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Linking, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowLeft } from "tabler-icons-react-native";
import FacebookLogo from "../../assets/svgs/FacebookLogo";
import WebLogo from "../../assets/svgs/WebLogo";
import YoutubeLogo from "../../assets/svgs/YoutubeLogo";
import useTranslation from "../../hooks/useTranslation";
import { useAppSelector } from "../../redux/hooks";
import { TextBox, ViewBox } from "../../styles/theme";
import { isIos } from "../../utilts/isIos";
import { SettingsRow } from "../components/SettingsRow";
import { SettingsRowsContainer } from "../components/SettingsRowsContainer";
import { ApplicationDataType, settingsData } from "./settings-data";

const OtherApplicationsScreen = () => {
  const { top } = useSafeAreaInsets();
  const t = useTranslation();

  const navigation = useNavigation();
  const language = useAppSelector((state) => state.language);

  const { applications, facebook, web, youtube } =
    settingsData[language.languageSelected.value];

  const onPressBack = () => navigation.goBack();

  const onPressOpenLink = (url: string) => Linking.openURL(url);

  const onPressApplication = (data: ApplicationDataType) => {
    const { ios, android } = data.url;

    onPressOpenLink(isIos ? ios : android);
  };

  const renderApplications = () => {
    const applicationsArray = Object.entries(applications);
    const length = applicationsArray?.length;

    if (length < 1) {
      return null;
    }

    return (
      <SettingsRowsContainer mb="20" title={t("applications")}>
        {applicationsArray.map(([title, data], index) => (
          <SettingsRow
            key={index}
            iconUrl={data?.image}
            onPress={() => onPressApplication(data)}
            title={title}
            hideBottomLine={index === length - 1}
            titleProps={{ variant: "lg_bold" }}
          />
        ))}
      </SettingsRowsContainer>
    );
  };

  const renderFacebookLinks = () => {
    const facebookArray = Object.entries(facebook);
    const length = facebookArray.length;

    if (length < 1) {
      return null;
    }

    return (
      <SettingsRowsContainer mb="20" title="Facebook">
        {facebookArray.map(([title, url], index) => (
          <SettingsRow
            key={index}
            title={title}
            icon={<FacebookLogo />}
            onPress={() => onPressOpenLink(url)}
            hideBottomLine={index === length - 1}
            titleProps={{ variant: "lg_bold" }}
          />
        ))}
      </SettingsRowsContainer>
    );
  };

  const renderYoutubeLinks = () => {
    const youtubeArray = Object.entries(youtube);
    const length = youtubeArray.length;

    return (
      <SettingsRowsContainer mb="20" title="Youtube">
        {youtubeArray.map(([title, url], index) => (
          <SettingsRow
            key={index}
            title={title}
            icon={<YoutubeLogo />}
            onPress={() => onPressOpenLink(url)}
            hideBottomLine={index === length - 1}
            titleProps={{ variant: "lg_bold" }}
          />
        ))}
      </SettingsRowsContainer>
    );
  };

  const renderWebLinks = () => {
    const webArray = Object.entries(web);
    const length = webArray.length;

    return (
      <SettingsRowsContainer mb="20" title="Web">
        {webArray.map(([title, url], index) => (
          <SettingsRow
            key={index}
            title={title}
            icon={<WebLogo />}
            onPress={() => onPressOpenLink(url)}
            hideBottomLine={index === length - 1}
            titleProps={{ variant: "lg_bold" }}
          />
        ))}
      </SettingsRowsContainer>
    );
  };

  return (
    <ViewBox
      style={{ paddingTop: top }}
      flex={1}
      backgroundColor="twilightBlue"
    >
      <ViewBox
        mb="20"
        height={50}
        alignItems="center"
        width="100%"
        flexDirection="row"
      >
        <TouchableOpacity
          onPress={onPressBack}
          hitSlop={{ top: 20, bottom: 10 }}
          style={{ paddingHorizontal: 30 }}
        >
          <IconArrowLeft size={28} />
        </TouchableOpacity>
        <ViewBox flex={1} justifyContent="center" alignItems="center">
          <TextBox variant="2xl" color="mainText">
            {t("applications")}
          </TextBox>
        </ViewBox>
        <ViewBox style={{ paddingHorizontal: 30 }} />
      </ViewBox>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {renderApplications()}
        {renderYoutubeLinks()}
        {renderFacebookLinks()}
        {renderWebLinks()}
      </ScrollView>
    </ViewBox>
  );
};

export default OtherApplicationsScreen;
