import * as Notifications from "expo-notifications";

export const sendLocalNotification = async (
    prayerName: string,
    triggerTime: number
  ) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Prayer hub",
        body: `It's time for ${prayerName} prayer!`,
      },
      trigger: {
        seconds: triggerTime,
      },
    });
  };