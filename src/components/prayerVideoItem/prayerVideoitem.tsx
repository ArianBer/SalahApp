import { useTheme } from "@shopify/restyle";
import React from "react";
import { TouchableOpacity } from "react-native";
import { IconPlayerPlay } from "tabler-icons-react-native";
import { Prayers } from "../../constants";
import useTranslation from "../../hooks/useTranslation";
import { CurrentPrayerType } from "../../redux/reducers/homeReducer";
import { TextBox, ThemeType, ViewBox } from "../../styles/theme";

type PrayerVideoItemProps = {
  title: string;
  onPress: () => void;
  activePrayer: CurrentPrayerType;
};

const mapPrayerNames: Record<CurrentPrayerType, string> = {
  imsak: "",
  sunrise: Prayers.fajr,
  dhuhr: Prayers.dhuhr,
  asr: Prayers.asr,
  maghrib: Prayers.maghrib,
  isha: Prayers.isha,
};

function PrayerVideoItem({
  title,
  onPress,
  activePrayer,
}: PrayerVideoItemProps) {
  const { colors } = useTheme<ThemeType>();
  const isActive = mapPrayerNames[activePrayer] === title;
  const t = useTranslation();

  return (
    <TouchableOpacity onPress={onPress} style={{ width: "32%" }}>
      <ViewBox
        flexDirection="column"
        height={120}
        borderWidth={1}
        borderColor="dargGreenWithOpacity"
        marginBottom="sm"
        borderRadius="10"
        backgroundColor={isActive ? "darkGreen" : "white"}
        justifyContent="center"
        alignItems="flex-start"
        columnGap="12"
        paddingLeft="14"
      >
        <ViewBox
          width={30}
          height={30}
          backgroundColor={isActive ? "white" : "darkGreen"}
          alignItems="center"
          justifyContent="center"
          borderRadius="50"
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
          marginTop="16"
          fontWeight="bold"
          color={isActive ? "white" : "mainText"}
          variant="2xlBold"
        >
          {t(title)}
        </TextBox>
      </ViewBox>
    </TouchableOpacity>
  );
}

export default PrayerVideoItem;
