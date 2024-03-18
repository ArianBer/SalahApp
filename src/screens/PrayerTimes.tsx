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

function PrayerTimeBoxes({ prayerTimes, isOnline }: any) {
  if(!prayerTimes){
    return
  }

  const prayers = ["imsak", "fajr",  "sunrise", "dhuhr", "asr", "maghrib", "isha"];
  
  const renderPrayerTimeBox = (prayerName: string, prayerTime: string | Date) => (
    <PrayerTimeBox
      key={prayerName}
      prayerName={prayerName.toLowerCase()}
      prayerTime={prayerTime}
      iconPrayer={prayerName.toLowerCase()}
    />
  );

  if (isOnline) {
    const imsakTime = new Date(prayerTimes.Imsak);
    const fajrTime = new Date(imsakTime.getTime() + 30 * 60000);
    prayerTimes.Fajr = fajrTime;

    const order = ["Imsak", "Fajr", "Sunrise", "Dhuhr", "Maghrib", "Asr", "Isha"];

    const orderedPrayerTimes = {};
    order.forEach(key => {
      orderedPrayerTimes[key] = prayerTimes[key];
    });

    return Object.entries(orderedPrayerTimes).map(([prayerName, date]) => {
      const hours = String(date?.getHours()).padStart(2, '0');
      const minutes = String(date?.getMinutes()).padStart(2, '0');
      const dateEx = hours + ':' + minutes;
      
      return renderPrayerTimeBox(prayerName, dateEx);
    })
  } else {
    const now = new Date();
    const targetDate = new Date('2024-03-25');
    const increaseHour = now.getTime() >= targetDate.getTime();

    const addOneHour = (timeString: any) => {
      if(increaseHour) {
        const [hours, minutes] = timeString.split(":").map(Number);
        const totalSeconds = hours * 3600 + minutes * 60;
        const newTotalSeconds = totalSeconds + 3600;
        const newHours = Math.floor(newTotalSeconds / 3600) % 24;
        const newMinutes = Math.floor((newTotalSeconds % 3600) / 60);

        return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
      }

      return timeString;
    };

    const imsakTime = new Date(`1970-01-01T${prayerTimes.imsak}Z`);
    const fajrTime = new Date(imsakTime.getTime() + 30 * 60000);
    const formattedFajrTime = fajrTime.toISOString().substr(11, 8);

    prayerTimes.fajr = formattedFajrTime;

    const orderedPrayerTimes = {};
    prayers.forEach(key => {
      orderedPrayerTimes[key] = prayerTimes[key];
    });


    const filteredData = Object.keys(orderedPrayerTimes)
      .filter(key => prayers.includes(key))
      .reduce((obj, key) => {
        obj[key] = prayerTimes[key].split(":").slice(0, 2).join(":");
        return obj;
      }, {});

    return Object.entries(filteredData).map(([prayerName, prayerTime]) => {
      const hour = addOneHour(prayerTime);
      return renderPrayerTimeBox(prayerName, hour)
      }
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

  const { filterPrayerTimesPerDayMonth } = usePrayerTimes();
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
