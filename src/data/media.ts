export type Lang = "en";

export type MediaType = "podcast" | "channel" | "audio";

export interface MediaResource {
  id: string;
  name: string;
  type: MediaType;
  topic: string;
  url: string;
  oneLiner: string;
  lang: Lang;
}

export const media: MediaResource[] = [
  {
    id: "koshur-bbc",
    name: "BBC News Koshur",
    type: "channel",
    topic: "Kashmiri language news and features",
    url: "https://www.youtube.com/@BBCNewsKoshur",
    oneLiner: "BBC's Kashmiri-language YouTube channel, useful for hearing modern spoken Kashmiri.",
    lang: "en",
  },
  {
    id: "koshur-akademi",
    name: "Jammu & Kashmir Academy of Art, Culture and Languages",
    type: "channel",
    topic: "Kashmiri literature and culture",
    url: "https://www.jkaacl.jk.gov.in/",
    oneLiner: "Official cultural body sharing programmes on Kashmiri poetry, music, and heritage.",
    lang: "en",
  },
  {
    id: "sangeet-natak",
    name: "Sangeet Natak Akademi — Kashmir archives",
    type: "audio",
    topic: "Traditional Kashmiri music",
    url: "https://sangeetnatak.gov.in/",
    oneLiner:
      "India's national academy for music and dance, with recordings of Sufiana and folk music from Kashmir.",
    lang: "en",
  },
];
