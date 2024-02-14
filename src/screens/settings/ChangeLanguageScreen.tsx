import React from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { IconArrowLeft } from "tabler-icons-react-native";
import { useNavigation } from "@react-navigation/native";
import { languages } from "../../services/translation/languges";
import { useTranslation } from "react-i18next";
import LanguageButton from "../../components/LanguageButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLanguage } from "../../redux/reducers/authReducer";

const ChangeLanguageScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector((state) => state.auth.language);

  const onChangeLanguage = (lng: string) => {
    dispatch(setLanguage(lng));
  };

  const renderLanguages = () => {
    return languages.map((lng) => {
      const isSelected = selectedLanguage === lng.value;

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
            Ndrysho gjuhen
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
