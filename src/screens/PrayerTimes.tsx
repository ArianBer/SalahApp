import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import PrayerBox from "../components/prayerBanner/PrayerBanner";
import { TextBox, ViewBox } from "../styles/theme";
import { localLanguages, usePrayerTimes } from "../hooks/usePrayerTimes";
import PrayerTimeBox from "../components/prayerTimeBox/PrayerTimeBox";
import { DaysList } from "../components/daysList/DaysList";
import { useAppSelector } from "../redux/hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTranslation from "../hooks/useTranslation";

const keysToInclude = [
  "Imsak",
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
];
const prayers = ["imsak", "fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

function PrayerTimeBoxes({ prayerTimes, isOnline }: any) {
  if (!prayerTimes) {
    return;
  }

  const renderPrayerTimeBox = (
    prayerName: string,
    prayerTime: string | Date
  ) => (
    <PrayerTimeBox
      key={prayerName}
      prayerName={prayerName.toLowerCase()}
      prayerTime={prayerTime}
      iconPrayer={prayerName.toLowerCase()}
    />
  );

  if (isOnline) {
    const orderedPrayerTimes = {};
    keysToInclude.forEach((key) => {
      orderedPrayerTimes[key] = prayerTimes[key];
    });

    return Object.entries(orderedPrayerTimes).map(([prayerName, date]) => {
      const hours = String(date?.getHours()).padStart(2, "0");
      const minutes = String(date?.getMinutes()).padStart(2, "0");
      const dateEx = hours + ":" + minutes;

      return renderPrayerTimeBox(prayerName, dateEx);
    });
  } else {
    const imsakTime = new Date(`1970-01-01T${prayerTimes.imsak}Z`);
    const fajrTime = new Date(imsakTime.getTime() + 30 * 60000);
    const formattedFajrTime = fajrTime.toISOString().substr(11, 8);

    prayerTimes.fajr = formattedFajrTime;

    const orderedPrayerTimes = {};
    prayers.forEach((key) => {
      orderedPrayerTimes[key] = prayerTimes[key];
    });

    const filteredData = Object.keys(orderedPrayerTimes)
      .filter((key) => prayers.includes(key))
      .reduce((obj, key) => {
        obj[key] = prayerTimes[key].split(":").slice(0, 2).join(":");
        return obj;
      }, {});

    return Object.entries(filteredData).map(([prayerName, prayerTime]) => {
      return renderPrayerTimeBox(prayerName, prayerTime);
    });
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
  const onlinePrayers = useAppSelector((state) => state.onlinePrayers);

  const { filterPrayerTimesPerDayMonth } = usePrayerTimes();

  const filterPrayerTimes = (
    prayerTimes: Record<string, string>
  ): Record<string, Date> => {
    return Object.keys(prayerTimes)
      .filter((key) => keysToInclude.includes(key))
      .reduce((obj: Record<string, Date>, key: string) => {
        const timeString = prayerTimes[key].split(" ")[0];
        const [hours, minutes] = timeString.split(":");
        obj[key] = new Date();
        obj[key].setHours(Number(hours), Number(minutes), 0, 0);
        return obj;
      }, {});
  };

  const getPrayerTimesForToday = async (month: number, day: string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const year = date.getFullYear();
    const todayDate = `${day} ${months[month - 1]} ${year}`;

    const todayEntry = onlinePrayers.prayerTimes[month]?.find(
      (entry) => entry.date.readable === todayDate
    );
    const specificTimings = todayEntry ? todayEntry.timings : null;
    setPrayerTime(filterPrayerTimes(specificTimings));
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
      <ViewBox marginTop="xxl" flex={1}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <PrayerTimeBoxes
            prayerTimes={
              !localLanguages.includes(country.countrySelected.country)
                ? prayerTimes
                : filterPrayerTimesPerDayMonth(day, month)
            }
            isOnline={!localLanguages.includes(country.countrySelected.country)}
          />
        </ScrollView>
      </ViewBox>
    </ViewBox>
  );
}

export default PrayerTimes;
