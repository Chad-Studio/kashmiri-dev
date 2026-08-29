export type Lang = "en";

export interface TimelinePerson {
  name: string;
  note: string;
}

export interface Spotlight {
  title: string;
  body: string;
}

export interface TimelineEntry {
  id: string;
  era: string;
  years: string;
  summary: string;
  fact: string;
  paragraphs: string[];
  developments: string[];
  people: TimelinePerson[];
  spotlight?: Spotlight;
  legendary?: boolean;
  sources: string[];
  lang: Lang;
}

export const timeline: TimelineEntry[] = [
  {
    id: "origin-legend",
    era: "The Origin Legend (Nilamata Purana)",
    years: "Ancient legend",
    summary: "The old story of how the valley was born from a lake.",
    fact: "An old text says Kashmir was once a great lake, drained by the sage Kashyapa.",
    paragraphs: [
      "The Nilamata Purana is an old Sanskrit text, written around the 6th to 8th century CE. It tells the origin story of Kashmir.",
      "In the story, the valley was once a huge lake called Satisar. A water demon lived there and troubled the Naga (serpent) gods. The sage Kashyapa, with the help of the gods, drained the lake so people could live in the valley. Many people believe the name 'Kashmir' comes from Kashyapa.",
      "The text also lists the festivals, rivers, and holy places of early Kashmir. It mixed local Naga nature-worship with wider Hindu beliefs. Kalhana later used it as one of his sources.",
    ],
    developments: [
      "Explains the name 'Kashmir' (from the sage Kashyapa)",
      "Shows early Naga (serpent) nature-worship in the valley",
      "Lists the old festivals and holy places of Kashmir",
    ],
    people: [
      { name: "Kashyapa", note: "the sage who, in legend, drained the lake" },
      { name: "Nila", note: "king of the Naga serpent gods" },
    ],
    legendary: true,
    sources: [
      "Ved Kumari Ghai, The Nilamata Purana",
      "M. A. Stein, Kalhana's Rajatarangini: Introduction (1900)",
    ],
    lang: "en",
  },
  {
    id: "prehistoric",
    era: "Prehistoric & Ancient Kashmir",
    years: "Before 625 CE",
    summary:
      "The valley's oldest past — Stone Age villages, Emperor Ashoka, and a great Buddhist age.",
    fact: "People lived in Kashmir over 4,000 years ago. Later it became a famous centre of Buddhist learning.",
    paragraphs: [
      "The oldest signs of people in Kashmir come from Burzahom, near Srinagar. From about 3000 BCE, people there lived in deep pits dug into the ground to stay warm. They used stone and bone tools and made grey pottery. Some were even buried with their dogs.",
      "Around 250 BCE, the Indian emperor Ashoka is said to have founded the old city of Srinagari, near today's Srinagar, and built Buddhist shrines. Buddhism grew strong in the valley in these years.",
      "Under the Kushan king Kanishka, about the 1st to 2nd century CE, Kashmir hosted the Fourth Buddhist Council. From Kashmir, Buddhism spread to Tibet and Central Asia.",
      "Kalhana's chronicle names very old kings before this time, but their stories mix history with legend. Kashmir's history becomes clear and reliable only from about 625 CE.",
    ],
    developments: [
      "Burzahom: pit dwellings, stone and bone tools, and early farming (about 3000–1000 BCE)",
      "Emperor Ashoka linked to the founding of Srinagari and early Buddhist shrines",
      "The Fourth Buddhist Council makes Kashmir a world centre of Buddhist learning",
      "Buddhism carried from Kashmir to Tibet and Central Asia",
    ],
    people: [
      { name: "Ashoka", note: "Mauryan emperor linked to the founding of Srinagari" },
      { name: "Kanishka", note: "Kushan king; the Fourth Buddhist Council was held in his time" },
      { name: "Vasumitra", note: "scholar who led the Fourth Buddhist Council" },
    ],
    spotlight: {
      title: "The Fourth Buddhist Council",
      body: "Under King Kanishka, around the 1st to 2nd century CE, Buddhist scholars met in Kashmir for the Fourth Buddhist Council. Led by the scholar Vasumitra, they organised the teachings of one Buddhist school and produced a large commentary. This helped Kashmir become a famous place of Buddhist study, and monks carried the religion from here to Tibet and Central Asia.",
    },
    sources: [
      "Encyclopaedia Britannica: Burzahom",
      "M. A. Stein, Kalhana's Rajatarangini: Introduction (1900)",
    ],
    lang: "en",
  },
  {
    id: "kalhana",
    era: "Kalhana & the Rajatarangini",
    years: "c. 1148–1150 CE",
    summary: "Kashmir's own great history book — one of the oldest in India.",
    fact: "Kalhana wrote the Rajatarangini, one of the earliest true histories written in India.",
    paragraphs: [
      "Kalhana was a Kashmiri Brahmin scholar. Around 1148 to 1150 CE he wrote the Rajatarangini, which means 'River of Kings'. It tells the story of Kashmir's rulers from very old times to his own day.",
      "The book is written in Sanskrit verse and is divided into eight parts. Kalhana used old records, land grants, coins, and inscriptions. He said a good historian should write without love or hatred.",
      "Scholars say the early parts mix legend with history, but the book becomes reliable from the Karkota kings onward. Later writers like Jonaraja and Srivara continued the story into the Sultan period. Sir Aurel Stein translated it into English in 1900.",
    ],
    developments: [
      "One of the earliest works of true history in India",
      "A key source for almost everything we know about early Kashmir",
      "Continued by later writers (Jonaraja, Srivara) into the 1400s",
    ],
    people: [
      { name: "Kalhana", note: "author of the Rajatarangini" },
      { name: "Aurel Stein", note: "scholar who translated and edited it in 1900" },
      { name: "Jonaraja", note: "later writer who continued the chronicle" },
    ],
    sources: [
      "Encyclopaedia Britannica: Rajatarangini",
      "M. A. Stein, Kalhana's Rajatarangini (1900)",
    ],
    lang: "en",
  },
  {
    id: "karkota",
    era: "Karkota Dynasty & Lalitaditya Muktapida",
    years: "c. 625–855 CE",
    summary: "A powerful age of conquest, canals, and the great Martand Sun Temple.",
    fact: "King Lalitaditya built the famous Martand Sun Temple and made Kashmir strong and wide.",
    paragraphs: [
      "The Karkota dynasty was founded by Durlabhavardhana around 625 CE. This is when Kashmir's history becomes clear and reliable. The Chinese pilgrim Xuanzang visited during his reign.",
      "The greatest Karkota king was Lalitaditya Muktapida, who ruled about 724 to 760 CE. Kalhana describes him as a great conqueror who led campaigns across north India and Central Asia. Modern historians think some of these claims were made larger later, but he was still the most powerful king of his line.",
      "Lalitaditya was a great builder. He founded a new capital at Parihasapura, dug canals and water-wheels for farming, and built many shrines. His most famous work is the Martand Sun Temple. He supported both Hindu and Buddhist worship.",
    ],
    developments: [
      "Kashmir becomes a strong regional power",
      "The Martand Sun Temple and the new capital Parihasapura are built",
      "Canals and water-wheels improve farming",
      "Both Hindu and Buddhist worship supported",
    ],
    people: [
      { name: "Durlabhavardhana", note: "founder of the Karkota dynasty (about 625 CE)" },
      { name: "Lalitaditya Muktapida", note: "greatest king; built the Martand Sun Temple" },
    ],
    spotlight: {
      title: "The Martand Sun Temple",
      body: "King Lalitaditya built the Martand Sun Temple in the 8th century, near today's Anantnag. It honoured Surya, the sun god. A central shrine stood in a courtyard ringed by 84 smaller shrines. Its style mixed Indian and classical Greek-Roman ideas, with the special Kashmiri three-part arch. The temple was destroyed in the early 1400s and later damaged by earthquakes. Its grand ruins still stand today.",
    },
    sources: [
      "Kalhana, Rajatarangini (Book IV), trans. M. A. Stein",
      "John Siudmak, The Hindu-Buddhist Sculpture of Ancient Kashmir (2013)",
    ],
    lang: "en",
  },
  {
    id: "utpala",
    era: "Utpala Dynasty & Avantivarman",
    years: "855–1003 CE",
    summary: "Peace, great river engineering, and a golden age of learning.",
    fact: "King Avantivarman's engineer Suyya tamed the rivers and made food cheap for all.",
    paragraphs: [
      "Avantivarman, who ruled from 855 to 883 CE, founded the Utpala dynasty. After years of civil war, he chose peace and rebuilding instead of conquest.",
      "His greatest work came through his brilliant engineer Suyya. Suyya cleared and controlled the Jhelum river, built embankments and channels, and drained flooded land. This gave farmers much more land, food prices fell sharply, and hunger fell too. The town of Sopore is named after him.",
      "Avantivarman founded the town of Avantipura and built two great temples there, whose ruins still stand. His court was a golden age of learning. The famous thinker Anandavardhana, who wrote an important book on poetry, lived under his care. Powerful queens, like Sugandha, also ruled in this age.",
    ],
    developments: [
      "Suyya's river works greatly expand farmland and lower food prices",
      "Avantipura town and its temples are built",
      "A golden age of Sanskrit poetry and thought (Anandavardhana)",
    ],
    people: [
      { name: "Avantivarman", note: "founder of the Utpala dynasty; chose peace" },
      { name: "Suyya", note: "engineer who tamed the Jhelum and expanded farmland" },
      { name: "Anandavardhana", note: "famous scholar of poetry at his court" },
    ],
    spotlight: {
      title: "The Sharada script and Sharada Peeth",
      body: "Kashmir was once called 'Sharada Desh', the land of Sharada, goddess of learning. The Sharada Peeth, a temple and centre of study on the Kishanganga river, was one of the most famous places of learning in the subcontinent for centuries. It gave its name to the Sharada script, which was used to write Sanskrit and Kashmiri for a very long time.",
    },
    sources: [
      "Kalhana, Rajatarangini (Book V), trans. M. A. Stein",
      "André Wink, Al-Hind: The Making of the Indo-Islamic World, Vol. 1",
    ],
    lang: "en",
  },
  {
    id: "lohara",
    era: "Lohara Dynasty",
    years: "1003–1320 CE",
    summary: "The age of Queen Didda and the last Hindu kings before Islam arrived.",
    fact: "Queen Didda ruled Kashmir with great skill and founded the Lohara dynasty's line.",
    paragraphs: [
      "Queen Didda was the key figure of this age. She first ruled as regent for young kings and then ruled in her own right until 1003 CE. She was known for her strong and skilful, sometimes ruthless, politics.",
      "Having no heir, Didda adopted her nephew Samgramaraja, who founded the Lohara dynasty. Under him, the forces of Mahmud of Ghazni failed to capture Kashmir's hill fort.",
      "The best-known later king was Harsha, who ruled from 1089 to 1101. He was cultured but spent too much money and looted temples to pay for it. The later Lohara period was weakened by court fights and powerful landlords called Damaras. Around 1320 a foreign raid brought great disorder, and soon after, Muslim rule began.",
    ],
    developments: [
      "Queen Didda rules for decades, one of Kashmir's great queens",
      "Mahmud of Ghazni's forces fail to take the valley",
      "Court conflict and powerful landlords weaken the kingdom",
      "This is the last age of Hindu kings in Kashmir",
    ],
    people: [
      { name: "Queen Didda", note: "ruled for decades; founded the Lohara line" },
      { name: "Samgramaraja", note: "founder of the Lohara dynasty" },
      { name: "Harsha", note: "cultured but reckless later king" },
      { name: "Abhinavagupta", note: "great philosopher of Kashmir Shaivism" },
    ],
    spotlight: {
      title: "Kashmir Shaivism",
      body: "One of Kashmir's greatest gifts to the world is Kashmir Shaivism, a deep school of Hindu philosophy. It grew from the 9th century. It teaches that a person can find freedom by 'recognising' that their true self is one with Shiva, the universal consciousness. Its greatest thinker was Abhinavagupta, who lived about 950 to 1020 CE — a philosopher, mystic, and writer on art whose work is still studied today.",
    },
    sources: [
      "Kalhana, Rajatarangini (Books VI–VIII), trans. M. A. Stein",
      "Mohibbul Hasan, Kashmir Under the Sultans (1959)",
    ],
    lang: "en",
  },
  {
    id: "shahmir",
    era: "Shah Mir Sultanate",
    years: "Founded 1339 CE",
    summary: "Islam takes root in the valley, mostly through Sufi teachers.",
    fact: "Shah Mir founded Kashmir's first lasting Muslim dynasty in 1339 CE.",
    paragraphs: [
      "Islam came to Kashmir mostly in a peaceful way, through Sufi teachers, not by conquest. The first Sufi, Bulbul Shah, guided a Ladakhi prince named Rinchana, who became the valley's first Muslim ruler from 1320 to 1323 and took the name Sadr-ud-Din.",
      "After a short return of Hindu rule, a court noble named Shah Mir took the throne in 1339 CE as Sultan Shams-ud-Din. He founded the Shah Mir dynasty, which ruled for about 200 years.",
      "The most important teacher of this age was Mir Sayyid Ali Hamadani, who lived from 1314 to 1384 and is known as Shah-e-Hamadan. He came from Persia and, by tradition, brought many followers and skilled craftsmen. He deepened Islam in the valley and helped bring Persian crafts like shawl weaving. His shrine, the Khanqah-e-Moula, is a masterpiece of Kashmiri wooden building.",
    ],
    developments: [
      "Rinchana becomes the first Muslim ruler (1320–1323)",
      "Shah Mir founds a dynasty that lasts about 200 years",
      "Sufi teachers, above all Mir Sayyid Ali Hamadani, spread Islam",
      "Persian crafts grow — Kashmir is called 'Little Iran'",
    ],
    people: [
      { name: "Bulbul Shah", note: "first Sufi in Kashmir; guided Rinchana" },
      { name: "Rinchana (Sadr-ud-Din)", note: "the valley's first Muslim ruler" },
      { name: "Shah Mir (Shams-ud-Din)", note: "founder of the Shah Mir dynasty" },
      { name: "Mir Sayyid Ali Hamadani", note: "great Sufi teacher; deepened Islam and crafts" },
    ],
    spotlight: {
      title: "Lal Ded and Nund Rishi",
      body: "Two beloved saints shaped Kashmiri identity in this age. Lal Ded, who lived about 1320 to 1392, was a wandering mystic whose short verses, called vakhs, are among the oldest in the Kashmiri language; Hindus and Muslims both honour her. Nund Rishi, who lived from 1377 to 1438 and is called Alamdar-e-Kashmir, founded the local Rishi order and preached peace, simple living, and care for nature: 'Food will last only as long as the forests last.' Together they stand for Kashmir's shared, peaceful spirit.",
    },
    sources: [
      "Mohibbul Hasan, Kashmir Under the Sultans (1959)",
      "Mohammad Ishaq Khan, Kashmir's Transition to Islam (1994)",
    ],
    lang: "en",
  },
  {
    id: "budshah",
    era: 'Sultan Zain-ul-Abidin "Budshah"',
    years: "1420–1470 CE",
    summary: "A golden age of tolerance, learning, and the arts under a beloved king.",
    fact: "Budshah brought back Hindus, ended extra taxes, and supported art and learning.",
    paragraphs: [
      "Sultan Zain-ul-Abidin, lovingly called Budshah ('the Great King'), ruled for about 50 years. He reversed the harder policies of the past, and he is often compared to the Mughal emperor Akbar.",
      "Budshah practised tolerance. He invited back Kashmiri Pandits who had left, let people return to their old faith, allowed temples to be rebuilt, and ended the special tax on non-Muslims.",
      "He loved learning and the arts. He set up a bureau to translate Sanskrit books, like the Mahabharata and the Rajatarangini, into Persian. He wrote poetry himself and supported scholars like Jonaraja and Srivara. He sent Kashmiris abroad to learn crafts, which helped papier-mâché, wood carving, carpets, and shawls grow. His last years were hard, with famine and family rebellion.",
    ],
    developments: [
      "Religious tolerance: Pandits welcomed back, the jizya tax ended, temples rebuilt",
      "A bureau translates Sanskrit works into Persian",
      "Crafts flourish: papier-mâché, wood carving, carpets, shawls",
      "Remembered as the golden age of the Sultanate",
    ],
    people: [
      { name: "Zain-ul-Abidin (Budshah)", note: "tolerant king; golden age of the Sultanate" },
      { name: "Jonaraja", note: "court historian who continued the Rajatarangini" },
      { name: "Srivara", note: "poet and chronicler at his court" },
    ],
    sources: [
      "Mohibbul Hasan, Kashmir Under the Sultans (1959)",
      "Jonaraja and Srivara, Rajatarangini continuations",
    ],
    lang: "en",
  },
  {
    id: "chak",
    era: "Chak Dynasty",
    years: "1561–1586 CE",
    summary: "The last independent Kashmiri kings, before Mughal conquest.",
    fact: "The Chaks were the last kings to rule Kashmir as an independent land.",
    paragraphs: [
      "The Chaks were originally Dards from the Gilgit area who had settled in Kashmir and grown powerful as soldiers. In 1561 Ghazi Shah Chak took the throne from the last Shah Mir sultan.",
      "The Chaks were brave fighters and pushed back several Mughal attacks. Their most famous king was Yusuf Shah Chak, the last independent ruler of Kashmir.",
      "When Akbar's army came, Yusuf Shah went to negotiate and was imprisoned and exiled instead. By tradition, his beloved, the poetess Habba Khatoon, had warned him not to go. His son Yaqub Shah led a last resistance in 1586, but Kashmir was taken into the Mughal Empire.",
    ],
    developments: [
      "The last age of an independent Kashmir",
      "The Chaks repel several Mughal attacks before falling",
      "Yusuf Shah Chak is exiled; his son Yaqub leads the final resistance",
    ],
    people: [
      { name: "Ghazi Shah Chak", note: "founder of the Chak dynasty (1561)" },
      { name: "Yusuf Shah Chak", note: "last independent king of Kashmir" },
      { name: "Yaqub Shah Chak", note: "led the final resistance to the Mughals" },
      { name: "Habba Khatoon", note: "poetess and queen; the 'Nightingale of Kashmir'" },
    ],
    spotlight: {
      title: "Habba Khatoon, the Nightingale of Kashmir",
      body: "Habba Khatoon, born Zoon, was a village girl from near Pampore who became a famous poetess and the queen of Yusuf Shah Chak. Her tender love songs, called 'lol', brought new feeling into Kashmiri poetry. Many of her songs are still sung in the valley today. She is remembered as the 'Nightingale of Kashmir'.",
    },
    sources: [
      "Mohibbul Hasan, Kashmir Under the Sultans (1959)",
      "R. K. Parmu, A History of Muslim Rule in Kashmir",
    ],
    lang: "en",
  },
  {
    id: "mughal",
    era: "Mughal Rule",
    years: "1586–1752 CE",
    summary: "Kashmir becomes the emperors' summer garden.",
    fact: "Emperor Akbar brought Kashmir into the Mughal Empire in 1586.",
    paragraphs: [
      "Emperor Akbar took Kashmir in 1586 during Chak infighting. He visited three times and strengthened the Hari Parbat hill in Srinagar. He is said to have called Kashmir a garden.",
      "Under the Mughals, Kashmir became a beloved summer retreat and the great age of garden building. Emperor Jahangir loved the valley deeply. He and his son Shah Jahan built the famous terraced gardens: Shalimar Bagh, Nishat Bagh, Chashme Shahi, Verinag, and the hillside Pari Mahal.",
      "The shawl industry grew rich under Mughal support, and pashmina shawls became prized royal gifts. Kashmir was ruled as a province by governors sent from the court, and Mughal power slowly weakened in the 1700s.",
    ],
    developments: [
      "Famous Mughal gardens built: Shalimar, Nishat, Chashme Shahi, Pari Mahal",
      "Hari Parbat hill fortified; new townships built",
      "The pashmina shawl becomes a prized royal gift",
      "Kashmir governed as a province from the imperial court",
    ],
    people: [
      { name: "Akbar", note: "Mughal emperor who annexed Kashmir in 1586" },
      { name: "Jahangir", note: "emperor who loved Kashmir and built its gardens" },
      { name: "Shah Jahan", note: "continued the great garden building" },
      { name: "Nur Jahan", note: "empress who built the Pathar Masjid" },
    ],
    sources: ["Abul Fazl, Ain-i-Akbari", "UNESCO: Mughal Gardens in Kashmir (tentative list)"],
    lang: "en",
  },
  {
    id: "afghan",
    era: "Afghan Durrani Rule",
    years: "1753–1819 CE",
    summary: "A hard century remembered for heavy taxes and cruelty.",
    fact: "The Durrani rulers of Afghanistan controlled Kashmir for about 66 years.",
    paragraphs: [
      "Ahmad Shah Durrani of Afghanistan took Kashmir around 1752 to 1753, as the Mughal Empire fell apart. Afghan rule is remembered as one of the hardest times in the valley's history.",
      "After an early rebellion failed, the Afghan governors ruled with heavy taxes and harsh treatment. Historians record that people of all communities suffered. Income from Kashmir was an important part of Afghan revenue.",
      "Even so, the shawl trade and Sufi traditions continued. It was under the Afghans that the fort on top of Hari Parbat was largely built.",
    ],
    developments: [
      "One of the harshest periods in Kashmir's history",
      "Heavy taxes and hardship fall on all communities",
      "The shawl trade and Sufi life continue",
      "The Hari Parbat hill fort is largely built",
    ],
    people: [
      { name: "Ahmad Shah Durrani", note: "Afghan ruler who took Kashmir (about 1752)" },
      { name: "Sukh Jiwan Mal", note: "governor whose rebellion was crushed" },
    ],
    sources: [
      "Victoria Schofield, Kashmir in Conflict (2000)",
      "R. K. Parmu, A History of Muslim Rule in Kashmir",
    ],
    lang: "en",
  },
  {
    id: "sikh",
    era: "Sikh Rule",
    years: "1819–1846 CE",
    summary: "Punjab's Sikh empire rules the valley for 27 years.",
    fact: "Maharaja Ranjit Singh's army took Kashmir from the Afghans in 1819.",
    paragraphs: [
      "Maharaja Ranjit Singh of the Sikh Empire drove the Afghans out and won Kashmir at the Battle of Shopian on 3 July 1819. Tired of Afghan rule, Kashmiris at first welcomed the change.",
      "But Sikh rule was also felt as hard, partly because the valley was far from Lahore. Some laws pressed on the Muslim majority, such as closing the main mosque and banning the public call to prayer, though some were later eased.",
      "European travellers now began to visit and wrote about the poverty of the peasants and the heavy taxes. After a bad famine in 1832, the Sikhs lowered the land tax. In this age, the Dogra chief Gulab Singh of Jammu rose to power, and his general Zorawar Singh conquered Ladakh.",
    ],
    developments: [
      "Sikh victory at the Battle of Shopian (1819) ends Afghan rule",
      "Some laws press on the Muslim majority; later partly eased",
      "Heavy taxes and rural poverty recorded by European travellers",
      "Gulab Singh of Jammu and his general Zorawar Singh rise to power",
    ],
    people: [
      { name: "Ranjit Singh", note: "Sikh emperor who won Kashmir in 1819" },
      { name: "Gulab Singh", note: "Dogra chief of Jammu who rose to power" },
      { name: "Zorawar Singh", note: "general who conquered Ladakh" },
    ],
    sources: [
      "Victoria Schofield, Kashmir in Conflict (2000)",
      "William Moorcroft, Travels (1841)",
    ],
    lang: "en",
  },
  {
    id: "dogra",
    era: "Dogra Rule",
    years: "1846–1947 CE",
    summary: "A century of Dogra Maharajas, ending in 1947.",
    fact: "In 1846 the British sold Kashmir to Gulab Singh through the Treaty of Amritsar.",
    paragraphs: [
      "After the British defeated the Sikhs, they handed Kashmir to Gulab Singh of Jammu by the Treaty of Amritsar on 16 March 1846, for 75 lakh rupees. Gulab Singh became the first Maharaja of the new state of Jammu and Kashmir, under British oversight. Many Kashmiris remember this as being 'sold' without being asked.",
      "The Dogra family ruled for about a hundred years. It was a Hindu-ruled state with a large Muslim majority. Records describe heavy taxes, forced labour called 'begar', and hard lives for peasants and craftworkers.",
      "A terrible famine in 1877 to 1879 killed a large share of the valley's people. The British officer Walter Lawrence, who studied land and taxes, wrote in 1895 that he found the people 'sullen, desperate and suspicious'. Later land reforms brought some relief.",
    ],
    developments: [
      "The Treaty of Amritsar (1846) creates the princely state of Jammu and Kashmir",
      "A Hindu-ruled state with a Muslim-majority population (77% in 1941)",
      "Heavy taxes and the forced-labour system (begar)",
      "The famine of 1877–79 kills a large share of the population",
    ],
    people: [
      { name: "Gulab Singh", note: "first Dogra Maharaja of Jammu and Kashmir" },
      { name: "Hari Singh", note: "the last Maharaja" },
      {
        name: "Walter Lawrence",
        note: "British officer who recorded life and taxes in the valley",
      },
    ],
    spotlight: {
      title: "The pashmina shawl and the 1865 weavers' protest",
      body: "Kashmiri pashmina shawls became world-famous luxury goods, even worn by empresses in Europe. But the weavers lived in near-slavery, with a special department taking most of their pay. On 29 April 1865, unarmed shawl weavers marched in Srinagar against the taxes. Soldiers drove them onto a narrow bridge at Zaldagar, and many drowned. It is remembered as one of the earliest workers' protests in the world.",
    },
    sources: [
      "Treaty of Amritsar (1846)",
      "Walter Lawrence, The Valley of Kashmir (1895)",
      "Mridu Rai, Hindu Rulers, Muslim Subjects (2004)",
    ],
    lang: "en",
  },
];
