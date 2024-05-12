import * as Notifications from 'expo-notifications'; 
import { cancelAllScheduledNotificationsAsync } from 'expo-notifications';

export async function scheduleNotificationsForPrayerTimes(filteredPrayerTimes: any) {
  await cancelAllScheduledNotificationsAsync();
  await Notifications.dismissAllNotificationsAsync();

  Object.entries(filteredPrayerTimes).map(async (prayer) => {
    const date = new Date(prayer[1]);
    const minutes = date.getHours().toString() + ':' + date.getMinutes()
      .toString()
      .padStart(2, "0");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${prayer[0]} ${minutes}`,
      },
      trigger: {
        date: date,
        repeats: false
      },
    });
  });
}
