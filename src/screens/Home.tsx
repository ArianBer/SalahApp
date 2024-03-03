import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { IconCalendarMinus } from "tabler-icons-react-native";
import i18n from ".././services/translation";
import PrayerBox from "../components/prayerBanner/PrayerBanner";
import PrayerVideoItem from "../components/prayerVideoItem/prayerVideoitem";
import { ViewBox } from "../styles/theme";
import { HomeHeaderBackground } from "./components/HomeHeaderBackground";
import { useAppSelector } from "../redux/hooks";
import { Prayers } from "../constants";

const prayersArray = Object.values(Prayers).map((x) => ({
  title: x,
}));

function Home({ navigation }: { navigation: any }) {
  const { activePrayer } = useAppSelector((state) => state.home);
  const language = useAppSelector((state) => state.language);

  const handlePrayerPress = (prayer: string) => {
    navigation?.navigate("PrayerInside", { prayer });
  };

  useEffect(() => {
    if (!language) return;

    i18n.locale = language.languageSelected.value;
  }, [language]);

  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        scrollToOverflowEnabled={false}
      >
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
          marginTop="24"
          paddingHorizontal="24"
          maxWidth={430}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {prayersArray.map((prayer) => (
            <PrayerVideoItem
              activePrayer={activePrayer}
              key={prayer.title}
              title={prayer.title}
              onPress={() => handlePrayerPress(prayer.title)}
            />
          ))}
        </ViewBox>
      </ScrollView>
    </ViewBox>
  );
}

export default Home;
