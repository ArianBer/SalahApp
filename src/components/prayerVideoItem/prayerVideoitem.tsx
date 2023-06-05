import React from "react";
import { IconPlayerPlay } from "tabler-icons-react-native";
import { Dimensions, TouchableOpacity } from "react-native";
import { useTheme } from "@shopify/restyle";
import { TextBox, ThemeType, ViewBox } from "../../styles/theme";
import { CurrentPrayerType } from "../../redux/reducers/homeReducer";
import { Prayers } from "../../screens/Home";

type PrayerVideoItemProps = {
  title: string;
  duration: string;
  onPress: () => void;
  activePrayer: CurrentPrayerType;
};

const mapPrayerNames: Record<CurrentPrayerType, string> = {
  imsak: Prayers.sabahu,
  sunrise: Prayers.sabahu,
  dhuhr: Prayers.dreka,
  asr: Prayers.ikindia,
  maghrib: Prayers.akshami,
  isha: Prayers.jacia,
};

function PrayerVideoItem({
  title,
  duration,
  onPress,
  activePrayer,
}: PrayerVideoItemProps) {
  const { colors } = useTheme<ThemeType>();
  const isActive = mapPrayerNames[activePrayer] === title;

  return (
    <TouchableOpacity onPress={onPress} style={{ width: "32%" }}>
      <ViewBox
        flexDirection="column"
        height={135}
        borderWidth={1}
        borderColor="dargGreenWithOpacity"
        marginBottom="sm"
        borderRadius={10}
        backgroundColor={isActive ? "darkGreen" : "white"}
        paddingTop="xxxxl"
        paddingBottom="xl"
        paddingLeft="lg"
      >
        <ViewBox
          width={30}
          height={30}
          backgroundColor={isActive ? "white" : "darkGreen"}
          alignItems="center"
          justifyContent="center"
          borderRadius={50}
        >
          {isActive ? (
            <IconPlayerPlay
              fill={colors.darkGreen}
              color={colors.darkGreen}
              width={14}
              height={14}
            />
          ) : (
            <IconPlayerPlay fill="white" color="white" width={14} height={14} />
          )}
        </ViewBox>
        <TextBox
          fontSize={20}
          marginTop="xs"
          fontWeight="bold"
          color={isActive ? "white" : "mainText"}
        >
          {title}
        </TextBox>
        <TextBox fontSize={12} color={isActive ? "white" : "mainText"}>
          {duration}
        </TextBox>
      </ViewBox>
    </TouchableOpacity>
  );
}

export default PrayerVideoItem;
