import React from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import LocationImage from "../../components/onboarding/LocationImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "../../components/Button";
import { authSlice } from "../../redux/reducers/authReducer";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

const LocationScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const {country}  = useAppSelector((state) => state);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  
  const handleContinuePress = () => {
    dispatch(authSlice.actions.setIsOnBoarded(true));
  };

  return (
    <ViewBox
      bg="twilightBlue"
      flex={1}
      borderColor="darkGreen"
      alignItems={"center"}
      style={{ paddingTop: top + 80, paddingBottom: bottom }}
    >
      <ViewBox width={"100%"} alignItems={"center"}>
        <LocationImage />
      </ViewBox>
      <TextBox
        color="blackRussian"
        variant="md"
        mt="37"
        >
        Lokacioni i vendosur
        </TextBox>
      <TextBox variant="2xlBold" mt='2' color="blackRussian">
        {country.countrySelected.city}, {country.countrySelected.country}
      </TextBox>

      <Button
        onPress={handleContinuePress}
        text="Vazhdo"
        width={190}
        mt="140"
      />
      <Pressable onPress={() => navigation?.navigate("Location")}>
        <TextBox variant="md" mt='20' color="blackRussian" textDecorationLine="underline">
            Rizgjidh Lokacionin
        </TextBox>
      </Pressable>
    </ViewBox>
  );
};

export default LocationScreen;

