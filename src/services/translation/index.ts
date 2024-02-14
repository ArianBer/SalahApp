import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import albania from "./languages/al.json";
import arabic from "./languages/ar.json";
import english from "./languages/en.json";
import { PartialRecord } from "../../types";
import { LanguageType } from "./languges";

const resources: PartialRecord<LanguageType, any> = {
  en: {
    english,
  },
  al: {
    albania,
  },
  de: {
    english,
  },
  mk: {
    english,
  },
  tr: {
    english,
  },
};

i18n.use(initReactI18next).init({
  lng: "al",
  resources,
  fallbackLng: "al",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
