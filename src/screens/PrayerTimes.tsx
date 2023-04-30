import React, { useState } from 'react'
import PrayerBox from '../components/prayerBanner/PrayerBanner';
import { TextBox, ViewBox } from '../styles/theme';
import { ScrollView } from 'react-native';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import prayerData from '../data/times.json';
import PrayerTimeBox from '../components/prayerTimeBox/PrayerTimeBox';
import { DaysList } from '../components/daysList/DaysList';

const PrayerTimeBoxes = ({ prayerTimes }: any) => {
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
};

const PrayerTimes = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const date = new Date(String(selectedDate));
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const { filterPrayerTimes } = usePrayerTimes(prayerData);

  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <TextBox fontSize={32} marginTop='xxxxxxxl' fontWeight='bold' marginHorizontal='xxxxxl' marginBottom='xl'>Takvimi</TextBox>
      <PrayerBox isAbsolute={false} icon={null} customIcon={true}/>
      <ViewBox height='auto'>
        <DaysList onDateSelection={(date: any) => setSelectedDate(date)}/>
      </ViewBox>
      <ScrollView>
        <ViewBox marginTop='xxl' >
          <PrayerTimeBoxes
            prayerTimes={filterPrayerTimes(month, day)}
            ishaIconColor='#56791D'
          />
        </ViewBox>
      </ScrollView>
    </ViewBox>
  )
}

export default PrayerTimes;
