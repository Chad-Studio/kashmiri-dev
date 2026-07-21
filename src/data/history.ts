export type Lang = "en";

export interface TimelineEntry {
  id: string;
  era: string;
  years: string;
  fact: string;
  description: string;
  people: string[];
  sources: string[];
  lang: Lang;
}

export const timeline: TimelineEntry[] = [
  {
    id: "ancient",
    era: "Ancient Kashmir & the Nilamata Purana",
    years: "Before 600 CE",
    fact: "An old text called the Nilamata Purana tells the origin story of Kashmir as a valley drained from a great lake.",
    description:
      "The Nilamata Purana is a Sanskrit text from around the 6th–8th century CE. It describes Kashmir as a sacred land that once lay under water. The sage Kashyapa is said to have drained the lake so people could live there. The text also lists the festivals and rituals of early Kashmir.",
    people: ["Sage Kashyapa", "Nila (Naga king)"],
    sources: [
      "Ved Kumari Ghai, The Nilamata Purana (1968)",
      "M. A. Stein, Kalhana's Rajatarangini: Introduction",
    ],
    lang: "en",
  },
  {
    id: "kalhana",
    era: "Kalhana & the Rajatarangini",
    years: "c. 1148–1150 CE",
    fact: "Kalhana wrote the Rajatarangini, one of the earliest known histories written in South Asia.",
    description:
      "Kalhana was a Kashmiri Sanskrit poet. His book Rajatarangini (\"River of Kings\") tells the story of the kings of Kashmir over many centuries. It uses old records, coins, and inscriptions. Historians still use it today to understand early Kashmir.",
    people: ["Kalhana"],
    sources: [
      "M. A. Stein, Kalhana's Rajatarangini: A Chronicle of the Kings of Kashmir (1900)",
      "Encyclopaedia Britannica: Kalhana",
    ],
    lang: "en",
  },
  {
    id: "karkota",
    era: "Karkota Dynasty & Lalitaditya Muktapida",
    years: "c. 625–855 CE",
    fact: "Lalitaditya Muktapida built the famous Martand Sun Temple and expanded the kingdom widely.",
    description:
      "The Karkota dynasty made Kashmir a strong power in early medieval South Asia. Its greatest king, Lalitaditya Muktapida (c. 724–760 CE), led long military campaigns. He also built the Martand Sun Temple, whose ruins still stand in Anantnag today.",
    people: ["Durlabhavardhana", "Lalitaditya Muktapida", "Jayapida"],
    sources: [
      "Kalhana, Rajatarangini (Book IV)",
      "Ronald M. Davidson, Indian Esoteric Buddhism (2002)",
    ],
    lang: "en",
  },
  {
    id: "utpala",
    era: "Utpala Dynasty & Avantivarman",
    years: "855–1003 CE",
    fact: "King Avantivarman rebuilt Kashmir's economy and started large water works in the valley.",
    description:
      "The Utpala dynasty followed the Karkotas. King Avantivarman (855–883 CE) is remembered for peace and good rule. His engineer Suyya redirected rivers and reduced flooding. The town of Avantipora and its temples were built during this time.",
    people: ["Avantivarman", "Suyya (engineer)", "Shankaravarman"],
    sources: [
      "Kalhana, Rajatarangini (Book V)",
      "André Wink, Al-Hind: The Making of the Indo-Islamic World, Vol. 1",
    ],
    lang: "en",
  },
  {
    id: "lohara",
    era: "Lohara Dynasty",
    years: "1003–1320 CE",
    fact: "The Lohara kings ruled Kashmir for over three centuries, a long but troubled period.",
    description:
      "The Lohara dynasty was founded by Sangramaraja. It saw many strong queens and kings, including Queen Didda, who ruled with great skill. Later Lohara rule was weakened by court fights and heavy taxes. This period ends the long line of Hindu kings in Kashmir.",
    people: ["Sangramaraja", "Queen Didda", "Harsha of Kashmir"],
    sources: [
      "Kalhana, Rajatarangini (Books VI–VIII)",
      "Mohibbul Hasan, Kashmir Under the Sultans (1959)",
    ],
    lang: "en",
  },
  {
    id: "shahmir",
    era: "Shah Mir Sultanate",
    years: "Founded 1339 CE",
    fact: "Shah Mir founded the first Muslim sultanate of Kashmir in 1339 CE.",
    description:
      "Shah Mir came to Kashmir as a court official and later took power in 1339 CE. His dynasty ruled for about 200 years. During this time Islam spread peacefully in the valley, often through Sufi teachers like Bulbul Shah and later Mir Sayyid Ali Hamadani.",
    people: ["Shah Mir", "Bulbul Shah", "Mir Sayyid Ali Hamadani"],
    sources: [
      "Mohibbul Hasan, Kashmir Under the Sultans (1959)",
      "Chitralekha Zutshi, Kashmir's Contested Pasts (2014)",
    ],
    lang: "en",
  },
  {
    id: "budshah",
    era: "Sultan Zain-ul-Abidin \"Budshah\"",
    years: "1420–1470 CE",
    fact: "Budshah is remembered as a fair king who supported art, music, and crafts like papier-mâché and shawls.",
    description:
      "Sultan Zain-ul-Abidin, known as Budshah (\"the Great King\"), ruled Kashmir for about 50 years. He brought back Hindus who had left, respected all religions, and translated Sanskrit works into Persian. He invited artists from Central Asia, which helped shape Kashmiri crafts we know today.",
    people: ["Sultan Zain-ul-Abidin", "Shrivara (court poet)"],
    sources: [
      "Mohibbul Hasan, Kashmir Under the Sultans (1959)",
      "Shrivara, Jaina-Rajatarangini",
    ],
    lang: "en",
  },
  {
    id: "chak",
    era: "Chak Dynasty",
    years: "1554–1586 CE",
    fact: "The Chak kings were the last independent rulers of Kashmir before Mughal rule.",
    description:
      "The Chaks were a local Kashmiri family that took power after the Shah Mirs weakened. Their rule was short and full of conflict. They resisted the Mughals for years, but were finally defeated in 1586.",
    people: ["Ghazi Shah Chak", "Yusuf Shah Chak", "Yaqub Shah Chak"],
    sources: [
      "Mohibbul Hasan, Kashmir Under the Sultans (1959)",
      "Chitralekha Zutshi, Languages of Belonging (2004)",
    ],
    lang: "en",
  },
  {
    id: "mughal",
    era: "Mughal Rule",
    years: "1586–1752 CE",
    fact: "Emperor Akbar brought Kashmir into the Mughal Empire in 1586.",
    description:
      "Under the Mughals, Kashmir became a favourite summer retreat. Emperor Jahangir and his queen Nur Jahan built famous gardens like Shalimar and Nishat around Dal Lake. Persian became the language of administration and literature grew strongly.",
    people: ["Akbar", "Jahangir", "Nur Jahan", "Shah Jahan"],
    sources: [
      "Chitralekha Zutshi, Languages of Belonging (2004)",
      "Richard M. Eaton, India in the Persianate Age (2019)",
    ],
    lang: "en",
  },
  {
    id: "afghan",
    era: "Afghan Durrani Rule",
    years: "1753–1819 CE",
    fact: "The Durrani rulers from Afghanistan controlled Kashmir for about 66 years.",
    description:
      "The Afghan period is often described in Kashmiri memory as harsh, with heavy taxes on farmers and craftspeople. Governors were sent from Kabul and changed often. Despite this, the shawl trade and Sufi traditions continued.",
    people: ["Ahmad Shah Durrani", "Various Afghan governors"],
    sources: [
      "Chitralekha Zutshi, Languages of Belonging (2004)",
      "Mridu Rai, Hindu Rulers, Muslim Subjects (2004)",
    ],
    lang: "en",
  },
  {
    id: "sikh",
    era: "Sikh Rule",
    years: "1819–1846 CE",
    fact: "Maharaja Ranjit Singh's forces took Kashmir from the Afghans in 1819.",
    description:
      "Sikh rule under Ranjit Singh's empire lasted about 27 years. Governors were sent from Lahore. Taxes stayed high for farmers and shawl weavers. This period ended after the First Anglo-Sikh War and the Treaty of Amritsar in 1846.",
    people: ["Maharaja Ranjit Singh", "Colonel Mihan Singh"],
    sources: [
      "Mridu Rai, Hindu Rulers, Muslim Subjects (2004)",
      "Chitralekha Zutshi, Languages of Belonging (2004)",
    ],
    lang: "en",
  },
  {
    id: "dogra",
    era: "Dogra Rule",
    years: "1846–1947 CE",
    fact: "The British sold Kashmir to Gulab Singh in 1846 through the Treaty of Amritsar, starting Dogra rule.",
    description:
      "By the Treaty of Amritsar (1846), Gulab Singh of Jammu became Maharaja of a large princely state that included Kashmir. His family, the Dogra dynasty, ruled until 1947. The period saw new schools and roads, but also long social movements for rights among Kashmiris.",
    people: ["Gulab Singh", "Ranbir Singh", "Pratap Singh", "Hari Singh"],
    sources: [
      "Mridu Rai, Hindu Rulers, Muslim Subjects (2004)",
      "Chitralekha Zutshi, Languages of Belonging (2004)",
    ],
    lang: "en",
  },
];
