import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CurrentPrayerType, homeSlice } from "../redux/reducers/homeReducer";
import { sendLocalNotification } from "../services/notifications/localNotification";
import { useOnlinePrayerTimes } from "./useOnlinePrayerTimes";
import prayerTime from "../data/times.json";
import useTranslation from "./useTranslation";

export const localLanguages = ["Kosova", "Shqiperi", "Maqedoni"];
const prayers = ["imsak", "fajr",  "sunrise", "dhuhr", "asr", "maghrib", "isha"];

export const usePrayerTimes = () => {
  const [activePrayer, setActivePrayer] = useState<CurrentPrayerType>("dhuhr");
  const [currentPrayer, setCurrentPrayer] =
    useState<CurrentPrayerType>("dhuhr");
  const [hoursRemaining, setHoursRemaining] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState("");
  const [now, setNow] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(now.getDate());
  const dispatch = useAppDispatch();
  const country = useAppSelector((state) => state.country);
  const notificationScheduled: Record<string, boolean> = {};
  const [increased, setIncreased] = useState(false);
  const [prayerTimesToday, setPrayerTimesToday] = useState(null);
  const t = useTranslation();

  if (!localLanguages.includes(country.countrySelected.country)) {
    const { activePrayers, secondsRemaining, hoursRemaining } =
      useOnlinePrayerTimes(country.countrySelected);

    return {
      getPrayerTimesForToday: () => ({}),
      remainingTimeUntilNextPrayer: () => {},
      filterPrayerTimesPerDayMonth: () => ({}),
      activePrayer: activePrayers,
      secondsRemaining: secondsRemaining,
      hoursRemaining: hoursRemaining,
    };
  }

  const schedulePrayerNotifications = () => {
    if(!prayerTimesToday){
      return
    }
    Object.entries(prayerTimesToday).forEach(([prayerName, prayerTime], index) => {
      const timeRemaining = new Date(prayerTime).getTime() - now.getTime();

      if (
        timeRemaining > 0 &&
        !notificationScheduled[prayerName] &&
        index === 0 &&
        prayerName !== 'imsak'
        && prayerName !== 'sunrise'
      ) {
        sendLocalNotification(t(prayerName), timeRemaining / 1000);
        notificationScheduled[prayerName] = true;
      }
    });
  };

  const extractPrayerTimes = (prayerTime: any, now: Date): Record<string, Date> => {
    const extractedTimes = Object.keys(prayerTime)
      .filter((key) => prayers.includes(key))
      .reduce((obj: Record<string, Date>, key: string) => {
        const [hours, minutes, seconds] = prayerTime[key].split(":");
        
        const date = new Date(
          now.getFullYear(),
          now.getMonth(),
          increased ? now.getDate() + 1 : now.getDate(),
          hours,
          minutes,
          seconds
      );
      
        obj[key] = date;
        return obj;
      }, {});
    
    return extractedTimes;
  };

  const remainingTimeUntilNextPrayer = () => {
    const now1 = new Date();
    if(prayerTimesToday){
      const remainingTimes = Object.entries(prayerTimesToday)
      .filter(([key, value]) => new Date(value).getTime() > now1.getTime())
      .sort((a, b) =>  new Date(a[1]).getTime() -  new Date(b[1]).getTime());

      if (remainingTimes?.length) {
        let index = prayers.indexOf(remainingTimes[0][0]);

        setCurrentPrayer(prayers[index - 1]);
        setActivePrayer(remainingTimes[0][0]);
        const timeRemaining = new Date(remainingTimes[0][1]).getTime() - now1.getTime();
        const hoursRemaining = Math.floor(timeRemaining / 3600000);
        const minutesRemaining = Math.floor((timeRemaining % 3600000) / 60000);
        const secondsRemaining = Math.floor((timeRemaining % 60000) / 1000);
        setSecondsRemaining(secondsRemaining.toString().padStart(2, "0"));
        setHoursRemaining(
          `${hoursRemaining.toString()}:${minutesRemaining
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
  };

  const getPrayerTimesForToday = (): Record<string, Date> => {
    if (prayerTimesToday) {
      return extractPrayerTimes(prayerTimesToday, now);
    }
    return {};
  };

  const filterPrayerTimesPerDayMonth = (day: any, month: any) => {
    const prayerTimesToday = prayerTime.find(
      (prayerTime) =>
        prayerTime.month === month &&
        prayerTime.day === day &&
        prayerTime.country === country.countrySelected.countryCode
    );

    return prayerTimesToday;
  };

  useEffect(() => {
    schedulePrayerNotifications();
  
    const setActivePrayer = (prayer) => {
      dispatch(homeSlice.actions.setActivePrayer(prayer));
    };

    if (activePrayer === "sunrise") {
      setActivePrayer("sunrise");
    } else if (activePrayer !== "dhuhr" && activePrayer === "imsak") {
      setActivePrayer("isha");
    } else if (activePrayer !== "dhuhr") {
      setActivePrayer(currentPrayer);
    } else {
      setActivePrayer("sunrises");
    }
  }, [activePrayer, currentDay, prayerTimesToday]);
  
  useEffect(() => {
    if(!prayerTimesToday){
      return;
    }

    const ishaTime = new Date(prayerTimesToday['isha']);

    if (now.getTime() > ishaTime.getTime() && !increased) {
      setCurrentDay(prev => prev + 1)
      setIncreased(true);
    }
  }, [now, prayerTimesToday]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      if(prayerTimesToday){
        remainingTimeUntilNextPrayer();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDay, country.countrySelected, activePrayer, prayerTimesToday]);

  useEffect(() => {
    const now = new Date();
    const prayerTimesToday = prayerTime.find(
      (prayerTime) =>
        prayerTime.month === String(now.getMonth() + 1) &&
        prayerTime.day === String(now.getDate()) &&
        prayerTime.country === country.countrySelected.countryCode
    );
    
    const addFajr = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${currentDay} ${prayerTimesToday['imsak']}`);
    addFajr.setMinutes(addFajr.getMinutes() + 30);
    const minutes = addFajr.getMinutes() % 60;
    const hours = addFajr.getHours() + Math.floor(addFajr.getMinutes() / 60);
    prayerTimesToday['fajr'] = String(`${hours}:${minutes}:00`)

    function addDefaultDate(prayerTimes) {
      const targetDate = new Date('2024-03-25');
      const increaseHour = now.getTime() >= targetDate.getTime();

      const updatedPrayerTimes = Object.entries(prayerTimes).map(([prayerName, prayerTime]) => {
        const currentTime = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${currentDay} ${prayerTime}`);
        const formattedTime = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')} ${(increaseHour ? currentTime.getHours() + 1 : currentTime.getHours()).toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
        return [prayerName, formattedTime];
      });
    
      const updatedPrayerTimesObject = Object.fromEntries(updatedPrayerTimes);
      return updatedPrayerTimesObject;
    }

    if(prayerTimesToday){
      setPrayerTimesToday(addDefaultDate(prayerTimesToday))
    }
  
  }, [country, prayerTime, currentDay]);
  

  return {
    getPrayerTimesForToday,
    remainingTimeUntilNextPrayer,
    filterPrayerTimesPerDayMonth,
    activePrayer,
    secondsRemaining,
    hoursRemaining,
    currentPrayer,
  };
};
