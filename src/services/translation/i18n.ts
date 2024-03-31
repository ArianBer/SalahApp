import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en, al, tr, de } from "./languages";

export const languagesKeys = {
  en: "en",
  al: "al",
  tr: "tr",
  de: "de",
};

export const defaultNS = "translation";
export const resources = {
  en: {
    translation: en,
  },
  al: {
    translation: al,
  },
  tr: {
    translation: tr,
  },
  de: {
    translation: de,
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en",
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
