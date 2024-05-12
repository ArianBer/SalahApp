import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CurrentPrayerType, homeSlice } from "../redux/reducers/homeReducer";
import { scheduleNotificationsForPrayerTimes } from "../services/notifications/localNotification";

export const useOnlinePrayerTimes = () => {
  const [activePrayers, setActivePrayer] = useState<any>("dhuhr");
  const [hoursRemaining, setHoursRemaining] = useState("00");
  const [secondsRemaining, setSecondsRemaining] = useState("00");
  const [now, setNow] = useState(new Date());
  const currentMonth = now.getMonth() + 1;
  const [currentDay, setCurrentDay] = useState(now.getDate());
  const [prayerTimes, setPrayerTime] = useState([]);
  const [currentPrayer, setCurrentPrayer] =
    useState<CurrentPrayerType>("dhuhr");
  const [increased, setIncreased] = useState(false);
  const onlinePrayers = useAppSelector((state) => state.onlinePrayers);
  const { t, i18n } = useTranslation();
  const language = useAppSelector((state) => state.language);
  
  const keysToInclude = [
    "Imsak",
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ];
  const dispatch = useAppDispatch();

  const filterPrayerTimes = (
    prayerTimes: Record<string, string>,
    increased: Boolean
  ): Record<string, Date> => {
    if (!prayerTimes) {
      return {};
    }

    const prayerTimesObject = Object.keys(prayerTimes)
      .filter((key) => keysToInclude.includes(key))
      .reduce((obj: Record<string, Date>, key: string) => {
        const timeString = prayerTimes[key].split(" ")[0];
        const [hours, minutes] = timeString.split(":");
        const prayerTime = new Date();

        prayerTime.setHours(Number(hours), Number(minutes), 0, 0);

        obj[key] = prayerTime;
        return obj;
      }, {});

    if (increased) {
      Object.keys(prayerTimesObject).forEach((key) => {
        prayerTimesObject[key].setDate(prayerTimesObject[key].getDate() + 1);
      });
    }

    return prayerTimesObject;
  };

  const remainingTimeUntilNextPrayer = (
    prayerTimesForToday: Record<string, string>
  ) => {
    const filteredPrayerTimes = filterPrayerTimes(
      prayerTimesForToday,
      increased
    );

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

      setCurrentPrayer(keysToInclude[index - 1]);
      setActivePrayer(nextPrayer.toLowerCase());
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
    const setActivePrayer = (prayer: string) => {
      dispatch(homeSlice.actions.setActivePrayer(prayer));
    };

    if (activePrayers.toLowerCase() === "sunrise") {
      setActivePrayer("sunrise");
    } else if (
      activePrayers.toLowerCase() !== "dhuhr" &&
      activePrayers.toLowerCase() === "imsak"
    ) {
      setActivePrayer("isha");
    } else if (activePrayers.toLowerCase() !== "dhuhr") {
      setActivePrayer(currentPrayer?.toLowerCase());
    } else {
      setActivePrayer("sunrises");
    }
  }, [activePrayers]);

  useEffect(() => {
    const day = String(now.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      now
    );
    const year = now.getFullYear();
    const todayDate = `${day} ${month} ${year}`;

    const todayEntry = onlinePrayers.prayerTimes[currentMonth]?.find(
      (entry) => entry.date.readable === todayDate
    );
    const specificTimings = todayEntry ? todayEntry.timings : null;
    setPrayerTime(specificTimings);

    function addDefaultDate(prayerTimes) {
      const updatedPrayerTimes = Object.entries(prayerTimes).map(
        ([prayerName, prayerTime]) => {
          const currentTime = new Date(
            `${now.getFullYear()}-${
              now.getMonth() + 1
            }-${currentDay} ${prayerTime}`
          );
          const formattedTime = `${currentTime.getFullYear()}-${(
            currentTime.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${currentTime
            .getDate()
            .toString()
            .padStart(2, "0")} ${(currentTime.getHours()
          )
            .toString()
            .padStart(2, "0")}:${currentTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${currentTime
            .getSeconds()
            .toString()
            .padStart(2, "0")}`;
          return [prayerName, formattedTime];
        }
      );

      const updatedPrayerTimesObject = Object.fromEntries(updatedPrayerTimes);
      return updatedPrayerTimesObject;
    }

    const filteredPrayerTimes = Object.keys(specificTimings)
      .filter(key => keysToInclude.includes(key))
      .reduce((obj, key) => {
        const time = specificTimings[key].replace(" (CEST)", "");
        obj[t(key.toLowerCase())] = time;
        return obj;
      }, {}); 

      if(i18n.language === language.languageSelected.value){
        scheduleNotificationsForPrayerTimes(addDefaultDate(filteredPrayerTimes));
      }
  }, [currentMonth, currentDay, t]);

  useEffect(() => {
    const filteredPrayerTimes = filterPrayerTimes(prayerTimes);
    const isIshaPassed = now.getTime() > filteredPrayerTimes["Isha"]?.getTime();

    if (isIshaPassed && !increased) {
      setCurrentDay((prev) => prev + 1);
      setIncreased(true);
    } else if (!isIshaPassed) {
      setIncreased(false);
    }
  }, [now]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
      remainingTimeUntilNextPrayer(prayerTimes);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [prayerTimes, currentDay]);

  return {
    activePrayers,
    secondsRemaining,
    hoursRemaining,
    currentPrayer,
  };
};
