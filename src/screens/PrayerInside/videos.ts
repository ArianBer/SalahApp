import { Prayers } from "../../constants";
import AkshamiVideo from "../../assets/videos/Akshami.mp4";
import {
  default as DrekaVideo,
  default as IkindiaVideo,
  default as JaciaVideo,
} from "../../assets/videos/Jacia.mp4";
import SabahuVideo from "../../assets/videos/Sabahu.mp4";
import AbdesiAl from "../../assets/videos/abdesti.mp4";
import AbdesiTr from "../../assets/videos/abdesti-tr.mp4";
import AbdesiEn from "../../assets/videos/abdesti-en.mp4";

import i18n, { languagesKeys } from "../../services/translation";

export type PrayerKey = keyof typeof Prayers;

export const prayerVideos = {
  [Prayers.fajr]: SabahuVideo,
  [Prayers.dhuhr]: DrekaVideo,
  [Prayers.asr]: IkindiaVideo,
  [Prayers.maghrib]: AkshamiVideo,
  [Prayers.isha]: JaciaVideo,
  [Prayers.ablution + languagesKeys.al]: AbdesiAl,
  [Prayers.ablution + languagesKeys.en]: AbdesiEn,
  [Prayers.ablution + languagesKeys.tr]: AbdesiTr,
};
