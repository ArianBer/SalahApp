import React from "react";
import { IconPlayerPlay } from "tabler-icons-react-native";
import { TouchableOpacity } from "react-native";
import { TextBox, ViewBox } from "../../styles/theme";

type PrayerVideoItemProps = {
  title: string;
  duration: string;
  onPress: () => void;
};

function PrayerVideoItem({ title, duration, onPress }: PrayerVideoItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: "32%" }}>
      <ViewBox
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
        <TextBox
          fontSize={20}
          marginTop="xs"
          fontWeight="bold"
          color="mainText"
        >
          {title}
        </TextBox>
        <TextBox fontSize={12} color="mainText">
          {duration}
        </TextBox>
      </ViewBox>
    </TouchableOpacity>
  );
}

export default PrayerVideoItem;
