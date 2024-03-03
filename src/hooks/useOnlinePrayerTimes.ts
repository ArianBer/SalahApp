import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { CurrentPrayerType, homeSlice } from "../redux/reducers/homeReducer";
import { sendLocalNotification } from "../services/notifications/localNotification";

export const useOnlinePrayerTimes = (countrySelected: any) => {
  const [activePrayers, setActivePrayer] = useState<any>("dhuhr");
  const [hoursRemaining, setHoursRemaining] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState("");
  const [now, setNow] = useState(new Date());
  const currentMonth = now.getMonth() + 1;
  const [currentDay, setCurrentDay] = useState(now.getDate());
  const [prayerTimes, setPrayerTime] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState<CurrentPrayerType>("dhuhr");
  const keysToInclude = [
    "Imsak",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ];
  const notificationScheduled: Record<string, boolean> = {};
  const dispatch = useAppDispatch();

  const filterPrayerTimes = (
    prayerTimes: Record<string, string>
  ): Record<string, Date> => {
    if (!prayerTimes) {
      return {};
    }
    return Object.keys(prayerTimes)
      .filter((key) => keysToInclude.includes(key))
      .reduce((obj: Record<string, Date>, key: string) => {
        const [hours, minutes] = prayerTimes[key].split(":");
        obj[key] = new Date();
        obj[key].setHours(Number(hours), Number(minutes), 0, 0);
        return obj;
      }, {});
  };

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

  const remainingTimeUntilNextPrayer = (
    prayerTimesForToday: Record<string, string>
  ) => {
    const filteredPrayerTimes = filterPrayerTimes(prayerTimesForToday);

    const now1 = new Date();
    const remainingTimes = Object.entries(filteredPrayerTimes)
      .filter(([key, value]) => {
        const prayerTime = new Date(value);
        return prayerTime.getTime() > now1.getTime();
      })
      .sort((a, b) => {
        const timeA = new Date(a[1]);
        const timeB = new Date(b[1]);
        return timeA.getTime() - timeB.getTime();
      });

    if (remainingTimes?.length) {
      const nextPrayer = remainingTimes[0][0];
      let index = keysToInclude.indexOf(remainingTimes[0][0]);

      setCurrentPrayer(keysToInclude[index - 1])
      setActivePrayer(nextPrayer);
      const timeRemaining =
        new Date(remainingTimes[0][1]).getTime() - now1.getTime();
      const hoursRemaining = Math.floor(timeRemaining / 3600000);
      const minutesRemaining = Math.floor((timeRemaining % 3600000) / 60000);
      const secondsRemaining = Math.floor((timeRemaining % 60000) / 1000);

      setHoursRemaining(
        `${hoursRemaining.toString().padStart(2, "0")}:${minutesRemaining
          .toString()
          .padStart(2, "0")}`
      );
      setSecondsRemaining(secondsRemaining.toString().padStart(2, "0"));
    }
  };

  useEffect(() => {
    const filteredPrayerTimes = filterPrayerTimes(prayerTimes);
    schedulePrayerNotifications(filteredPrayerTimes);

    const setActivePrayer = (prayer: string) => {
      dispatch(homeSlice.actions.setActivePrayer(prayer));
    };
    
    if (activePrayers.toLowerCase() === 'sunrise') {
      setActivePrayer('sunrise');
    } else if (activePrayers.toLowerCase() !== 'dhuhr' && activePrayers.toLowerCase() === 'imsak') {
      setActivePrayer('isha');
    } else if (activePrayers.toLowerCase() !== 'dhuhr') {
      setActivePrayer(currentPrayer?.toLowerCase());
    } else {
      setActivePrayer('sunrises');
    }
  }, [activePrayers]);

  useEffect(() => {
    const filteredPrayerTimes = filterPrayerTimes(prayerTimes);

    if(now.getTime() > filteredPrayerTimes['Isha']?.getTime()){
      setCurrentDay(prev => prev +1)
    }
  }, [activePrayers, now, currentPrayer]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
      remainingTimeUntilNextPrayer(prayerTimes);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [prayerTimes]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${currentDay}-${currentMonth}-${now.getFullYear()}?latitude=${
            countrySelected.latitude
          }&longitude=${countrySelected.longitude}&method=2`
        );

        const data = await response.json();
        setPrayerTime(data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, [countrySelected, currentMonth, currentDay]);

  return {
    activePrayers,
    secondsRemaining,
    hoursRemaining,
    currentPrayer,
  };
};
