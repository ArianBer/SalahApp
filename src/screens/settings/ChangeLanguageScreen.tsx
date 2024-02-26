import React from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { IconArrowLeft } from "tabler-icons-react-native";
import { useNavigation } from "@react-navigation/native";
import { languages } from "../../services/translation/languges";
import LanguageButton from "../../components/LanguageButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLanguage } from "../../redux/reducers/authReducer";
import i18n from "../../services/translation";
import { languageSlice } from "../../redux/reducers/languageReducer";

const ChangeLanguageScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {language}  = useAppSelector((state) => state);

  const onChangeLanguage = (lng: string) => {
    dispatch(setLanguage(lng));
    dispatch(languageSlice.actions.changeLanguage(lng));
    i18n.locale = lng;
  };

  const renderLanguages = () => {
    return languages.map((lng) => {
      const isSelected = language.languageSelected.value === lng.value;

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
            {i18n.t("edit-language")}
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
