export type Lang = "en";

export interface CivicExplainer {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  sources: string[];
  publishedDate: string;
  lastReviewedDate: string;
  lang: Lang;
}

export const civicExplainers: CivicExplainer[] = [
  {
    id: "rti",
    title: "How to file an RTI",
    summary:
      "The Right to Information Act, 2005 lets any Indian citizen ask a public authority for information. It is a simple, low-cost way to make government more open.",
    steps: [
      "Write your question clearly on plain paper. One request can cover one subject.",
      "Address it to the Public Information Officer (PIO) of the department you are asking.",
      "Pay the small fee (usually ₹10) by cash, postal order, or demand draft. People below the poverty line do not pay.",
      "Send it by post or hand it in. Keep a copy for yourself.",
      "The PIO must reply within 30 days. If you do not get an answer, you can file a first appeal, and then go to the Information Commission.",
    ],
    sources: [
      "Right to Information Act, 2005 — indiacode.nic.in",
      "Central Information Commission — cic.gov.in",
      "Government of India RTI portal — rtionline.gov.in",
    ],
    publishedDate: "2026-07-21",
    lastReviewedDate: "2026-07-21",
    lang: "en",
  },
  {
    id: "consumer",
    title: "Your consumer rights",
    summary:
      "The Consumer Protection Act, 2019 protects you when you buy goods or services. If something is faulty, unsafe, or falsely advertised, you have the right to complain.",
    steps: [
      "Keep the bill, receipt, or online order confirmation. These are your main proof.",
      "First, contact the seller or company and ask them to fix, replace, or refund.",
      "If they do not help, call the National Consumer Helpline on 1915 or file a complaint at consumerhelpline.gov.in.",
      "For bigger disputes you can file a case at the District, State, or National Consumer Disputes Redressal Commission.",
      "There is no need for a lawyer for smaller cases; the process is designed to be simple.",
    ],
    sources: [
      "Consumer Protection Act, 2019 — indiacode.nic.in",
      "National Consumer Helpline — consumerhelpline.gov.in",
      "Department of Consumer Affairs — consumeraffairs.nic.in",
    ],
    publishedDate: "2026-07-21",
    lastReviewedDate: "2026-07-21",
    lang: "en",
  },
  {
    id: "cybercrime",
    title: "How to report cybercrime",
    summary:
      "If you face online fraud, blackmail, hacking, or fake profiles, you can report it to the police through India's national cybercrime portal or by phone.",
    steps: [
      "For financial fraud (UPI, cards, wallets), call the helpline 1930 as soon as possible — fast reporting can help freeze the money.",
      "For all cybercrimes, file a report at cybercrime.gov.in. Women and children can file anonymously.",
      "Keep all evidence: screenshots, messages, transaction IDs, phone numbers, and URLs.",
      "Do not share OTPs, passwords, or personal ID numbers with anyone — no bank or officer will ever ask for them.",
      "You can also visit your nearest police station and ask them to record the complaint.",
    ],
    sources: [
      "National Cyber Crime Reporting Portal — cybercrime.gov.in",
      "Ministry of Home Affairs, Indian Cyber Crime Coordination Centre (I4C)",
      "Cyber Financial Fraud Helpline — 1930",
    ],
    publishedDate: "2026-07-21",
    lastReviewedDate: "2026-07-21",
    lang: "en",
  },
  {
    id: "verify-news",
    title: "How to check if news is real",
    summary:
      "Fake news and rumours spread fast on WhatsApp and social media. A few simple checks can protect you and your family from being misled.",
    steps: [
      "Pause before you forward. If a message makes you very angry or scared, that is a warning sign.",
      "Search a few words from the message online to see if any trusted news site is reporting it.",
      "For images, use a reverse image search (Google Images or TinEye) to see where the picture first appeared.",
      "Check PIB Fact Check (factcheck.pib.gov.in) for government-related claims.",
      "Trust established outlets and official accounts over anonymous forwards and new pages.",
    ],
    sources: [
      "Press Information Bureau Fact Check — factcheck.pib.gov.in",
      "Google Reverse Image Search — images.google.com",
      "International Fact-Checking Network (IFCN) — ifcncodeofprinciples.poynter.org",
    ],
    publishedDate: "2026-07-21",
    lastReviewedDate: "2026-07-21",
    lang: "en",
  },
];
