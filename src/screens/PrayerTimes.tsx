import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import PrayerBox from "../components/prayerBanner/PrayerBanner";
import { TextBox, ViewBox } from "../styles/theme";
import { localLanguages, usePrayerTimes } from "../hooks/usePrayerTimes";
import prayerData from "../data/times.json";
import PrayerTimeBox from "../components/prayerTimeBox/PrayerTimeBox";
import { DaysList } from "../components/daysList/DaysList";
import { useAppSelector } from "../redux/hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTranslation from "../hooks/useTranslation";

function PrayerTimeBoxes({ prayerTimes, isOnline }: any) {
  if(!prayerTimes){
    return
  }

  const prayers = ["imsak", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
  
  const renderPrayerTimeBox = (prayerName: string, prayerTime: string | Date) => (
    <PrayerTimeBox
      key={prayerName}
      prayerName={prayerName.toLowerCase()}
      prayerTime={prayerTime}
      iconPrayer={prayerName.toLowerCase()}
    />
  );

  if (isOnline) {
    return Object.entries(prayerTimes).map(([prayerName, date]) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const dateEx = hours + ':' + minutes;
      
      return renderPrayerTimeBox(prayerName, dateEx);
    })
  } else {
    const filteredData = Object.keys(prayerTimes)
      .filter(key => prayers.includes(key))
      .reduce((obj, key) => {
        obj[key] = prayerTimes[key].split(":").slice(0, 2).join(":");
        return obj;
      }, {});

    return Object.entries(filteredData).map(([prayerName, prayerTime]) =>
      renderPrayerTimeBox(prayerName, prayerTime)
    );
  }
}


function PrayerTimes() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const date = new Date(String(selectedDate));
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const country = useAppSelector((state) => state.country);
  const [prayerTimes, setPrayerTime] = useState({});
  const { top } = useSafeAreaInsets();
  const t = useTranslation();

  const { filterPrayerTimesPerDayMonth } = usePrayerTimes(prayerData);
  const keysToInclude = ["Imsak", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

  const filterPrayerTimes = (
    prayerTimes: Record<string, string>
  ): Record<string, Date> => {
    return Object.keys(prayerTimes)
      .filter((key) => keysToInclude.includes(key))
      .reduce((obj: Record<string, Date>, key: string) => {
        const [hours, minutes] = prayerTimes[key].split(":");
        obj[key] = new Date();
        obj[key].setHours(Number(hours), Number(minutes), 0, 0);
        return obj;
      }, {});
  };

  const getPrayerTimesForToday = async (month: string, day: string) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${today.getFullYear()}?latitude=${
          country.countrySelected.latitude
        }&longitude=${country.countrySelected.longitude}&method=2`
      ).then((res) => res.json());

      setPrayerTime(filterPrayerTimes(response.data.timings));
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  useEffect(() => {
    getPrayerTimesForToday(month, day);
  }, [selectedDate]);

  return (
    <ViewBox
      flex={1}
      backgroundColor="mainBackground"
      style={{ paddingTop: top + 10 }}
    >
      <TextBox
        fontSize={32}
        fontWeight="bold"
        marginHorizontal="xxxxxl"
        marginBottom="xl"
      >
        {t("prayer-calendar")}
      </TextBox>
      <PrayerBox isAbsolute={false} icon={null} customIcon />
      <ViewBox height="auto">
        <DaysList onDateSelection={(date: any) => setSelectedDate(date)} />
      </ViewBox>
      <ScrollView>
        <ViewBox marginTop="xxl">
          <PrayerTimeBoxes
            prayerTimes={
              !localLanguages.includes(country.countrySelected.country)
                ? prayerTimes
                : filterPrayerTimesPerDayMonth(day, month)
            }
            isOnline={!localLanguages.includes(country.countrySelected.country)}
          />
        </ViewBox>
      </ScrollView>
    </ViewBox>
  );
}

export default PrayerTimes;
