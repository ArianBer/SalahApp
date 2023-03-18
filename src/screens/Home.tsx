import React from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import  PrayerBox  from "../components/prayerBanner/PrayerBanner";
import PrayerVideoItem from "../components/prayerVideoItem/prayerVideoitem";
import { ViewBox } from "../styles/theme";
import { IconCalendarMinus } from "tabler-icons-react-native";

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: '100%',
  },
});

function Home() {
  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <ScrollView>
        <ViewBox height={380} width='100%'>
          <ImageBackground source={require('../assets/images/prayerBackground.png')} style={styles.banner} borderRadius={21}>
            <PrayerBox isAbsolute={true} icon={<IconCalendarMinus size={45} />} customIcon={false}/>
          </ImageBackground>
        </ViewBox>
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
