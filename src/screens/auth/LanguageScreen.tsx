import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { IconArrowRight } from "tabler-icons-react-native";
import Button from "../../components/Button";
import LanguageButton from "../../components/LanguageButton";
import { useAppDispatch } from "../../redux/hooks";
import { languageSlice } from "../../redux/reducers/languageReducer";
import i18n from "../../services/translation";
import { LanguageProps, languages } from "../../services/translation/languges";
import { TextBox, ViewBox } from "../../styles/theme";

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageProps | null>(null);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const onChangeLanguage = (language: LanguageProps) => {
    setSelectedLanguage(language);
    dispatch(languageSlice.actions.changeLanguage(language));
    i18n.locale = language.value;
  };

  const renderLanguages = () => {
    return languages.map((lng) => {
      const isSelected = selectedLanguage === lng;

      return (
        <LanguageButton
          key={lng.value}
          onPress={() => onChangeLanguage(lng)}
          isSelected={isSelected}
          language={lng.name}
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
