import React from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { IconCalendarMinus } from "tabler-icons-react-native";
import { NavigationProp } from "@react-navigation/native";
import PrayerBox from "../components/prayerBanner/PrayerBanner";
import PrayerVideoItem from "../components/prayerVideoItem/prayerVideoitem";
import { ViewBox } from "../styles/theme";

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: "100%",
  },
});

export const Prayers = {
  abdesi: "Abdesi",
  sabahu: "Sabahu",
  dreka: "Dreka",
  ikindia: "Ikindia",
  akshami: "Akshami",
  jacia: "Jacia",
};

const prayersArray = Object.values(Prayers).map((x) => ({
  title: x,
  duration: "4:32",
}));

function Home({ navigation }: { navigation: any }) {
  const handlePrayerPress = (prayer: string) => {
    navigation?.navigate("PrayerInside", { prayer });
  };

  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <ScrollView>
        <ViewBox height={380} width="100%">
          <ImageBackground
            source={require("../assets/images/prayerBackground.png")}
            style={styles.banner}
            borderRadius={21}
          >
            <PrayerBox
              isAbsolute
              icon={<IconCalendarMinus size={45} />}
              customIcon={false}
            />
          </ImageBackground>
        </ViewBox>
        <ViewBox
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          marginVertical="xxxxxxl"
          marginHorizontal="lg"
        >
          {prayersArray.map((prayer) => (
            <PrayerVideoItem
              key={prayer.title}
              title={prayer.title}
              duration={prayer.duration}
              onPress={() => handlePrayerPress(prayer.title)}
            />
          ))}
        </ViewBox>
      </ScrollView>
    </ViewBox>
  );
}

export default Home;
