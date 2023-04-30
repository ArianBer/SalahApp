import React, { useEffect } from 'react';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { TextBox, ViewBox } from '../../styles/theme';
import prayerData from '../../data/times.json';
import { retrunIconPrayerTimes } from '../../services/returnIconsFromPrayerTime';

type PrayerBannerProps={
  isAbsolute: boolean,
  icon: any,
  customIcon: boolean
}
const PrayerBox = ({isAbsolute, icon, customIcon}: PrayerBannerProps) => {
  const { remainingTimeUntilNextPrayer, getPrayerTimesForToday, activePrayer, hoursRemaining, secondsRemaining } = usePrayerTimes(prayerData);

  useEffect(() => {
    const prayerTimesForToday = getPrayerTimesForToday();
    remainingTimeUntilNextPrayer(prayerTimesForToday);

    const intervalId = setInterval(() => {
      remainingTimeUntilNextPrayer(prayerTimesForToday);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [activePrayer]);

  return (
    <ViewBox left={0} right={0} flexDirection='row' height={128} backgroundColor='white' position={isAbsolute ? 'absolute' : 'relative'} style={{ bottom: isAbsolute ? 45 : 0 }}     marginHorizontal='xxl' borderRadius={14} alignItems='center' justifyContent='space-between' paddingRight='xxxxl'>
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
        {customIcon ? retrunIconPrayerTimes(activePrayer, 48, '#56791D') : icon}
      </ViewBox>
    </ViewBox>
  );
};

export default PrayerBox;
