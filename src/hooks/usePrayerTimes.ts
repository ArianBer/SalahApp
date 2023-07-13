import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
// eslint-disable-next-line import/namespace
import { CurrentPrayerType, homeSlice } from "../redux/reducers/homeReducer";
import { registerForPushNotificationsAsync } from "../services/registerPushNotifications";

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
  const [hoursRemaining, setHoursRemaining] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState("");
  const [now, setNow] = useState(new Date());
  const currentMonth = now.getMonth() + 1;
  const [currentDay, setCurrentDay] = useState(now.getDate());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(homeSlice.actions.setActivePrayer(activePrayer));
  }, [activePrayer]);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const prayerTimesForToday = getPrayerTimesForToday();
    remainingTimeUntilNextPrayer(prayerTimesForToday);

    if (!Object.keys(prayerTimesForToday).length) {
      setCurrentDay(currentDay + 1);
    }
  }, [currentDay]);

  const getPrayerTimesForToday = (): Record<string, Date> => {
    const prayerTimesToday = prayerTimes.find(
      (prayerTime) =>
        prayerTime.month === String(currentMonth) &&
        prayerTime.day === String(currentDay) &&
        prayerTime.country === "xk"
    );

    if (prayerTimesToday) {
      return Object.keys(prayerTimesToday)
        .filter((key) =>
          ["imsak", "sunrise", "dhuhr", "asr", "maghrib", "isha"].includes(key)
        )
        .reduce((obj: Record<string, Date>, key: string) => {
          const [hours, minutes, seconds] = prayerTimesToday[key].split(":");
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
    }
    return {};
  };

  const filterPrayerTimes = (
    month: string,
    day: string
  ): Record<string, Date> => {
    const prayerTimesToday = prayerTimes.find(
      (prayerTime) => prayerTime.month === month && prayerTime.day === day
    );

    if (prayerTimesToday) {
      return Object.keys(prayerTimesToday)
        .filter((key) =>
          ["imsak", "sunrise", "dhuhr", "asr", "maghrib", "isha"].includes(key)
        )
        .reduce((obj: Record<string, Date>, key: string) => {
          const [hours, minutes, seconds] = prayerTimesToday[key].split(":");
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
    }
    return {};
  };

  const remainingTimeUntilNextPrayer = (
    prayerTimesForToday: Record<string, Date>
  ): void => {
    const now1 = new Date();

    const remainingTimes = Object.entries(prayerTimesForToday)
      .filter(([key, value]) => value.getTime() > now1.getTime())
      .sort((a, b) => a[1].getTime() - b[1].getTime());

    if (remainingTimes.length) {
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

  return {
    getPrayerTimesForToday,
    remainingTimeUntilNextPrayer,
    filterPrayerTimes,
    activePrayer,
    secondsRemaining,
    hoursRemaining,
  };
};
