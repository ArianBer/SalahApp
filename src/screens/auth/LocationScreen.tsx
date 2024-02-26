import React, { useState } from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import LocationImage from "../../components/onboarding/LocationImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LanguageButton, { flags } from "../../components/LanguageButton";
import { selectCountry } from "../../redux/reducers/countryReducer";
import { useAppDispatch } from "../../redux/hooks";
import { Image, Modal, Pressable, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import countriesData from "../../data/countriesData";
import { IconSquareRoundedX } from "tabler-icons-react-native";
import { useNavigation } from "@react-navigation/native";
import i18n from "../../services/translation";

const localLanguages = [
  { name: "Kosova", iconSource: flags.xk },
  { name: "Shqiperi", iconSource: flags.al },
  { name: "Maqedoni", iconSource: flags.mk },
];

const LocationScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<any>();

  const openModal = (country: any) => {
    setSelectedCountry(country);
    setModalVisible(true);
  };

  const citySelected = (city: any) => {
    const countrySelcted = countriesData.find(
      (country) => country.country === selectedCountry
    );
    const address = {
      country: selectedCountry,
      city: city,
      countryCode: countrySelcted?.countrycode,
      longitude: "",
      latitude: "",
    };

    dispatch(selectCountry.actions.changeCountry(address));
    setSelectedCountry(null);
    setModalVisible(false);
    navigation?.navigate("LocationSelected");
  };

  const request = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === "undetermined") {
      const response = await Permissions.askAsync(
        Permissions.LOCATION_FOREGROUND
      );

      if (!response.granted) {
        return;
      }
    }

    let { coords } = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });


      for (let item of response) {
        const address = {
          country: item.country ?? "",
          city: item.city ?? "",
          countryCode: item.isoCountryCode ?? "",
          longitude: longitude?.toString(),
          latitude: latitude?.toString(),
        };


        dispatch(selectCountry.actions.changeCountry(address))
        navigation?.navigate("LocationSelected")
      }
    }
  };

  const renderLoactions = () => {
    return localLanguages.map((item) => (
      <LanguageButton
        key={item.name}
        language={item.name}
        languageIcon={
          <Image style={{ height: 24, width: 24 }} source={item.iconSource} />
        }
        onPress={() => openModal(item.name)}
        mt="4"
      />
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
        {i18n.t('select-location')}
      </TextBox>
      <ViewBox width="100%" paddingHorizontal="37" mt="20">
        {renderLoactions()}
        <ViewBox mt="4">
          <Pressable onPress={request}>
            <ViewBox
              width="100%"
              height={53}
              justifyContent="center"
              alignItems="center"
              borderRadius="14"
              backgroundColor={"lightGreen"}
            >
              <TextBox
                color="blackRussian"
                variant="lg_medium"
              >
              {i18n.t('find-location')}
              </TextBox>
            </ViewBox>
          </Pressable>
        </ViewBox>
      </ViewBox>

      <ViewBox style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ViewBox style={styles.centeredView}>
            <ViewBox style={styles.modalView}>
              <Pressable
                style={styles.closeIcon}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <IconSquareRoundedX />
              </Pressable>
              {countriesData
                .find((country) => country.country === selectedCountry)
                ?.cities.map((city) => (
                  <Pressable
                    style={styles.itemStyle}
                    onPress={() => citySelected(city.name)}
                  >
                    <TextBox style={styles.textItem} key={city.name}>
                      {city.name}
                    </TextBox>
                  </Pressable>
                ))}
            </ViewBox>
          </ViewBox>
        </Modal>
      </ViewBox>
    </ViewBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginHorizontal: "10%",
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    paddingTop: 15,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  itemStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingVertical: 23,
    width: "100%",
    textAlign: "center",
  },
  textItem: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default LocationScreen;
