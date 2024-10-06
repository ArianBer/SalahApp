import * as Notifications from 'expo-notifications'; 
import { cancelAllScheduledNotificationsAsync } from 'expo-notifications';

export async function scheduleNotificationsForPrayerTimes(filteredPrayerTimes: any) {
  await cancelAllScheduledNotificationsAsync();
  await Notifications.dismissAllNotificationsAsync();

  await Promise.all(
    Object.entries(filteredPrayerTimes).map(async ([prayerName, time]) => {
      const date = new Date(time);
      const minutes = date.getHours().toString() + ':' + date.getMinutes().toString().padStart(2, "0");

      return Notifications.scheduleNotificationAsync({
        content: {
          title: ${prayerName} ${minutes},
        },
        trigger: {
          date: date,
          repeats: false,
        },
      });
    })
  );
}
