import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowLeft, IconSquareRoundedX } from "tabler-icons-react-native";
import LanguageButton, { flags } from "../../components/LanguageButton";
import LocationImage from "../../components/onboarding/LocationImage";
import countriesData from "../../data/countriesData";
import { localLanguages } from "../../hooks/usePrayerTimes";
import useTranslation from "../../hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  changeCountry,
  selectCountry,
} from "../../redux/reducers/countryReducer";
import { TextBox, ViewBox } from "../../styles/theme";

const languages = [
  { name: "Kosovë", iconSource: flags.xk },
  { name: "Shqiperi", iconSource: flags.al },
  { name: "Maqedoni", iconSource: flags.mk },
];

const LocationScreen = ({ route }: StackScreenProps<any>) => {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const { top, bottom } = useSafeAreaInsets();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<any>();
  const country = useAppSelector((state) => state.country);

  const isFromSettings = route.params?.isFromSettings;
  const isLocalLocation =
    country.countrySelected.country?.length &&
    localLanguages.includes(country.countrySelected.country);

  const showOnlineLocation = isFromSettings ? !isLocalLocation : true;
  const showLocalLocation = isFromSettings ? isLocalLocation : true;

  const openModal = (country: any) => {
    setSelectedCountry(country);
    setModalVisible(true);
  };

  const handleKosovoLocationPress = () => {
    const selectedCountry = "Kosovë";
    const countrySelected = countriesData.find(
      (country) => country.country === selectedCountry
    );

    const address = {
      country: selectedCountry ?? "",
      city: "",
      countryCode: countrySelected?.countrycode ?? "",
      longitude: "",
      latitude: "",
    };

    dispatch(changeCountry(address));

    if (!isFromSettings) {
      navigation?.navigate("LocationSelected", { isFromSettings });
    } else {
      navigation.navigate("Setting");
    }
  };

  const handleLocalLocationCitySelected = (city: any) => {
    if (!selectCountry) return;

    const countrySelected = countriesData.find(
      (country) => country.country === selectedCountry
    );

    const address = {
      country: selectedCountry ?? "",
      city: city ?? "",
      countryCode: countrySelected?.countrycode ?? "",
      longitude: "",
      latitude: "",
    };

    dispatch(changeCountry(address));
    setModalVisible(false);

    if (!isFromSettings) {
      navigation?.navigate("LocationSelected", { isFromSettings });
    } else {
      navigation.navigate("Setting");
    }
  };

  const handleOnlineLocationRequest = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== Location.PermissionStatus.GRANTED) {
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.High,
      });

      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        const item = response ? response[0] : null;

        if (!item) {
          Alert.alert(t("locationNotFound"));
          return;
        }

        const address = {
          country: item.country ?? "",
          city: item.city ?? "",
          countryCode: item.isoCountryCode ?? "",
          longitude: longitude?.toString(),
          latitude: latitude?.toString(),
        };

        dispatch(selectCountry.actions.changeCountry(address));
        navigation?.navigate("LocationSelected", { isFromSettings });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderLocalLocations = () => {
    if (!showLocalLocation) return;

    return languages.map((item, index) => (
      <LanguageButton
        key={index}
        language={item.name}
        languageIcon={
          <Image style={{ height: 24, width: 24 }} source={item.iconSource} />
        }
        onPress={() => {
          if (item.name === "Kosovë") {
            handleKosovoLocationPress();
            return;
          }
          openModal(item.name);
        }}
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
      {isFromSettings ? (
        <ViewBox
          height={50}
          alignItems="center"
          width="100%"
          flexDirection="row"
        >
          <TouchableOpacity
            onPress={navigation.goBack}
            hitSlop={{ top: 20, bottom: 10 }}
            style={{ paddingHorizontal: 30 }}
          >
            <IconArrowLeft size={28} />
          </TouchableOpacity>
          <ViewBox flex={1} justifyContent="center" alignItems="center">
            <TextBox variant="2xl" color="mainText">
              {t("location")}
            </TextBox>
          </ViewBox>
          <ViewBox style={{ marginHorizontal: 30, width: 28 }} />
        </ViewBox>
      ) : (
        <ViewBox width={"100%"} alignItems={"center"} pt="20">
          <LocationImage />
        </ViewBox>
      )}
      <TextBox variant="2xlBold" mt="37" color="blackRussian">
        {t("select-location")}
      </TextBox>
      <ViewBox width="100%" paddingHorizontal="37" mt="20">
        {renderLocalLocations()}
        {showOnlineLocation && (
          <ViewBox mt="4">
            <Pressable onPress={handleOnlineLocationRequest}>
              <ViewBox
                width="100%"
                height={53}
                justifyContent="center"
                alignItems="center"
                borderRadius="14"
                backgroundColor={"lightGreen"}
              >
                <TextBox color="blackRussian" variant="lg_medium">
                  {t("find-location")}
                </TextBox>
              </ViewBox>
            </Pressable>
          </ViewBox>
        )}
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
                ?.cities.map((city, index) => (
                  <Pressable
                    key={city.name + index}
                    style={styles.itemStyle}
                    onPress={() => handleLocalLocationCitySelected(city.name)}
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
