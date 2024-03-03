/* eslint-disable no-shadow */
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CurrentPrayerType, homeSlice } from "../redux/reducers/homeReducer";
import { sendLocalNotification } from "../services/notifications/localNotification";
import { registerForPushNotificationsAsync } from "../services/registerPushNotifications";
import { useOnlinePrayerTimes } from "./useOnlinePrayerTimes";

type PrayerTime = {
  country: string;
  month: string;
  day: string;
  imsak: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  created_at: string | null;
  updated_at: string | null;
};

export const usePrayerTimes = (prayerTimes: PrayerTime[]) => {
  const [activePrayer, setActivePrayer] = useState<CurrentPrayerType>("dhuhr");
  const [currentPrayer, setCurrentPrayer] =
    useState<CurrentPrayerType>("dhuhr");
  const [hoursRemaining, setHoursRemaining] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState("");
  const [now, setNow] = useState(new Date());
  const currentMonth = now.getMonth() + 1;
  const [currentDay, setCurrentDay] = useState(now.getDate());
  const dispatch = useAppDispatch();
  const country = useAppSelector((state) => state.country);
  const notificationScheduled: Record<string, boolean> = {};
  const localLanguages = ["Kosova", "Shqiperi", "Maqedoni"];
  const prayers = ["imsak", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  if (!localLanguages.includes(country.countrySelected.country)) {
    const {activePrayers, secondsRemaining, hoursRemaining} = useOnlinePrayerTimes(country.countrySelected);

    return {
      getPrayerTimesForToday: () => ({}),
      remainingTimeUntilNextPrayer: () => {},
      filterPrayerTimes: () => {},
      filterPrayerTimesPerDayMonth: () => ({}),
      activePrayer: activePrayers,
      secondsRemaining: secondsRemaining,
      hoursRemaining: hoursRemaining,
    };
  }

  const schedulePrayerNotifications = (
    prayerTimesForToday: Record<string, Date>
  ) => {
    let nottificationSent = false;

    Object.entries(prayerTimesForToday).forEach(([prayerName, prayerTime]) => {
      const timeRemaining = prayerTime.getTime() - now.getTime();

      if (timeRemaining > 0 && !notificationScheduled[prayerName] && !nottificationSent) {
        nottificationSent = true;
        sendLocalNotification(prayerName, timeRemaining / 1000);
        notificationScheduled[prayerName] = true;
      }
    });
  };

  const extractPrayerTimes = (prayerTime: PrayerTime): Record<string, Date> =>
    Object.keys(prayerTime)
      .filter((key) => prayers.includes(key))
      .reduce((obj: Record<string, Date>, key: string) => {
        const [hours, minutes, seconds] = prayerTime[key].split(":");
        obj[key] = new Date(
          now.getFullYear(),
          currentMonth - 1,
          currentDay,
          Number(hours),
          Number(minutes),
          Number(seconds)
        );
        return obj;
  }, {});

  const remainingTimeUntilNextPrayer = (
    prayerTimesForToday: Record<string, Date>
  ) => {
    const now1 = new Date();
    const remainingTimes = Object.entries(prayerTimesForToday)
      .filter(([key, value]) => value.getTime() > now1.getTime())
      .sort((a, b) => a[1].getTime() - b[1].getTime());

    if (remainingTimes.length) {
      let index = prayers.indexOf(remainingTimes[0][0]);

      setCurrentPrayer(prayers[index - 1]);
      setActivePrayer(remainingTimes[0][0]);
      const timeRemaining = remainingTimes[0][1].getTime() - now1.getTime();
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
  };

  const getPrayerTimesForToday = (
    month: string,
    day: string
  ): Record<string, Date> => {
    const prayerTimesToday = prayerTimes.find(
      (prayerTime) =>
        prayerTime.month === month &&
        prayerTime.day === day &&
        prayerTime.country === country.countrySelected.countryCode
    );
    if (prayerTimesToday) {
      return extractPrayerTimes(prayerTimesToday);
    }
    return {};
  };

  const filterPrayerTimes = (): void => {
    const prayerTimesForToday = getPrayerTimesForToday(
      currentMonth.toString(),
      currentDay.toString()
    );
    if (prayerTimesForToday) {
      remainingTimeUntilNextPrayer(prayerTimesForToday);
    }
  };

  const filterPrayerTimesPerDayMonth = (day: any, month: any) => {
    const prayerTimesForToday = getPrayerTimesForToday(
      month.toString(),
      day.toString()
    );
    return prayerTimesForToday;
  };

  useEffect(() => {
    const prayerTimesForToday = getPrayerTimesForToday(
      currentMonth.toString(),
      currentDay.toString()
    );

    schedulePrayerNotifications(prayerTimesForToday);

    const setActivePrayer = (prayer) => {
      dispatch(homeSlice.actions.setActivePrayer(prayer));
    };
    
    if (activePrayer === 'sunrise') {
      setActivePrayer('sunrise');
    } else if (activePrayer !== 'dhuhr' && activePrayer === 'imsak') {
      setActivePrayer('isha');
    } else if (activePrayer !== 'dhuhr') {
      setActivePrayer(currentPrayer);
    } else {
      setActivePrayer('sunrises');
    }

  }, [activePrayer]);

  useEffect(() => {
    const prayerTimesForToday = getPrayerTimesForToday(
      currentMonth.toString(),
      currentDay.toString()
    );

    if(now.getTime() > prayerTimesForToday['isha'].getTime()){
      setCurrentDay(prev => prev +1)
    }
  }, [activePrayer, now, currentPrayer]);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const timer = setInterval(() => {
      filterPrayerTimes();
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDay]);

  return {
    getPrayerTimesForToday,
    remainingTimeUntilNextPrayer,
    filterPrayerTimes,
    filterPrayerTimesPerDayMonth,
    activePrayer,
    secondsRemaining,
    hoursRemaining,
    currentPrayer,
  };
};
