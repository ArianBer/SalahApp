import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowLeft } from "tabler-icons-react-native";
import LanguageButton from "../../components/LanguageButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { languageSlice } from "../../redux/reducers/languageReducer";
import {
  LanguageObjType,
  languages,
} from "../../services/translation/languges";
import { TextBox, ViewBox } from "../../styles/theme";

const ChangeLanguageScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const language = useAppSelector((state) => state.language.languageSelected);

  const onChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const newLanguageObj = languages.find((x) => x.value === lng);
    if (!newLanguageObj) return;
    dispatch(languageSlice.actions.changeLanguage(newLanguageObj));
  };

  const renderLanguages = () => {
    return languages.map((lng) => {
      const isSelected = language.value === lng.value;

      return (
        <LanguageButton
          key={lng.value}
          onPress={() => onChangeLanguage(lng.value)}
          isSelected={isSelected}
          language={lng.name}
          mt="8"
        />
      );
    });
  };

  return (
    <ViewBox
      style={{ paddingTop: top }}
      flex={1}
      backgroundColor="twilightBlue"
    >
      <ViewBox height={50} alignItems="center" width="100%" flexDirection="row">
        <TouchableOpacity
          onPress={navigation.goBack}
          hitSlop={{ top: 20, bottom: 10 }}
          style={{ paddingHorizontal: 30 }}
        >
          <IconArrowLeft size={28} />
        </TouchableOpacity>
        <ViewBox flex={1} justifyContent="center" alignItems="center">
          <TextBox variant="2xl" color="mainText">
            {t("choose-language")}
          </TextBox>
        </ViewBox>
        <ViewBox style={{ marginHorizontal: 30, width: 28 }}></ViewBox>
      </ViewBox>
      <ViewBox mt="27" width="100%" paddingHorizontal="37">
        {renderLanguages()}
      </ViewBox>
    </ViewBox>
  );
};

export default ChangeLanguageScreen;
