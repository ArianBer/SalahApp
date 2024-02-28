import React, { useState } from "react";
import { ScrollView } from "react-native";
import PrayerBox from "../components/prayerBanner/PrayerBanner";
import { TextBox, ViewBox } from "../styles/theme";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import prayerData from "../data/times.json";
import PrayerTimeBox from "../components/prayerTimeBox/PrayerTimeBox";
import { DaysList } from "../components/daysList/DaysList";
import i18n from ".././services/translation";

function PrayerTimeBoxes({ prayerTimes }: any) {
  return (
    <>
      {Object.entries(prayerTimes).map(([prayerName, prayerTime]) => (
        <PrayerTimeBox
          key={prayerName}
          prayerName={prayerName}
          prayerTime={prayerTime}
          iconPrayer={prayerName}
        />
      ))}
    </>
  );
}

function PrayerTimes() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const date = new Date(String(selectedDate));
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const { filterPrayerTimesPerDayMonth } = usePrayerTimes(prayerData);
  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <TextBox
        fontSize={32}
        marginTop="xxxxxxxl"
        fontWeight="bold"
        marginHorizontal="xxxxxl"
        marginBottom="xl"
      >
        {i18n.t('prayer-calendar')}
      </TextBox>
      <PrayerBox isAbsolute={false} icon={null} customIcon />
      <ViewBox height="auto">
        <DaysList onDateSelection={(date: any) => setSelectedDate(date)} />
      </ViewBox>
      <ScrollView>
        <ViewBox marginTop="xxl">
          <PrayerTimeBoxes
            prayerTimes={filterPrayerTimesPerDayMonth(day, month)}
            ishaIconColor="#56791D"
          />
        </ViewBox>
      </ScrollView>
    </ViewBox>
  );
}

export default PrayerTimes;
