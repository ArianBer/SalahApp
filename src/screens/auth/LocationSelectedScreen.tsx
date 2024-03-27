import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/Button";
import LocationImage from "../../components/onboarding/LocationImage";
import useTranslation from "../../hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  authSlice,
  setShowChangeLocationScreens,
} from "../../redux/reducers/authReducer";
import { TextBox, ViewBox } from "../../styles/theme";

const LocationSelectedScreen = ({ route }: StackScreenProps<any>) => {
  const { top, bottom } = useSafeAreaInsets();
  const country = useAppSelector((state) => state.country);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const isFromSettings = route.params?.isFromSettings;

  const handleContinuePress = () => {
    if (isFromSettings) {
      dispatch(setShowChangeLocationScreens(false));
      return;
    }
    dispatch(authSlice.actions.setIsOnBoarded(true));
  };

  const handleReselectLocationPress = () => {
    navigation?.navigate("Location");
  };

  return (
    <ViewBox
      bg="twilightBlue"
      flex={1}
      borderColor="darkGreen"
      alignItems={"center"}
      style={{
        paddingTop: top + 80,
        paddingBottom: isFromSettings ? 200 : bottom,
      }}
    >
      <ViewBox width={"100%"} alignItems={"center"}>
        <LocationImage />
      </ViewBox>
      <TextBox color="blackRussian" variant="md" mt="37">
        {t("location-set")}
      </TextBox>
      <TextBox variant="2xlBold" mt="2" color="blackRussian">
        {country.countrySelected.city
          ? country.countrySelected.city + ", "
          : ""}{" "}
        {country.countrySelected.country}
      </TextBox>

      <Button
        onPress={handleContinuePress}
        text={t("continue")}
        width={190}
        mt="140"
      />
      {!isFromSettings && (
        <Pressable onPress={handleReselectLocationPress}>
          <TextBox
            variant="md"
            mt="20"
            color="blackRussian"
            textDecorationLine="underline"
          >
            {t("reselect-the-location")}
          </TextBox>
        </Pressable>
      )}
    </ViewBox>
  );
};

export default LocationSelectedScreen;
