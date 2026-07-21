export type Lang = "en";

export interface VocabWord {
  koshur: string;
  english: string;
  lang: Lang;
}

export interface Phrase {
  koshur: string;
  english: string;
  lang: Lang;
}

export interface ScriptInfo {
  name: string;
  status: string;
  description: string;
  lang: Lang;
}

export const scripts: ScriptInfo[] = [
  {
    name: "Perso-Arabic",
    status: "Official script",
    description:
      "The Perso-Arabic script (Nastaʿlīq style) is the official script for Kashmiri today. It is written right to left. Extra letters and marks are added to show sounds that are special to Kashmiri.",
    lang: "en",
  },
  {
    name: "Devanagari",
    status: "Also used",
    description:
      "Devanagari is the same script used for Hindi and Marathi. Some Kashmiri writers and scholars use it, especially among Kashmiri Pandits. It is written left to right.",
    lang: "en",
  },
  {
    name: "Sharada",
    status: "Historical",
    description:
      "Sharada is the oldest script used for Kashmiri and Sanskrit in Kashmir. It was used from around the 8th century onwards. Today it is rare, but scholars and enthusiasts are working to revive it.",
    lang: "en",
  },
];

export const vocabulary: VocabWord[] = [
  { koshur: "aes", english: "we", lang: "en" },
  { koshur: "tse", english: "you", lang: "en" },
  { koshur: "bi", english: "I", lang: "en" },
  { koshur: "su", english: "he", lang: "en" },
  { koshur: "sa", english: "she", lang: "en" },
  { koshur: "moaj", english: "mother", lang: "en" },
  { koshur: "moul", english: "father", lang: "en" },
  { koshur: "boi", english: "brother", lang: "en" },
  { koshur: "beni", english: "sister", lang: "en" },
  { koshur: "kur", english: "daughter", lang: "en" },
  { koshur: "nechuv", english: "son", lang: "en" },
  { koshur: "aab", english: "water", lang: "en" },
  { koshur: "batte", english: "rice / food", lang: "en" },
  { koshur: "chai", english: "tea", lang: "en" },
  { koshur: "tsot", english: "bread", lang: "en" },
  { koshur: "gaam", english: "village", lang: "en" },
  { koshur: "shahar", english: "city", lang: "en" },
  { koshur: "gar", english: "house", lang: "en" },
  { koshur: "wan", english: "shop", lang: "en" },
  { koshur: "kitab", english: "book", lang: "en" },
  { koshur: "madrasah", english: "school", lang: "en" },
  { koshur: "ustad", english: "teacher", lang: "en" },
  { koshur: "shongun", english: "to sleep", lang: "en" },
  { koshur: "khyon", english: "to eat", lang: "en" },
  { koshur: "chyon", english: "to drink", lang: "en" },
  { koshur: "gatshun", english: "to go", lang: "en" },
  { koshur: "yun", english: "to come", lang: "en" },
  { koshur: "wuchhun", english: "to see", lang: "en" },
  { koshur: "khosh", english: "happy", lang: "en" },
  { koshur: "shrup", english: "cold", lang: "en" },
  { koshur: "garam", english: "warm", lang: "en" },
  { koshur: "rang", english: "colour", lang: "en" },
];

export const phrases: Phrase[] = [
  { koshur: "Assalamu alaikum", english: "Peace be upon you (greeting)", lang: "en" },
  { koshur: "Kya haal chhuy?", english: "How are you?", lang: "en" },
  { koshur: "Bi chhus theek", english: "I am fine", lang: "en" },
  { koshur: "Shukriya", english: "Thank you", lang: "en" },
  { koshur: "Meherbani", english: "Please / kindness", lang: "en" },
  { koshur: "Tohi naav kya chhu?", english: "What is your name?", lang: "en" },
  { koshur: "Myon naav chhu ...", english: "My name is ...", lang: "en" },
  { koshur: "Kot chhukh gatshan?", english: "Where are you going?", lang: "en" },
  { koshur: "Yeti aaw", english: "Come here", lang: "en" },
  { koshur: "Khuda hafiz", english: "Goodbye", lang: "en" },
];
