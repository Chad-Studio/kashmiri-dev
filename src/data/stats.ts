export type StatsCategory = "population" | "literacy" | "education" | "economy";
export type StatsArea = "valley" | "jk";

export interface DistrictStats {
  id: string;
  name: string;
  censusName: string;
  population: number;
  malePopulation: number;
  femalePopulation: number;
  children: number;
  maleChildren: number;
  femaleChildren: number;
  literates: number;
  maleLiterates: number;
  femaleLiterates: number;
  lang: "en";
}

export const statsReviewedDate = "2026-11-13";

export const statsAreas = {
  valley: { label: "Kashmir Valley", description: "The ten districts listed below.", lang: "en" },
  jk: {
    label: "Jammu & Kashmir",
    description: "The wider union territory, including Jammu.",
    lang: "en",
  },
} as const;

export const statsCategories: { id: StatsCategory; label: string; lang: "en" }[] = [
  { id: "population", label: "Population", lang: "en" },
  { id: "literacy", label: "Literacy", lang: "en" },
  { id: "education", label: "Education", lang: "en" },
  { id: "economy", label: "Economy", lang: "en" },
];

export const statsSources = {
  census: {
    title: "Census of India 2011: Primary Census Abstract",
    shortTitle: "Census 2011",
    publisher: "Office of the Registrar General & Census Commissioner, India",
    url: "https://censusindia.gov.in/nada/index.php/catalog/6191",
    detail:
      "State and district workbook, PC11_PCA-SD. Population and literacy are calculated from the ten district records. The census records use some older district spellings.",
    lang: "en",
  },
  horticulture: {
    title: "Digest of Statistics 2023–24",
    shortTitle: "Digest 2023–24",
    publisher: "Directorate of Economics & Statistics, Jammu & Kashmir",
    url: "https://www.jkplanning.gov.in/pdf/Digest%20of%20Statistics%202023-24.pdf",
    detail:
      "Table 5.01, printed page 103. The apple area figure is the published total for Kashmir Division, in hectares.",
    lang: "en",
  },
  education: {
    title: "Economic Survey 2025–26: School Education",
    shortTitle: "Economic Survey 2025–26",
    publisher: "Directorate of Economics & Statistics, Jammu & Kashmir",
    url: "https://ecostatjk.nic.in/pdf/publications/ecosurvey/Economic%20Survey%202025-26_webCopy.pdf",
    detail:
      "School Education section. School counts refer to 2024–25 and cover the whole union territory. The source distinguishes government schools from other managements.",
    lang: "en",
  },
  economy: {
    title: "Jammu & Kashmir UT Profile: Macro Economic Aggregates",
    shortTitle: "J&K economic profile",
    publisher: "Planning Development & Monitoring Department, Jammu & Kashmir",
    url: "https://jkplanning.gov.in/profile.html",
    detail:
      "Macro Economic Aggregates, citing the Economic Survey 2025–26. Income and output are advance estimates at current prices for the whole union territory.",
    lang: "en",
  },
} as const;

// Raw Census 2011 counts. District codes identify the source workbook rows.
// Keep these counts so the regional literacy rate can be recomputed with the
// correct age-seven-and-above denominator, rather than averaging percentages.
export const districtStats: DistrictStats[] = [
  {
    id: "014",
    name: "Anantnag",
    censusName: "Anantnag",
    population: 1078692,
    malePopulation: 559767,
    femalePopulation: 518925,
    children: 208538,
    maleChildren: 113278,
    femaleChildren: 95260,
    literates: 545532,
    maleLiterates: 324417,
    femaleLiterates: 221115,
    lang: "en",
  },
  {
    id: "009",
    name: "Bandipora",
    censusName: "Bandipore",
    population: 392232,
    malePopulation: 207680,
    femalePopulation: 184552,
    children: 61754,
    maleChildren: 32641,
    femaleChildren: 29113,
    literates: 185979,
    maleLiterates: 117058,
    femaleLiterates: 68921,
    lang: "en",
  },
  {
    id: "008",
    name: "Baramulla",
    censusName: "Baramula",
    population: 1008039,
    malePopulation: 534733,
    femalePopulation: 473306,
    children: 164581,
    maleChildren: 88321,
    femaleChildren: 76260,
    literates: 545149,
    maleLiterates: 337170,
    femaleLiterates: 207979,
    lang: "en",
  },
  {
    id: "002",
    name: "Budgam",
    censusName: "Badgam",
    population: 753745,
    malePopulation: 398041,
    femalePopulation: 355704,
    children: 155202,
    maleChildren: 84720,
    femaleChildren: 70482,
    literates: 335649,
    maleLiterates: 207741,
    femaleLiterates: 127908,
    lang: "en",
  },
  {
    id: "011",
    name: "Ganderbal",
    censusName: "Ganderbal",
    population: 297446,
    malePopulation: 158720,
    femalePopulation: 138726,
    children: 50594,
    maleChildren: 27159,
    femaleChildren: 23435,
    literates: 143276,
    maleLiterates: 90581,
    femaleLiterates: 52695,
    lang: "en",
  },
  {
    id: "015",
    name: "Kulgam",
    censusName: "Kulgam",
    population: 424483,
    malePopulation: 217620,
    femalePopulation: 206863,
    children: 71501,
    maleChildren: 37929,
    femaleChildren: 33572,
    literates: 209085,
    maleLiterates: 125052,
    femaleLiterates: 84033,
    lang: "en",
  },
  {
    id: "001",
    name: "Kupwara",
    censusName: "Kupwara",
    population: 870354,
    malePopulation: 474190,
    femalePopulation: 396164,
    children: 188798,
    maleChildren: 100459,
    femaleChildren: 88339,
    literates: 439654,
    maleLiterates: 282823,
    femaleLiterates: 156831,
    lang: "en",
  },
  {
    id: "012",
    name: "Pulwama",
    censusName: "Pulwama",
    population: 560440,
    malePopulation: 293064,
    femalePopulation: 267376,
    children: 97374,
    maleChildren: 53234,
    femaleChildren: 44140,
    literates: 293958,
    maleLiterates: 178326,
    femaleLiterates: 115632,
    lang: "en",
  },
  {
    id: "013",
    name: "Shopian",
    censusName: "Shupiyan",
    population: 266215,
    malePopulation: 136480,
    femalePopulation: 129735,
    children: 41547,
    maleChildren: 22121,
    femaleChildren: 19426,
    literates: 136500,
    maleLiterates: 80355,
    femaleLiterates: 56145,
    lang: "en",
  },
  {
    id: "010",
    name: "Srinagar",
    censusName: "Srinagar",
    population: 1236829,
    malePopulation: 651124,
    femalePopulation: 585705,
    children: 158300,
    maleChildren: 84897,
    femaleChildren: 73403,
    literates: 748584,
    maleLiterates: 431746,
    femaleLiterates: 316838,
    lang: "en",
  },
];

type CountField = Exclude<keyof DistrictStats, "id" | "name" | "censusName" | "lang">;
const total = (field: CountField) =>
  districtStats.reduce((sum, district) => sum + district[field], 0);

export function getLiteracyRate(district: DistrictStats) {
  return (district.literates / (district.population - district.children)) * 100;
}

export function getMaleLiteracyRate(district: DistrictStats) {
  return (district.maleLiterates / (district.malePopulation - district.maleChildren)) * 100;
}

export function getFemaleLiteracyRate(district: DistrictStats) {
  return (district.femaleLiterates / (district.femalePopulation - district.femaleChildren)) * 100;
}

export const valleySummary = {
  population: total("population"),
  literacy: (total("literates") / (total("population") - total("children"))) * 100,
  maleLiteracy: (total("maleLiterates") / (total("malePopulation") - total("maleChildren"))) * 100,
  femaleLiteracy:
    (total("femaleLiterates") / (total("femalePopulation") - total("femaleChildren"))) * 100,
};

export interface StatsIndicator {
  id: string;
  title: string;
  category: StatsCategory;
  area: StatsArea;
  value: number;
  format: "count" | "decimal" | "percent" | "points" | "crore" | "rupees";
  unit: string;
  period: string;
  kind: "Census count" | "Calculated" | "Reported" | "Advance estimate";
  description: string;
  sourceId: keyof typeof statsSources;
  locator: string;
  lang: "en";
}

export const statsIndicators: StatsIndicator[] = [
  {
    id: "population",
    title: "Population",
    category: "population",
    area: "valley",
    value: valleySummary.population,
    format: "count",
    unit: "people",
    period: "2011",
    kind: "Census count",
    description:
      "The combined population of Kashmir Valley’s ten districts. This is a historical census count, not a current population estimate.",
    sourceId: "census",
    locator: "Total population, ten district rows",
    lang: "en",
  },
  {
    id: "children",
    title: "Children aged 0–6",
    category: "population",
    area: "valley",
    value: total("children"),
    format: "count",
    unit: "children",
    period: "2011",
    kind: "Census count",
    description:
      "Children younger than seven in the same ten districts. This age group is excluded when calculating the literacy rate.",
    sourceId: "census",
    locator: "Population aged 0–6, ten district rows",
    lang: "en",
  },
  {
    id: "literacy",
    title: "Literacy rate",
    category: "literacy",
    area: "valley",
    value: valleySummary.literacy,
    format: "percent",
    unit: "of people aged 7+",
    period: "2011",
    kind: "Calculated",
    description:
      "Calculated from the total number of literate people and the population aged seven and above across all ten districts.",
    sourceId: "census",
    locator: "Literates ÷ population aged 7+",
    lang: "en",
  },
  {
    id: "male-literacy",
    title: "Male literacy rate",
    category: "literacy",
    area: "valley",
    value: valleySummary.maleLiteracy,
    format: "percent",
    unit: "of males aged 7+",
    period: "2011",
    kind: "Calculated",
    description: "Uses male literate counts and the male population aged seven and above.",
    sourceId: "census",
    locator: "Male literates ÷ male population aged 7+",
    lang: "en",
  },
  {
    id: "female-literacy",
    title: "Female literacy rate",
    category: "literacy",
    area: "valley",
    value: valleySummary.femaleLiteracy,
    format: "percent",
    unit: "of females aged 7+",
    period: "2011",
    kind: "Calculated",
    description: "Uses female literate counts and the female population aged seven and above.",
    sourceId: "census",
    locator: "Female literates ÷ female population aged 7+",
    lang: "en",
  },
  {
    id: "literacy-gap",
    title: "Male–female literacy gap",
    category: "literacy",
    area: "valley",
    value: valleySummary.maleLiteracy - valleySummary.femaleLiteracy,
    format: "points",
    unit: "percentage points",
    period: "2011",
    kind: "Calculated",
    description:
      "The difference between the male and female literacy rates. A percentage-point gap is different from a percentage change.",
    sourceId: "census",
    locator: "Male literacy rate minus female literacy rate",
    lang: "en",
  },
  {
    id: "schools",
    title: "Schools",
    category: "education",
    area: "jk",
    value: 24137,
    format: "count",
    unit: "schools",
    period: "2024–25",
    kind: "Reported",
    description:
      "The reported school total for the whole of Jammu & Kashmir, including Jammu. This is not a Kashmir Valley-only count.",
    sourceId: "education",
    locator: "School Education section",
    lang: "en",
  },
  {
    id: "government-schools",
    title: "Government schools",
    category: "education",
    area: "jk",
    value: 18724,
    format: "count",
    unit: "schools",
    period: "2024–25",
    kind: "Reported",
    description: "Government-managed schools across the whole union territory.",
    sourceId: "education",
    locator: "School Education section",
    lang: "en",
  },
  {
    id: "other-schools",
    title: "Schools under other managements",
    category: "education",
    area: "jk",
    value: 5413,
    format: "count",
    unit: "schools",
    period: "2024–25",
    kind: "Reported",
    description:
      "Schools under managements other than government, using the source’s classification.",
    sourceId: "education",
    locator: "School Education section",
    lang: "en",
  },
  {
    id: "apple-area",
    title: "Land under apple cultivation",
    category: "economy",
    area: "valley",
    value: 150615.41,
    format: "decimal",
    unit: "hectares",
    period: "2023–24",
    kind: "Reported",
    description:
      "The area under apple cultivation in Kashmir Division. Area measures land use, not the weight or value of apples produced.",
    sourceId: "horticulture",
    locator: "Table 5.01, printed page 103",
    lang: "en",
  },
  {
    id: "gsdp",
    title: "Size of the J&K economy",
    category: "economy",
    area: "jk",
    value: 285674,
    format: "crore",
    unit: "lakh crore rupees",
    period: "2025–26",
    kind: "Advance estimate",
    description:
      "Nominal Gross State Domestic Product (GSDP) for the whole union territory: approximately ₹2,85,674 crore at current prices. This is an estimate of total output.",
    sourceId: "economy",
    locator: "Macro Economic Aggregates",
    lang: "en",
  },
  {
    id: "per-capita-income",
    title: "J&K per-capita income",
    category: "economy",
    area: "jk",
    value: 168243,
    format: "rupees",
    unit: "per person, per year",
    period: "2025–26",
    kind: "Advance estimate",
    description:
      "The published nominal per-capita income estimate for the whole union territory. An average does not describe each person’s income.",
    sourceId: "economy",
    locator: "Macro Economic Aggregates",
    lang: "en",
  },
];

const wholeNumbers = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const decimals = new Intl.NumberFormat("en-GB", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatStatistic(indicator: StatsIndicator) {
  switch (indicator.format) {
    case "percent":
      return `${decimals.format(indicator.value)}%`;
    case "points":
    case "decimal":
      return decimals.format(indicator.value);
    case "crore":
      return `₹${decimals.format(indicator.value / 100000)}`;
    case "rupees":
      return `₹${wholeNumbers.format(indicator.value)}`;
    default:
      return wholeNumbers.format(indicator.value);
  }
}

export const formatCount = (value: number) => wholeNumbers.format(value);
export const formatRate = (value: number) => `${decimals.format(value)}%`;
