import React, { useState } from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import LanguageButton from "../../components/LanguageButton";
import Button from "../../components/Button";
import { IconArrowRight } from "tabler-icons-react-native";
import { useNavigation } from "@react-navigation/native";

const languages = ["Albanian", "English", "Turkish", "German", "Macedonian"];

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigation = useNavigation<any>();

  const onChangeLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  const renderLanguages = () => {
    return languages.map((lng) => {
      const isSelected = selectedLanguage === lng;

      return (
        <LanguageButton
          key={lng}
          onPress={() => onChangeLanguage(lng)}
          isSelected={isSelected}
          language={lng}
          mt="8"
        />
      );
    });
  };

  const handleContinuePress = () => {
    navigation?.navigate("OnBoarding");
  };

  return (
    <ViewBox paddingTop="140" alignItems="center">
      <TextBox variant="2xlBold" color="blackRussian">
        Choose language
      </TextBox>
      <TextBox variant="md" color="blackRussian" mt="8">
        Choose language of the app
      </TextBox>
      <ViewBox mt="27" width="100%" paddingHorizontal="37">
        {renderLanguages()}
      </ViewBox>

      <Button
        onPress={handleContinuePress}
        disabled={!selectedLanguage}
        text="Continue"
        width={190}
        mt="54"
        icon={<IconArrowRight color="white" />}
      />
    </ViewBox>
  );
};

export default LanguageScreen;
