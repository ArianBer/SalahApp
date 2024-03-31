export interface LanguageProps {
  name: string;
  value: LanguageType;
}

export type LanguageType = "al" | "en" | "tr" | "de" | "mk" | "xk";

export type LanguageObjType = { name: string; value: LanguageType };

export const languages: LanguageObjType[] = [
  {
    name: "Shqip",
    value: "al",
  },
  {
    name: "English",
    value: "en",
  },
  {
    name: "Türkçe",
    value: "tr",
  },
  {
    name: "Deutsch",
    value: "de",
  },
];
