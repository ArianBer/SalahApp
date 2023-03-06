import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { IconCalendarMinus } from 'tabler-icons-react-native';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { TextBox, ViewBox } from '../../styles/theme';
import prayerData from '../../data/times.json';

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: '100%',
  },
});

const PrayerBox = () => {
  const { remainingTimeUntilNextPrayer, getPrayerTimesForToday, activePrayer, hoursRemaining, secondsRemaining } = usePrayerTimes(prayerData);

  useEffect(() => {
    const prayerTimesForToday = getPrayerTimesForToday();
    remainingTimeUntilNextPrayer(prayerTimesForToday);

    const intervalId = setInterval(() => {
      remainingTimeUntilNextPrayer(prayerTimesForToday);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [prayerData]);

  return (
    <ViewBox height={380} width='100%'>
      <ImageBackground source={require('../../assets/images/prayerBackground.png')} style={styles.banner} borderRadius={21}>
        <ViewBox left={0} right={0} flexDirection='row' height={128} backgroundColor='white' position='absolute' bottom={45} marginHorizontal='xxl' borderRadius={14} alignItems='center' justifyContent='space-between' paddingRight='xxxxl'>
          <ViewBox flexDirection='column'>
            <ViewBox flexDirection='row' alignItems='flex-start'>
              <TextBox
                paddingLeft="xxxxxl"
                fontSize={48}
                fontWeight="bold"
                color="mainText"
                lineHeight={58}
              >
                {hoursRemaining}
              </TextBox>
              <TextBox fontSize={32} color="darkGreen" fontWeight="900" paddingLeft='sm'>
                {secondsRemaining}
              </TextBox>
            </ViewBox>
            <TextBox paddingLeft='xxxxxl' fontSize={16} fontWeight='400' lineHeight={15}>
              Deri në {activePrayer}
            </TextBox>
          </ViewBox>
          <ViewBox>
            <IconCalendarMinus size={45} />
          </ViewBox>
        </ViewBox>
      </ImageBackground>
    </ViewBox>
  );
};

export default PrayerBox;
