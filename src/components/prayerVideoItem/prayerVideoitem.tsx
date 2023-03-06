import React from 'react';
import { IconPlayerPlay } from 'tabler-icons-react-native';
import { TextBox, ViewBox } from '../../styles/theme';

type PrayerVideoItemProps = {
  title: string;
  duration: string;
};

const PrayerVideoItem = ({ title, duration }: PrayerVideoItemProps) => {
  return (
    <ViewBox
      width="32%"
      flexDirection="column"
      height={135}
      borderWidth={1}
      borderColor="dargGreenWithOpacity"
      marginBottom="sm"
      borderRadius={10}
      backgroundColor="white"
      paddingTop="xxxxl"
      paddingBottom="xl"
      paddingLeft="lg"
    >
      <ViewBox
        width={30}
        height={30}
        backgroundColor="darkGreen"
        alignItems="center"
        justifyContent="center"
        borderRadius={50}
      >
        <IconPlayerPlay color="white" width={14} height={14} />
      </ViewBox>
      <TextBox fontSize={20} marginTop="xs" fontWeight="bold" color="mainText">
        {title}
      </TextBox>
      <TextBox fontSize={12} color="mainText">
        {duration}
      </TextBox>
    </ViewBox>
  );
};

export default PrayerVideoItem;
