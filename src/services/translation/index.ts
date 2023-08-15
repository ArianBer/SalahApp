import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./languages/en.json";
import albania from "./languages/al.json";
import arabic from "./languages/ar.json";

const i18nCallback = (error: any, t: any) => {
  if (error) {
    console.error(error);
  }
  return t;
};

const resources: any = {
  en: {
    english,
  },
  al: {
    albania,
  },
  ar: {
    arabic,
  },
};

i18next.use(initReactI18next).init(
  {
    lng: "al",
    resources,
    react: {
      useSuspense: false,
    },
  },
  i18nCallback
);

export default i18next;
