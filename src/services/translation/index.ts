import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import albania from "./languages/al.json";
import arabic from "./languages/ar.json";
import english from "./languages/en.json";

const resources = {
  "al": albania,
  "en": english,
  "ar": arabic,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "al",
    interpolation: {
      escapeValue: false,
    },
  });

export {i18n};
