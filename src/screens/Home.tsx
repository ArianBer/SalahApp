import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { IconCalendarMinus } from "tabler-icons-react-native";
import PrayerBox from "../components/prayerBanner/PrayerBanner";
import PrayerVideoItem from "../components/prayerVideoItem/prayerVideoitem";
import { ViewBox } from "../styles/theme";
import { HomeHeaderBackground } from "./components/HomeHeaderBackground";
import { useAppSelector } from "../redux/hooks";
import { Prayers } from "../constants";

const prayersArray = Object.values(Prayers).map((x) => ({
  title: x,
  duration: "4:32",
}));

function Home({ navigation }: { navigation: any }) {
  const { activePrayer } = useAppSelector((state) => state.home);
  const handlePrayerPress = (prayer: string) => {
    navigation?.navigate("PrayerInside", { prayer });
  };

  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <ScrollView>
        <HomeHeaderBackground>
          <PrayerBox
            isAbsolute
            icon={<IconCalendarMinus size={45} />}
            customIcon={false}
          />
        </HomeHeaderBackground>

        <ViewBox
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          marginVertical="54"
          paddingHorizontal="24"
          maxWidth={430}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {prayersArray.map((prayer) => (
            <PrayerVideoItem
              activePrayer={activePrayer}
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
