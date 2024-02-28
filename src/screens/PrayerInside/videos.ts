import { Prayers } from "../../constants";
import AkshamiVideo from "../../assets/videos/Akshami.mp4";
import {
  default as DrekaVideo,
  default as IkindiaVideo,
  default as JaciaVideo,
} from "../../assets/videos/Jacia.mp4";
import SabahuVideo from "../../assets/videos/Sabahu.mp4";
import Abdesi from "../../assets/videos/abdesti.mp4";

export type PrayerKey = keyof typeof Prayers;

export const prayerVideos = {
  [Prayers.fajr]: SabahuVideo,
  [Prayers.dhuhr]: DrekaVideo,
  [Prayers.asr]: IkindiaVideo,
  [Prayers.maghrib]: AkshamiVideo,
  [Prayers.isha]: JaciaVideo,
  [Prayers.ablution]: Abdesi,
};
