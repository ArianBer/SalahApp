import React from "react";
import { ScrollView } from "react-native";
import  PrayerBox  from "../components/prayerBanner/PrayerBanner";
import PrayerVideoItem from "../components/prayerVideoItem/prayerVideoitem";
import { ViewBox } from "../styles/theme";

function Home() {
  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <ScrollView>
        <PrayerBox/>
        <ViewBox flexDirection='row' flexWrap='wrap' justifyContent='space-between' marginVertical='xxxxxxl' marginHorizontal='lg'>
          <PrayerVideoItem title="Abdesi" duration="4:32" />
          <PrayerVideoItem title="Sabahu" duration="4:32" />
          <PrayerVideoItem title="Dreka" duration="4:32" />
          <PrayerVideoItem title="Ikindia" duration="4:32" />
          <PrayerVideoItem title="Akshami" duration="4:32" />
          <PrayerVideoItem title="Jacia" duration="4:32" />
        </ViewBox>
      </ScrollView>
    </ViewBox>
  );
}

export default Home;
