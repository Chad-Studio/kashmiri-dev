export type Lang = "en";

export interface KashmiriNumber {
  digit: number;
  koshur: string; // Roman transliteration
  note?: string;
  lang: Lang;
}

// Roman transliteration of Kashmiri (Koshur) numbers 1-50.
// Kashmiri has no fully standardised Roman spelling, so spellings can
// vary between sources and regions. These forms are being reviewed by
// native speakers; Perso-Arabic script and audio will be added later.
// Sources: Braj B. Kachru, An Introduction to Spoken Kashmiri (1973);
// Omniglot — Kashmiri numbers; Wiktionary — Kashmiri numerals.
export const numbers: KashmiriNumber[] = [
  { digit: 1, koshur: "akh", lang: "en" },
  { digit: 2, koshur: "zi", lang: "en" },
  { digit: 3, koshur: "tre", lang: "en" },
  { digit: 4, koshur: "tsor", lang: "en" },
  { digit: 5, koshur: "pants", lang: "en" },
  { digit: 6, koshur: "sheh", lang: "en" },
  { digit: 7, koshur: "sath", lang: "en" },
  { digit: 8, koshur: "aeth", lang: "en" },
  { digit: 9, koshur: "nav", lang: "en" },
  { digit: 10, koshur: "dah", lang: "en" },
  { digit: 11, koshur: "kah", lang: "en" },
  { digit: 12, koshur: "bah", lang: "en" },
  { digit: 13, koshur: "truwah", lang: "en" },
  { digit: 14, koshur: "tsodah", lang: "en" },
  { digit: 15, koshur: "pandah", lang: "en" },
  { digit: 16, koshur: "shurah", lang: "en" },
  { digit: 17, koshur: "sadah", lang: "en" },
  { digit: 18, koshur: "arudah", lang: "en" },
  { digit: 19, koshur: "kunwuh", lang: "en" },
  { digit: 20, koshur: "wuh", lang: "en" },
  { digit: 21, koshur: "akawuh", lang: "en" },
  { digit: 22, koshur: "zetowuh", lang: "en" },
  { digit: 23, koshur: "trowuh", lang: "en" },
  { digit: 24, koshur: "tsowuh", lang: "en" },
  { digit: 25, koshur: "pantsuh", lang: "en" },
  { digit: 26, koshur: "shatawuh", lang: "en" },
  { digit: 27, koshur: "satawuh", lang: "en" },
  { digit: 28, koshur: "athawuh", lang: "en" },
  { digit: 29, koshur: "kunatrih", lang: "en" },
  { digit: 30, koshur: "trih", lang: "en" },
  { digit: 31, koshur: "akatrih", lang: "en" },
  { digit: 32, koshur: "dotrih", lang: "en" },
  { digit: 33, koshur: "tetrih", lang: "en" },
  { digit: 34, koshur: "tsotrih", lang: "en" },
  { digit: 35, koshur: "pantsatrih", lang: "en" },
  { digit: 36, koshur: "shatatrih", lang: "en" },
  { digit: 37, koshur: "satatrih", lang: "en" },
  { digit: 38, koshur: "arutrih", lang: "en" },
  { digit: 39, koshur: "kunataji", lang: "en" },
  { digit: 40, koshur: "tsatji", lang: "en" },
  { digit: 41, koshur: "akataji", lang: "en" },
  { digit: 42, koshur: "dotaji", lang: "en" },
  { digit: 43, koshur: "tetaji", lang: "en" },
  { digit: 44, koshur: "tsotaji", lang: "en" },
  { digit: 45, koshur: "pantsataji", lang: "en" },
  { digit: 46, koshur: "shatataji", lang: "en" },
  { digit: 47, koshur: "satataji", lang: "en" },
  { digit: 48, koshur: "arutaji", lang: "en" },
  { digit: 49, koshur: "kunwanzah", lang: "en" },
  { digit: 50, koshur: "pantsah", lang: "en" },
];
