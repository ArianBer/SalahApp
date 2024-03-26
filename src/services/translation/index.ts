import { en, al, tr, de } from "./languages";
import { I18n } from "i18n-js";

export const languagesKeys = {
  en: "en",
  al: "al",
  tr: "tr",
  de: "de",
};
const i18n = new I18n({ en, al, tr, de });

i18n.enableFallback = true;
export default i18n;
