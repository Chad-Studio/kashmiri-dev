export type Lang = "en";

export interface Person {
  id: string;
  name: string;
  years: string;
  tagline: string;
  bio: string;
  whyMatters: string;
  sources: string[];
  lang: Lang;
}

export interface Craft {
  id: string;
  name: string;
  description: string;
  lang: Lang;
}

export const people: Person[] = [
  {
    id: "lal-ded",
    name: "Lal Ded (Lalleshwari)",
    years: "c. 1320–1392",
    tagline: "Mystic poet whose vaakhs are loved across communities.",
    bio: "Lal Ded, also called Lalleshwari or Lalla Arifa, was a Kashmiri mystic poet. She composed short verses called vaakhs in early Kashmiri. Her poetry speaks of the search for the divine within, beyond ritual and outward form.",
    whyMatters: "She is honoured by Kashmiri Hindus and Muslims alike. Her vaakhs helped shape the Kashmiri language and its shared spiritual voice.",
    sources: [
      "Ranjit Hoskote, I, Lalla: The Poems of Lal Ded (Penguin Classics, 2011)",
      "Jayalal Kaul, Lal Ded (Sahitya Akademi, 1973)",
    ],
    lang: "en",
  },
  {
    id: "nund-rishi",
    name: "Sheikh Noor-ud-din Noorani (Nund Rishi)",
    years: "1377–1440",
    tagline: "Founder of the Rishi order; patron saint of Kashmir.",
    bio: "Nund Rishi, also called Sheikh-ul-Alam or Alamdar-e-Kashmir, was a Kashmiri saint and poet. He founded the Rishi order, which blended Islamic Sufi thought with older Kashmiri spiritual traditions. His verses, called shruks, teach simple living, kindness, and love of the divine.",
    whyMatters: "He is revered by Muslims and remembered warmly by Kashmiri Hindus. His shrine at Charar-i-Sharief is a place of shared devotion.",
    sources: [
      "Mohammad Ishaq Khan, Kashmir's Transition to Islam: The Role of Muslim Rishis (Manohar, 1994)",
      "Abdul Qaiyum Rafiqi, Sufism in Kashmir (Bharatiya Publishing House, 1976)",
    ],
    lang: "en",
  },
  {
    id: "habba-khatoon",
    name: "Habba Khatoon",
    years: "16th century",
    tagline: "The 'Nightingale of Kashmir', poet of love and longing.",
    bio: "Habba Khatoon was a Kashmiri poet born in a village near Pampore. She later became the queen of the last independent Kashmiri king, Yusuf Shah Chak. Her lol (love lyrics) brought a new tenderness and everyday feeling into Kashmiri poetry.",
    whyMatters: "She gave Kashmiri poetry a woman's voice that is still sung today. Many folk songs of the valley trace back to her.",
    sources: [
      "S. L. Sadhu, Habba Khatoon (Sahitya Akademi, 1983)",
      "Encyclopaedia Britannica: Habba Khatoon",
    ],
    lang: "en",
  },
  {
    id: "rasul-mir",
    name: "Rasul Mir",
    years: "19th century",
    tagline: "Romantic poet often called the Keats of Kashmir.",
    bio: "Rasul Mir was born in Shahabad, south Kashmir. He wrote ghazals and love poems in Kashmiri that are full of beauty, colour, and feeling. His verses are still recited and sung by Kashmiri singers.",
    whyMatters: "He helped shape modern Kashmiri poetry and kept the language alive in a time of change.",
    sources: [
      "G. N. Gauhar, Rasul Mir (Sahitya Akademi, 1998)",
      "Trilokinath Raina, A History of Kashmiri Literature (Sahitya Akademi, 2002)",
    ],
    lang: "en",
  },
  {
    id: "mahjoor",
    name: "Ghulam Ahmad Mahjoor",
    years: "1887–1952",
    tagline: "Poet who brought a modern voice to Kashmiri verse.",
    bio: "Mahjoor was born in Mitrigam, Pulwama. He wrote in Kashmiri, Persian, and Urdu. His poems speak about the land, its people, its rivers, and its seasons, in simple and moving words.",
    whyMatters: "He is often called the poet of the Kashmiri people and helped shape modern Kashmiri literature.",
    sources: [
      "Trilokinath Raina, The Best of Mahjoor (Sahitya Akademi, 1989)",
      "Sahitya Akademi: Mahjoor entry",
    ],
    lang: "en",
  },
];

export const crafts: Craft[] = [
  {
    id: "pashmina",
    name: "Pashmina & Kani weaving",
    description:
      "Pashmina is a fine wool from a Himalayan goat, spun and woven into very soft shawls. Kani weaving uses small wooden sticks instead of a needle to make patterned shawls. Kashmir has been famous for these shawls for centuries and they were once traded across Asia and Europe.",
    lang: "en",
  },
  {
    id: "papier-mache",
    name: "Papier-mâché",
    description:
      "Papier-mâché is the art of shaping objects from paper pulp and then painting them with fine floral and bird designs. The craft came to Kashmir from Persia in the 14th–15th century. Today it decorates boxes, bowls, and Christmas ornaments sent all over the world.",
    lang: "en",
  },
  {
    id: "walnut-wood",
    name: "Walnut wood carving",
    description:
      "Kashmiri walnut wood is strong and dark. Skilled carvers cut deep floral and chinar-leaf patterns into it by hand. Walnut furniture and panels from Kashmir have been prized for generations.",
    lang: "en",
  },
  {
    id: "copperware",
    name: "Copperware (Traam)",
    description:
      "Traam is the copperware of Kashmir, used at home and for feasts like Wazwan. Craftsmen from Srinagar's old city hammer flowers, leaves, and calligraphy into samovars, plates, and bowls. The craft has been passed down family lines for centuries.",
    lang: "en",
  },
];
