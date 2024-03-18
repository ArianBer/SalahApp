import * as Notifications from "expo-notifications";

export const sendLocalNotification = async (
    prayerName: string,
    triggerTime: number
  ) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "",
        body: prayerName,
      },
      trigger: {
        seconds: triggerTime,
      },
    });
  };