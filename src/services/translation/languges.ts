export interface LanguageProps {
  name: String;
  value: LanguageType;
}

export type LanguageType = "al" | "en" | "tr" | "de" | "mk" | "xk";

export const languages: { name: string; value: LanguageType }[] = [
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
    name: "German",
    value: "de",
  },
];
