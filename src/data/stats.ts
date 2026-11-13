export type StatsCategory =
  | "population"
  | "literacy"
  | "education"
  | "work"
  | "economy"
  | "households"
  | "digital";
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
  surveyedEstablishments: number;
  establishments: number;
  establishmentWorkers: number;
  femaleEstablishmentWorkers: number;
  manufacturingEstablishments: number;
  handEmbroideryEstablishments: number;
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
  { id: "work", label: "Work", lang: "en" },
  { id: "economy", label: "Economy", lang: "en" },
  { id: "households", label: "Households", lang: "en" },
  { id: "digital", label: "Digital", lang: "en" },
];

export const statsSources = {
  boundaries: {
    title: "Kashmir Valley district boundaries: 2021 snapshot",
    shortTitle: "geoBoundaries / Pathways Data",
    publisher: "Pathways Data Pvt. Ltd., lgdirectory.gov.in; distributed by geoBoundaries",
    url: "https://www.geoboundaries.org/api/current/gbOpen/IND/ADM2/",
    detail:
      "The map uses a ten-district subset of geoBoundaries gbOpen IND ADM2, representing 2021 boundaries. Boundary data are available under ODbL 1.0. Population and literacy use 2011 Census records, while local business counts use ASUSE 2025.",
    lang: "en",
  },
  census: {
    title: "Census of India 2011: Primary Census Abstract",
    shortTitle: "Census 2011",
    publisher: "Office of the Registrar General & Census Commissioner, India",
    url: "https://censusindia.gov.in/nada/index.php/catalog/6191",
    detail:
      "State and district workbook, PC11_PCA-SD. Population and literacy are calculated from the ten district records. The census records use some older district spellings.",
    lang: "en",
  },
  plfs: {
    title: "Periodic Labour Force Survey (PLFS): Annual 2025",
    shortTitle: "NSO PLFS 2025",
    publisher: "National Statistical Office, Ministry of Statistics & Programme Implementation",
    url: "https://microdata.gov.in/NADA/index.php/catalog/284",
    detail:
      "Calendar-year unit-level microdata (January–December 2025), covering 14,773 surveyed people across all ten Kashmir Valley districts (NSS Region 013) and 21,886 across Jammu & Kashmir. Rates use usual status (principal plus subsidiary activity) and official sampling multipliers.",
    lang: "en",
  },
  asuse: {
    title: "Annual Survey of Unincorporated Sector Enterprises (ASUSE) 2025",
    shortTitle: "NSO ASUSE 2025",
    publisher: "National Statistical Office, Ministry of Statistics & Programme Implementation",
    url: "https://microdata.gov.in/NADA/index.php/catalog/293",
    detail:
      "District-stratified non-agricultural enterprise microdata (January–December 2025), covering 9,075 surveyed establishments across all ten Kashmir Valley districts and 15,395 across Jammu & Kashmir. Excludes household residential rentals (NIC 68108) to match published MoSPI report tables.",
    lang: "en",
  },
  hces: {
    title: "Household Consumption Expenditure Survey (HCES) 2023–24",
    shortTitle: "NSO HCES 2023–24",
    publisher: "National Statistical Office, Ministry of Statistics & Programme Implementation",
    url: "https://microdata.gov.in/NADA/index.php/catalog/237",
    detail:
      "Surveyed August 2023 to July 2024 across 3,582 households in Jammu & Kashmir. Monthly per-capita spending uses the published Fact Sheet figures (without imputation). Kashmir Valley household figures use the 1,890 surveyed households in NSS Region 013 across nine Valley districts (Shopian had no sampled blocks in this round).",
    lang: "en",
  },
  cmst: {
    title: "Comprehensive Modular Survey: Telecom, NSS 80th Round (2025)",
    shortTitle: "NSO Telecom Survey 2025",
    publisher: "National Statistical Office, Ministry of Statistics & Programme Implementation",
    url: "https://microdata.gov.in/NADA/index.php/catalog/239",
    detail:
      "Conducted January–March 2025 across 352 households (1,715 people) in Kashmir Valley (NSS Region 013) and 680 households (3,137 people) across Jammu & Kashmir, weighted with official household and person multipliers.",
    lang: "en",
  },
  horticulture: {
    title: "Digest of Statistics 2024–25",
    shortTitle: "Digest 2024–25",
    publisher: "Directorate of Economics & Statistics, Jammu & Kashmir",
    url: "https://ecostatjk.nic.in/pdf/publications/digeststat/Digest%20of%20Statistics%202024-251.pdf",
    detail:
      "Table 5.01, printed page 117. The apple area figure is the published total for Kashmir Division, in hectares.",
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

// Raw Census 2011 counts and weighted NSO ASUSE 2025 district estimates.
// Keep raw/weighted totals so regional rates are computed from combined numerators
// and denominators, rather than averaging district percentages.
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
    surveyedEstablishments: 665,
    establishments: 36121,
    establishmentWorkers: 46767.88,
    femaleEstablishmentWorkers: 9048.82,
    manufacturingEstablishments: 11357.8,
    handEmbroideryEstablishments: 4183.01,
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
    surveyedEstablishments: 1140,
    establishments: 34419.64,
    establishmentWorkers: 47333.8,
    femaleEstablishmentWorkers: 16065.87,
    manufacturingEstablishments: 14349.6,
    handEmbroideryEstablishments: 2439.72,
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
    surveyedEstablishments: 707,
    establishments: 147266.85,
    establishmentWorkers: 207644.23,
    femaleEstablishmentWorkers: 36735.27,
    manufacturingEstablishments: 36156.58,
    handEmbroideryEstablishments: 15729.43,
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
    surveyedEstablishments: 782,
    establishments: 87320.91,
    establishmentWorkers: 120422.28,
    femaleEstablishmentWorkers: 40609.51,
    manufacturingEstablishments: 42202.76,
    handEmbroideryEstablishments: 30920.39,
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
    surveyedEstablishments: 1348,
    establishments: 33110.77,
    establishmentWorkers: 39985.61,
    femaleEstablishmentWorkers: 15566.45,
    manufacturingEstablishments: 18666.11,
    handEmbroideryEstablishments: 15038.62,
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
    surveyedEstablishments: 883,
    establishments: 23785.05,
    establishmentWorkers: 29587.27,
    femaleEstablishmentWorkers: 4786.32,
    manufacturingEstablishments: 8556.36,
    handEmbroideryEstablishments: 2263.59,
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
    surveyedEstablishments: 848,
    establishments: 33038.67,
    establishmentWorkers: 47529.45,
    femaleEstablishmentWorkers: 7993.79,
    manufacturingEstablishments: 7693.12,
    handEmbroideryEstablishments: 902.83,
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
    surveyedEstablishments: 679,
    establishments: 30596.83,
    establishmentWorkers: 39074.39,
    femaleEstablishmentWorkers: 4516.94,
    manufacturingEstablishments: 7066.28,
    handEmbroideryEstablishments: 1398.88,
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
    surveyedEstablishments: 726,
    establishments: 27830.75,
    establishmentWorkers: 35743.61,
    femaleEstablishmentWorkers: 5824.17,
    manufacturingEstablishments: 7558.66,
    handEmbroideryEstablishments: 2332.2,
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
    surveyedEstablishments: 1297,
    establishments: 162080.44,
    establishmentWorkers: 392640.29,
    femaleEstablishmentWorkers: 43394.49,
    manufacturingEstablishments: 26023.62,
    handEmbroideryEstablishments: 9764.95,
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

export function getFemaleWorkerShare(district: DistrictStats) {
  return (district.femaleEstablishmentWorkers / district.establishmentWorkers) * 100;
}

export function getManufacturingShare(district: DistrictStats) {
  return (district.manufacturingEstablishments / district.establishments) * 100;
}

export const valleySummary = {
  population: total("population"),
  literacy: (total("literates") / (total("population") - total("children"))) * 100,
  maleLiteracy: (total("maleLiterates") / (total("malePopulation") - total("maleChildren"))) * 100,
  femaleLiteracy:
    (total("femaleLiterates") / (total("femalePopulation") - total("femaleChildren"))) * 100,
  surveyedEstablishments: total("surveyedEstablishments"),
  establishments: total("establishments"),
  establishmentWorkers: total("establishmentWorkers"),
  femaleWorkerShare: (total("femaleEstablishmentWorkers") / total("establishmentWorkers")) * 100,
  manufacturingShare: (total("manufacturingEstablishments") / total("establishments")) * 100,
  handEmbroideryEstablishments: total("handEmbroideryEstablishments"),
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
  kind: "Census count" | "Calculated" | "Reported" | "Advance estimate" | "Survey estimate";
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
    value: 151281.97,
    format: "decimal",
    unit: "hectares",
    period: "2024–25",
    kind: "Reported",
    description:
      "The area under apple cultivation in Kashmir Division. Area measures land use, not the weight or value of apples produced.",
    sourceId: "horticulture",
    locator: "Table 5.01, printed page 117",
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
  {
    id: "valley-lfpr",
    title: "Labour force participation",
    category: "work",
    area: "valley",
    value: 64.66,
    format: "percent",
    unit: "of people aged 15+",
    period: "2025",
    kind: "Survey estimate",
    description:
      "People aged 15 and older who are either working or looking for work (usual status). The rate is 75.30% for men and 53.57% for women.",
    sourceId: "plfs",
    locator: "NSS Region 013, usual status (ps+ss), age 15+",
    lang: "en",
  },
  {
    id: "valley-female-lfpr",
    title: "Women in the labour force",
    category: "work",
    area: "valley",
    value: 53.57,
    format: "percent",
    unit: "of females aged 15+",
    period: "2025",
    kind: "Survey estimate",
    description:
      "More than half of adult women in Kashmir Valley take part in paid jobs, family farming, or household craft and trade work.",
    sourceId: "plfs",
    locator: "NSS Region 013, female usual status (ps+ss), age 15+",
    lang: "en",
  },
  {
    id: "valley-self-employed",
    title: "Self-employed workers",
    category: "work",
    area: "valley",
    value: 66.7,
    format: "percent",
    unit: "of workers aged 15+",
    period: "2025",
    kind: "Survey estimate",
    description:
      "Two in three adult workers run their own farm, shop, or workshop, or work in a family business. Regular salaried jobs make up 21.69% and casual wage work 11.61%.",
    sourceId: "plfs",
    locator: "NSS Region 013, worker status codes 11–21, age 15+",
    lang: "en",
  },
  {
    id: "valley-unemployment",
    title: "Unemployment rate",
    category: "work",
    area: "valley",
    value: 4.83,
    format: "percent",
    unit: "of the labour force aged 15+",
    period: "2025",
    kind: "Survey estimate",
    description:
      "People in the adult labour force who looked for work but remained without work over the year (usual status). Among young people aged 15–29, the rate is 13.55%.",
    sourceId: "plfs",
    locator: "NSS Region 013, usual status (ps+ss), age 15+",
    lang: "en",
  },
  {
    id: "valley-enterprise-workers",
    title: "Workers in local unincorporated businesses",
    category: "work",
    area: "valley",
    value: valleySummary.establishmentWorkers,
    format: "count",
    unit: "workers",
    period: "2025",
    kind: "Survey estimate",
    description:
      "Estimated people working in small non-farm shops, workshops, and service businesses across all ten Valley districts. Women make up 18.33% of this workforce.",
    sourceId: "asuse",
    locator: "Block 8 item 789, ten Kashmir Valley districts",
    lang: "en",
  },
  {
    id: "jk-lfpr",
    title: "J&K labour force participation",
    category: "work",
    area: "jk",
    value: 64.95,
    format: "percent",
    unit: "of people aged 15+",
    period: "2025",
    kind: "Survey estimate",
    description:
      "Adult labour force participation across the whole union territory (76.26% for men and 53.09% for women), with an adult unemployment rate of 4.95%.",
    sourceId: "plfs",
    locator: "State 01, usual status (ps+ss), age 15+",
    lang: "en",
  },
  {
    id: "valley-establishments",
    title: "Unincorporated local businesses",
    category: "economy",
    area: "valley",
    value: valleySummary.establishments,
    format: "count",
    unit: "establishments",
    period: "2025",
    kind: "Survey estimate",
    description:
      "Small non-agricultural shops, workshops, and services not registered as companies across the ten Valley districts. Trade makes up 38.06%, services 32.76%, and manufacturing 29.18%.",
    sourceId: "asuse",
    locator: "Block 2 (excluding NIC 68108), ten Valley districts",
    lang: "en",
  },
  {
    id: "valley-hand-embroidery",
    title: "Hand-embroidery workshops & home units",
    category: "economy",
    area: "valley",
    value: valleySummary.handEmbroideryEstablishments,
    format: "count",
    unit: "establishments",
    period: "2025",
    kind: "Survey estimate",
    description:
      "Nearly one in seven unincorporated businesses in Kashmir Valley (13.80%) does hand embroidery and lace work, led by Budgam, Baramulla, Ganderbal, and Srinagar.",
    sourceId: "asuse",
    locator: "NIC 13991, ten Kashmir Valley districts",
    lang: "en",
  },
  {
    id: "jk-establishments",
    title: "J&K unincorporated businesses",
    category: "economy",
    area: "jk",
    value: 876587.62,
    format: "count",
    unit: "establishments",
    period: "2025",
    kind: "Survey estimate",
    description:
      "Estimated non-agricultural unincorporated businesses across Jammu & Kashmir, employing about 14.39 lakh workers. Srinagar accounts for 18.49% of the UT total.",
    sourceId: "asuse",
    locator: "State 01 (excluding NIC 68108)",
    lang: "en",
  },
  {
    id: "valley-lpg-cooking",
    title: "Households cooking with LPG",
    category: "households",
    area: "valley",
    value: 87.91,
    format: "percent",
    unit: "of households",
    period: "2023–24",
    kind: "Survey estimate",
    description:
      "Share of homes using LPG as their main cooking fuel across the nine sampled Valley districts (Shopian had no sampled blocks in this round). Firewood makes up 12.07%.",
    sourceId: "hces",
    locator: "Level 03 cooking energy code 02, NSS Region 013",
    lang: "en",
  },
  {
    id: "valley-household-size",
    title: "Average household size",
    category: "households",
    area: "valley",
    value: 5.24,
    format: "decimal",
    unit: "people per household",
    period: "2023–24",
    kind: "Survey estimate",
    description:
      "Average number of members per household across the nine sampled Valley districts, compared with 4.93 across all of Jammu & Kashmir.",
    sourceId: "hces",
    locator: "Level 03 household size, NSS Region 013",
    lang: "en",
  },
  {
    id: "jk-mpce-rural",
    title: "J&K rural monthly spending per person",
    category: "households",
    area: "jk",
    value: 4774,
    format: "rupees",
    unit: "per person, per month",
    period: "2023–24",
    kind: "Survey estimate",
    description:
      "Published average Monthly Per Capita Consumption Expenditure (MPCE) in rural Jammu & Kashmir, without imputed values for free goods.",
    sourceId: "hces",
    locator: "HCES 2023–24 Fact Sheet, Jammu & Kashmir (Rural)",
    lang: "en",
  },
  {
    id: "jk-mpce-urban",
    title: "J&K urban monthly spending per person",
    category: "households",
    area: "jk",
    value: 6327,
    format: "rupees",
    unit: "per person, per month",
    period: "2023–24",
    kind: "Survey estimate",
    description:
      "Published average Monthly Per Capita Consumption Expenditure (MPCE) in urban Jammu & Kashmir, without imputed values for free goods.",
    sourceId: "hces",
    locator: "HCES 2023–24 Fact Sheet, Jammu & Kashmir (Urban)",
    lang: "en",
  },
  {
    id: "jk-lpg-cooking",
    title: "J&K households cooking with LPG",
    category: "households",
    area: "jk",
    value: 72.74,
    format: "percent",
    unit: "of households",
    period: "2023–24",
    kind: "Survey estimate",
    description:
      "Share of households across the whole union territory using LPG as their primary cooking fuel (66.03% in rural areas and 94.03% in urban areas).",
    sourceId: "hces",
    locator: "Level 03 cooking energy code 02, State 01",
    lang: "en",
  },
  {
    id: "valley-home-internet",
    title: "Households with internet access",
    category: "digital",
    area: "valley",
    value: 97.41,
    format: "percent",
    unit: "of households",
    period: "Jan–Mar 2025",
    kind: "Survey estimate",
    description:
      "Almost all surveyed Valley households had internet access within the home, mainly over mobile networks (95.34%).",
    sourceId: "cmst",
    locator: "CMST80HH item b5q2, NSS Region 013",
    lang: "en",
  },
  {
    id: "valley-home-wifi",
    title: "Households with fixed Wi-Fi or broadband",
    category: "digital",
    area: "valley",
    value: 6.66,
    format: "percent",
    unit: "of households",
    period: "Jan–Mar 2025",
    kind: "Survey estimate",
    description:
      "Only a small share of Valley homes had fixed Wi-Fi or broadband (2.89% via optical fiber), showing how heavily households rely on mobile data.",
    sourceId: "cmst",
    locator: "CMST80HH item b5q4_i, NSS Region 013",
    lang: "en",
  },
  {
    id: "valley-smartphone-use",
    title: "Adults using a smartphone",
    category: "digital",
    area: "valley",
    value: 72.24,
    format: "percent",
    unit: "of people aged 15+",
    period: "Jan–Mar 2025",
    kind: "Survey estimate",
    description:
      "Share of people aged 15 and older in Kashmir Valley who used a smartphone in the past three months (71.48% used the internet on any device).",
    sourceId: "cmst",
    locator: "CMST80PER item b4q4, NSS Region 013, age 15+",
    lang: "en",
  },
  {
    id: "valley-computer-use",
    title: "Adults using a computer or laptop",
    category: "digital",
    area: "valley",
    value: 13.37,
    format: "percent",
    unit: "of people aged 15+",
    period: "Jan–Mar 2025",
    kind: "Survey estimate",
    description:
      "Share of people aged 15 and older in Kashmir Valley who used a desktop, laptop, or tablet at least once in the past three months (11.62% across J&K).",
    sourceId: "cmst",
    locator: "CMST80PER item b4q8, NSS Region 013, age 15+",
    lang: "en",
  },
  {
    id: "valley-business-internet",
    title: "Local businesses using the internet",
    category: "digital",
    area: "valley",
    value: 47.09,
    format: "percent",
    unit: "of unincorporated establishments",
    period: "2025",
    kind: "Survey estimate",
    description:
      "Nearly half of small non-agricultural businesses in Kashmir Valley used the internet during the year (47.65% across all of Jammu & Kashmir).",
    sourceId: "asuse",
    locator: "Block 2 item 223, NSS Region 013",
    lang: "en",
  },
  {
    id: "jk-home-internet",
    title: "J&K households with internet access",
    category: "digital",
    area: "jk",
    value: 92.73,
    format: "percent",
    unit: "of households",
    period: "Jan–Mar 2025",
    kind: "Survey estimate",
    description:
      "Share of households across the whole union territory with internet access at home (9.36% via fixed Wi-Fi or broadband and 91.37% via mobile networks).",
    sourceId: "cmst",
    locator: "CMST80HH item b5q2, State 01",
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
