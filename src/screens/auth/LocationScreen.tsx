import React from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import LocationImage from "../../components/onboarding/LocationImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LanguageButton from "../../components/LanguageButton";
import Button from "../../components/Button";
import {selectCountry} from "../../redux/reducers/countryReducer";
import { useAppDispatch } from "../../redux/hooks";

const localLanguages = ['Kosove', 'Shqiperi', 'Maqedoni'];
const LocationScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const onChangeLocation = (language: string) => {
    dispatch(selectCountry.actions.changeCountry(language));
  };

  const renderLoactions = () => {
    return localLanguages.map((lng) => (
        <LanguageButton key={lng} language={lng} onPress={() => onChangeLocation(lng)} mt="4" />
      ));
  };

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
      <ViewBox width="100%" paddingHorizontal="37" mt="20">
        {renderLoactions()}
        <Button
          text="Zgjedh Lokacionin"
          width={190}
          mt="54"
        />
      </ViewBox>
    </ViewBox>
  );
};

export default LocationScreen;
