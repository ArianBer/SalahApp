/* eslint-disable react/function-component-definition */
import React from "react";
import { IconBell } from "tabler-icons-react-native";
import { retrunIconPrayerTimes } from "../../services/returnIconsFromPrayerTime";
import { ViewBox, TextBox } from "../../styles/theme";
import i18n from "../../services/translation";
import useTranslation from "../../hooks/useTranslation";

interface Props {
  prayerName: string;
  prayerTime: any;
  iconPrayer: string;
}

const PrayerTimeBox: React.FC<Props> = ({
  prayerName,
  prayerTime,
  iconPrayer,
}) => {
  const dateObj = new Date(prayerTime);
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const t = useTranslation();

  return (
    <ViewBox width="100%" backgroundColor="white">
      <ViewBox
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        flexDirection="row"
        paddingHorizontal="xxxxl"
        paddingVertical="xl"
      >
        <ViewBox flexDirection="row" alignItems="center">
          {retrunIconPrayerTimes(iconPrayer, 30, "#56791D")}
          <TextBox fontWeight="700" fontSize={18} marginLeft="lg">
            {t(prayerName)}
          </TextBox>
        </ViewBox>
        <ViewBox flexDirection="row" alignItems="center">
          <TextBox fontSize={18} marginRight="md">
            {`${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}`}
          </TextBox>
          <IconBell />
        </ViewBox>
      </ViewBox>
    </ViewBox>
  );
};

export default PrayerTimeBox;
