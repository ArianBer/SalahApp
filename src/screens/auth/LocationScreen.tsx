import React, { useState } from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import LocationImage from "../../components/onboarding/LocationImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LanguageButton from "../../components/LanguageButton";
import {selectCountry} from "../../redux/reducers/countryReducer";
import { useAppDispatch } from "../../redux/hooks";
import { Modal, Pressable, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import countriesData from "../../data/countriesData";
import { authSlice } from "../../redux/reducers/authReducer";

const localLanguages = ['Kosova', 'Shqiperi', 'Maqedoni'];
const LocationScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (country: any) => {
    setSelectedCountry(country);
    setModalVisible(true);
  };

  const closeModel = () => {
    setSelectedCountry(null);
    setModalVisible(false);
    dispatch(authSlice.actions.setIsOnBoarded(true));
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

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for (let item of response) {
        const address = {
          country: item.country,
          city: item.city,
          countryCode: item.isoCountryCode,
          longitude: longitude,
          latitude: latitude,
        }

        dispatch(selectCountry.actions.changeCountry(address))
        dispatch(authSlice.actions.setIsOnBoarded(true))
      }
    }
  };

  const renderLoactions = () => {
    return localLanguages.map((lng) => (
      <LanguageButton key={lng} language={lng} onPress={() => openModal(lng)} mt="4" />
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
        <ViewBox mt="4">
          <Pressable onPress={request} >
            <ViewBox
              width="100%"
              height={53}
              justifyContent="center"
              alignItems="center"
              borderRadius="14"
              backgroundColor={'lightGreen'}
            >
              <TextBox
                color="blackRussian"
                variant="lg_medium"
              >
                Gjej lokacionin
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
          }}>
          <ViewBox style={styles.centeredView}>
            <ViewBox style={styles.modalView}>
              {
                countriesData
                .find((country) => country.country === selectedCountry)?.cities.map((city) => (
                  <Pressable
                    style={styles.itemStyle}
                    onPress={() => closeModel()}>
                    <TextBox style={styles.textItem} key={city.name}>{city.name}</TextBox>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginHorizontal: '10%'
  },
  modalView: {
    backgroundColor: 'white',
    width:'100%',
    paddingTop: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemStyle: {
    borderBottomWidth: 1,
    borderBottomColor:'#D9D9D9',
    paddingVertical: 23,
    width: '100%',
    textAlign: 'center',
  },
  TextBoxStyle: {
    color: 'white',
    fontWeight: 'bold',
    TextBoxAlign: 'center',
  },
  modalTextBox: {
    marginBottom: 15,
    TextBoxAlign: 'center',
  },
  textItem: {
    fontSize: 18,
    fontWeight:'600',
    textAlign: 'center',
  }
});

export default LocationScreen;
