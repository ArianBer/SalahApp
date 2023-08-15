import { useEffect, useState } from "react";
import {
  registerForPushNotificationsAsync,
  sendNotification,
} from "../services/registerPushNotifications";

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
  const [activePrayer, setActivePrayer] = useState("");
  const [hoursRemaining, setHoursRemaining] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState("");
  const [now, setNow] = useState(new Date());
  const currentMonth = now.getMonth() + 1;
  const [currentDay, setCurrentDay] = useState(now.getDate());

  const extractPrayerTimes = (prayerTime: PrayerTime): Record<string, Date> =>
    Object.keys(prayerTime)
      .filter((key) =>
        ["imsak", "sunrise", "dhuhr", "asr", "maghrib", "isha"].includes(key)
      )
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

  const getPrayerTimesForToday = (
    month: string,
    day: string
  ): Record<string, Date> | undefined => {
    const prayerTimesToday = prayerTimes.find(
      (prayerTime) =>
        prayerTime.month === month &&
        prayerTime.day === day &&
        prayerTime.country === "xk"
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

  useEffect(() => {
    registerForPushNotificationsAsync();
    const prayerTimesForToday = getPrayerTimesForToday(
      currentMonth.toString(),
      currentDay.toString()
    );
    const now1 = new Date();
    const latestPrayerTime = Math.max(
      ...Object.values(prayerTimesForToday).map((date) => date.getTime())
    );

    if (latestPrayerTime < now1.getTime()) {
      setCurrentDay(currentDay + 1);
    }
  }, [currentDay]);

  useEffect(() => {
    filterPrayerTimes();
    const timer = setInterval(() => {
      setNow(new Date());
      filterPrayerTimes();
      if (
        activePrayer &&
        hoursRemaining === "0:00" &&
        secondsRemaining === "00"
      ) {
        sendNotification(activePrayer); // Call a function to send the notification
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDay]);

  return {
    getPrayerTimesForToday,
    remainingTimeUntilNextPrayer,
    filterPrayerTimes,
    activePrayer,
    secondsRemaining,
    hoursRemaining,
  };
};
