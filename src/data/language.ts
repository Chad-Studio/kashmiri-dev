export type Lang = "en";

export interface VocabWord {
  koshur: string;
  english: string;
  lang: Lang;
  isLoanword?: boolean;
  note?: string;
}

export interface Phrase {
  koshur: string;
  english: string;
  lang: Lang;
  isLoanword?: boolean;
  note?: string;
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
  { koshur: "aab", english: "water", lang: "en", isLoanword: true, note: "Persian loanword; native word is 'pōny'." },
  { koshur: "batte", english: "rice / food", lang: "en" },
  { koshur: "chai", english: "tea", lang: "en", isLoanword: true, note: "Loanword." },
  { koshur: "tsot", english: "bread", lang: "en" },
  { koshur: "gaam", english: "village", lang: "en" },
  { koshur: "shahar", english: "city", lang: "en", isLoanword: true, note: "Persian/Urdu loanword." },
  { koshur: "gar", english: "house", lang: "en" },
  { koshur: "wan", english: "shop", lang: "en" },
  { koshur: "kitab", english: "book", lang: "en", isLoanword: true, note: "Arabic loanword." },
  { koshur: "skuul", english: "school", lang: "en", note: "'Madrasa' usually means a religious school." },
  { koshur: "ustad", english: "teacher", lang: "en", isLoanword: true, note: "Persian loanword." },
  { koshur: "shongun", english: "to sleep", lang: "en" },
  { koshur: "khyon", english: "to eat", lang: "en" },
  { koshur: "chyon", english: "to drink", lang: "en" },
  { koshur: "gatshun", english: "to go", lang: "en" },
  { koshur: "yun", english: "to come", lang: "en" },
  { koshur: "wuchhun", english: "to see", lang: "en" },
  { koshur: "khosh", english: "happy", lang: "en", isLoanword: true, note: "Persian loanword." },
  { koshur: "tur", english: "cold", lang: "en", note: "Native Kashmiri; 'sheen' means snow, 'shohul' means cool." },
  { koshur: "garam", english: "warm", lang: "en", isLoanword: true, note: "Persian/Urdu loanword." },
  { koshur: "rang", english: "colour", lang: "en" },
];

export const phrases: Phrase[] = [
  { koshur: "Assalamu alaikum", english: "Peace be upon you (greeting)", lang: "en", isLoanword: true, note: "Arabic; common Muslim greeting." },
  { koshur: "Vaaray chivā?", english: "How are you?", lang: "en", note: "The native Kashmiri greeting." },
  { koshur: "Bi chhus vaaray", english: "I am fine", lang: "en" },
  { koshur: "Meharbāni", english: "Please / thank you (literally: your kindness)", lang: "en", note: "The native way to say thanks. 'Shukriya' from Urdu is also widely used." },
  { koshur: "Tohi kya chhu nāv?", english: "What is your name?", lang: "en", note: "Kashmiri usually puts the verb second." },
  { koshur: "Myon nāv chhu ...", english: "My name is ...", lang: "en" },
  { koshur: "Kot chhukh gatshān?", english: "Where are you going?", lang: "en" },
  { koshur: "Yeti walo", english: "Come here", lang: "en", note: "'Walo' is the command form." },
  { koshur: "Khuda hafiz", english: "Goodbye", lang: "en", isLoanword: true, note: "Persian; commonly used." },
];
