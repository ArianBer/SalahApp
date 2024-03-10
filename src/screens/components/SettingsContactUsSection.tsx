import React from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import useTranslation from "../../hooks/useTranslation";
import SocialButton from "./SocialButton";
import { Linking } from "react-native";
import FacebookLargeIcon from "../../assets/svgs/FacebookLargeIcon";
import YoutubeLargIcon from "../../assets/svgs/YoutubeLargIcon";
import InstagramLargeIcon from "../../assets/svgs/InstagramLargeIcon";

const youtubeLink = "https://youtube.com/@PrayerHub_App?si=Gi9EhA7U-9B7hUB9";
const facebookLink =
  "https://www.facebook.com/profile.php?id=61556346492422&mibextid=ZbWKwL";
const instagramLink =
  "https://www.instagram.com/prayerhub_app?igsh=MXQ1ejI4YTV0NjRxOQ==";

const SettingsContactUsSection = () => {
  const t = useTranslation();

  const openLink = (link: string) => () => Linking.openURL(link);

  return (
    <ViewBox mt="25" alignItems="center">
      <TextBox variant="md" color="blackRussian">
        {t("follow-us")}
      </TextBox>
      <ViewBox flexDirection="row" alignItems="center" mt="12" columnGap="12">
        <SocialButton
          onPress={openLink(facebookLink)}
          icon={<FacebookLargeIcon />}
        />
        <SocialButton
          onPress={openLink(youtubeLink)}
          icon={<YoutubeLargIcon />}
        />
        <SocialButton
          onPress={openLink(instagramLink)}
          icon={<InstagramLargeIcon />}
        />
      </ViewBox>
    </ViewBox>
  );
};

export default SettingsContactUsSection;
