import React from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import LocationImage from "../../components/onboarding/LocationImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LanguageButton from "../../components/LanguageButton";

const LocationScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ViewBox
      bg="twilightBlue"
      flex={1}
      borderColor="darkGreen"
      alignItems={"center"}
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <ViewBox width={"100%"} alignItems={"center"} pt="20">
        <LocationImage />
      </ViewBox>
      <TextBox variant="2xlBold" mt="37" color="blackRussian">
        Zgjidh lokacionin
      </TextBox>
      <TextBox variant="md" color="blackRussian" mt="12">
        Choose language of the app
      </TextBox>
      <ViewBox width="100%" paddingHorizontal="37" mt="20">
        <LanguageButton language="Kosove" onPress={() => {}} mt="4" />
        <LanguageButton language="Shqiperi" onPress={() => {}} mt="4" />
        <LanguageButton language="Maqedoni" onPress={() => {}} mt="4" />
      </ViewBox>
    </ViewBox>
  );
};

export default LocationScreen;
