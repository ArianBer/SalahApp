import React from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Linking, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconArrowLeft } from "tabler-icons-react-native";
import { ApplicationDataType, settingsData } from "./settings-data";
import { SettingsRowsContainer } from "../components/SettingsRowsContainer";
import { SettingsRow } from "../components/SettingsRow";
import FacebookLogo from "../../assets/svgs/FacebookLogo";
import YoutubeLogo from "../../assets/svgs/YoutubeLogo";
import WebLogo from "../../assets/svgs/WebLogo";
import { isIos } from "../../utilts/isIos";
import { useAppSelector } from "../../redux/hooks";
import i18n from "../../services/translation";

const OtherApplicationsScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const {language} = useAppSelector((state) => state);

  const { applications, facebook, web, youtube } = settingsData[language.languageSelected.value];

  const onPressBack = () => navigation.goBack();

  const onPressOpenLink = (url: string) => Linking.openURL(url);

  const onPressApplication = (data: ApplicationDataType) => {
    const { ios, android } = data.url;

    onPressOpenLink(isIos ? ios : android);
  };

  const renderApplications = () => {
    const applicationsArray = Object.entries(applications);
    const length = applicationsArray.length;

    if (length < 1) {
      return null;
    }

    return (
      <SettingsRowsContainer mb="20" title={i18n.t("applications")}>
        {applicationsArray.map(([title, data], index) => (
          <SettingsRow
            key={index}
            iconUrl={data.image}
            onPress={() => onPressApplication(data)}
            title={title}
            hideBottomLine={index === length - 1}
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
            {i18n.t("applications")}
          </TextBox>
        </ViewBox>
        <ViewBox style={{ paddingHorizontal: 30 }} />
      </ViewBox>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 26 }}>
        {renderApplications()}
        {renderYoutubeLinks()}
        {renderFacebookLinks()}
        {renderWebLinks()}
      </ScrollView>
    </ViewBox>
  );
};

export default OtherApplicationsScreen;
