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

export function getHandEmbroideryShare(district: DistrictStats) {
  return (district.handEmbroideryEstablishments / district.establishments) * 100;
}

export function getDistrictSlug(district: DistrictStats) {
  return district.name.toLowerCase();
}

export function findDistrictBySlug(slug?: string) {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return districtStats.find(
    (district) => getDistrictSlug(district) === normalized || district.id === normalized,
  );
}

export type MapMetric =
  | "districts"
  | "population"
  | "literacy"
  | "establishments"
  | "embroidery"
  | "womenWorkers";

export const mapMetrics: { id: MapMetric; label: string; period?: string; lang: "en" }[] = [
  { id: "districts", label: "Districts", lang: "en" },
  { id: "population", label: "Population", period: "2011", lang: "en" },
  { id: "literacy", label: "Literacy", period: "2011", lang: "en" },
  { id: "establishments", label: "Local businesses", period: "2025", lang: "en" },
  { id: "embroidery", label: "Hand embroidery", period: "2025", lang: "en" },
  { id: "womenWorkers", label: "Women workers", period: "2025", lang: "en" },
];

export function getDistrictMetricValue(district: DistrictStats, metric: MapMetric) {
  switch (metric) {
    case "population":
      return district.population;
    case "establishments":
      return district.establishments;
    case "embroidery":
      return district.handEmbroideryEstablishments;
    case "womenWorkers":
      return getFemaleWorkerShare(district);
    default:
      return getLiteracyRate(district);
  }
}

export function isRateMetric(metric: MapMetric) {
  return metric === "literacy" || metric === "womenWorkers";
}

export function getDistrictMetricUnit(metric: MapMetric) {
  switch (metric) {
    case "population":
      return "people (2011)";
    case "establishments":
      return "local businesses (2025)";
    case "embroidery":
      return "hand-embroidery units (2025)";
    case "womenWorkers":
      return "women share of business workers (2025)";
    default:
      return "literacy, age 7+ (2011)";
  }
}

export function getDistrictRank(district: DistrictStats, metric: Exclude<MapMetric, "districts">) {
  const sorted = [...districtStats].sort(
    (a, b) => getDistrictMetricValue(b, metric) - getDistrictMetricValue(a, metric),
  );
  return sorted.findIndex((item) => item.id === district.id) + 1;
}

const districtStories: Record<string, { badges: string[]; story: string }> = {
  "010": {
    badges: ["#1 in literacy (69.4%)", "#1 in local businesses"],
    story:
      "Home to 39% of all unincorporated business jobs in Kashmir Valley, with the highest literacy rate (69.41%) and narrowest male–female literacy gap (14.40 points).",
  },
  "002": {
    badges: ["#1 in hand embroidery", "#3 in women workers (33.7%)"],
    story:
      "Kashmir Valley’s largest hand-embroidery hub: 30,920 workshops (36% of the Valley total), with women making up one in three local business workers.",
  },
  "008": {
    badges: ["#2 in local businesses", "#2 in literacy (64.6%)"],
    story:
      "Second-largest enterprise hub in the Valley (147,267 local businesses and 207,644 workers) and second in hand-embroidery workshops (15,729).",
  },
  "011": {
    badges: ["#1 in women workers (38.9%)", "#1 in manufacturing (56.4%)"],
    story:
      "Leads the Valley in women’s share of business workers (38.93%), with 45% of its 33,111 local businesses dedicated to hand embroidery.",
  },
  "014": {
    badges: ["#2 in population (2011)", "#3 narrowest literacy gap"],
    story:
      "Second-most populous Valley district in Census 2011 (10.79 lakh people), with 36,121 local businesses and 4,183 hand-embroidery units in 2025.",
  },
  "001": {
    badges: ["#3 in literacy (64.5%)", "#4 in population (2011)"],
    story:
      "Ranks third in overall 2011 literacy (64.51%) across 8.70 lakh residents, with 33,039 unincorporated local businesses in 2025.",
  },
  "012": {
    badges: ["#3 in male literacy (74.4%)", "#4 in overall literacy"],
    story:
      "Ranks fourth in overall 2011 literacy (63.48%) and third in male literacy, with 30,597 unincorporated shops, workshops, and services in 2025.",
  },
  "009": {
    badges: ["#2 in women workers (33.9%)", "#3 in manufacturing (41.7%)"],
    story:
      "Women make up more than one-third (33.94%) of its 47,334 local business workers, and over two-fifths of its establishments are in manufacturing.",
  },
  "015": {
    badges: ["#4 in manufacturing (36.0%)", "2,264 embroidery units"],
    story:
      "More than one-third of its 23,785 unincorporated businesses are manufacturing workshops (35.97%), employing 29,587 local workers.",
  },
  "013": {
    badges: ["#2 narrowest literacy gap", "27,831 local businesses"],
    story:
      "Smallest Valley district by 2011 population (2.66 lakh), yet holds the second-smallest male–female literacy gap (19.37 points) and 27,831 local businesses.",
  },
};

export function getDistrictHighlights(district: DistrictStats) {
  const entry = districtStories[district.id];
  return {
    badges: entry?.badges ?? [],
    story: entry?.story ?? "",
    lang: "en" as const,
  };
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
  handEmbroideryShare: (total("handEmbroideryEstablishments") / total("establishments")) * 100,
};

export type VisualTone = "primary" | "teal" | "amber" | "sage";

export type IndicatorVisual =
  | {
      kind: "meter";
      value: number;
      label?: string;
      compareLabel?: string;
      compareValue?: number;
    }
  | {
      kind: "segments";
      items: { label: string; value: number; tone: VisualTone }[];
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
  visual?: IndicatorVisual;
  lang: "en";
}

export interface ValleyHundredSegment {
  label: string;
  dots: number;
  exactPercent: number;
  tone: VisualTone | "muted";
}

export interface ValleyHundredLens {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  period: string;
  sourceId: keyof typeof statsSources;
  takeaway: string;
  segments: ValleyHundredSegment[];
  lang: "en";
}

export const valleyHundredLenses: ValleyHundredLens[] = [
  {
    id: "internet",
    tabLabel: "100 Homes · Internet",
    title: "If Kashmir Valley were 100 households",
    subtitle: "How homes connect to the internet across all ten Valley districts",
    period: "Jan–Mar 2025",
    sourceId: "cmst",
    takeaway:
      "97 out of 100 homes have internet access, yet only 7 have fixed Wi-Fi — and 72% of adults use smartphones compared with 13% using a computer or laptop.",
    segments: [
      { label: "Fixed Wi-Fi / broadband", dots: 7, exactPercent: 6.66, tone: "teal" },
      { label: "Mobile internet (no fixed Wi-Fi)", dots: 90, exactPercent: 90.75, tone: "primary" },
      { label: "No internet at home", dots: 3, exactPercent: 2.59, tone: "muted" },
    ],
    lang: "en",
  },
  {
    id: "workers",
    tabLabel: "100 Adult Workers",
    title: "If Kashmir Valley’s workforce were 100 adults",
    subtitle: "How working residents aged 15 and older earn a living (usual status)",
    period: "2025",
    sourceId: "plfs",
    takeaway:
      "67 out of 100 adult workers run their own or family farm, shop, or craft, while 22 earn a regular salary and 11 work for casual daily wages.",
    segments: [
      { label: "Self-employed & family work", dots: 67, exactPercent: 66.7, tone: "primary" },
      { label: "Regular salaried jobs", dots: 22, exactPercent: 21.69, tone: "teal" },
      { label: "Casual wage labour", dots: 11, exactPercent: 11.61, tone: "amber" },
    ],
    lang: "en",
  },
  {
    id: "businesses",
    tabLabel: "100 Local Businesses",
    title: "If Kashmir Valley’s 6.16 lakh small businesses were 100 units",
    subtitle: "Unincorporated non-agricultural shops, services, and workshops",
    period: "2025",
    sourceId: "asuse",
    takeaway:
      "Out of every 100 local unincorporated businesses, 38 are shops and traders, 33 provide services, 15 are other makers, and 14 are hand-embroidery units (led by Budgam with 30,920).",
    segments: [
      { label: "Hand-embroidery & lace units", dots: 14, exactPercent: 13.8, tone: "primary" },
      { label: "Other manufacturing workshops", dots: 15, exactPercent: 15.38, tone: "amber" },
      { label: "Retail & wholesale trade", dots: 38, exactPercent: 38.06, tone: "teal" },
      { label: "Services (transport, repair, cafés)", dots: 33, exactPercent: 32.76, tone: "sage" },
    ],
    lang: "en",
  },
  {
    id: "cooking",
    tabLabel: "100 Homes · Cooking",
    title: "If Kashmir Valley were 100 kitchens",
    subtitle: "Main fuel used for household cooking across nine sampled Valley districts",
    period: "2023–24",
    sourceId: "hces",
    takeaway:
      "88 out of 100 surveyed Valley households cook primarily with LPG, while 12 rely mainly on firewood (compared with 73 out of 100 using LPG across all of J&K).",
    segments: [
      { label: "LPG cooking gas", dots: 88, exactPercent: 87.91, tone: "primary" },
      { label: "Firewood & other fuels", dots: 12, exactPercent: 12.09, tone: "amber" },
    ],
    lang: "en",
  },
];

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
    visual: {
      kind: "segments",
      items: [
        { label: "Age 7+", value: 82.61, tone: "primary" },
        { label: "Age 0–6", value: 17.39, tone: "amber" },
      ],
    },
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
    visual: {
      kind: "meter",
      value: (total("children") / total("population")) * 100,
      label: "17.39% of 2011 population",
    },
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
      "Calculated from combined literate counts aged seven and above across all ten districts: 72.83% for males and 52.08% for females.",
    sourceId: "census",
    locator: "Literates ÷ population aged 7+",
    visual: {
      kind: "meter",
      value: valleySummary.maleLiteracy,
      label: "Male (72.83%)",
      compareLabel: "Female (52.08%)",
      compareValue: valleySummary.femaleLiteracy,
    },
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
      "The difference between male and female literacy rates across the ten districts. Srinagar had the smallest gap (14.40 points) and Kupwara the widest (26.25 points).",
    sourceId: "census",
    locator: "Male literacy rate minus female literacy rate",
    visual: {
      kind: "meter",
      value: valleySummary.maleLiteracy - valleySummary.femaleLiteracy,
      label: "Valley gap (20.75 pts)",
      compareLabel: "Smallest: Srinagar (14.40 pts)",
      compareValue: 14.4,
    },
    lang: "en",
  },
  {
    id: "schools",
    title: "Total schools in J&K",
    category: "education",
    area: "jk",
    value: 24137,
    format: "count",
    unit: "schools",
    period: "2024–25",
    kind: "Reported",
    description:
      "Reported across the whole of Jammu & Kashmir: 18,724 government schools and 5,413 schools under private and other managements.",
    sourceId: "education",
    locator: "School Education section",
    visual: {
      kind: "segments",
      items: [
        { label: "Government", value: 77.57, tone: "primary" },
        { label: "Other managements", value: 22.43, tone: "teal" },
      ],
    },
    lang: "en",
  },
  {
    id: "government-schools",
    title: "Government schools in J&K",
    category: "education",
    area: "jk",
    value: 18724,
    format: "count",
    unit: "schools",
    period: "2024–25",
    kind: "Reported",
    description:
      "Government-managed schools across the whole union territory, making up over three-quarters of all schools.",
    sourceId: "education",
    locator: "School Education section",
    visual: { kind: "meter", value: 77.57, label: "77.57% of all J&K schools" },
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
      "People aged 15+ working or seeking work (75.30% for men and 53.57% for women; 64.95% across all of J&K).",
    sourceId: "plfs",
    locator: "NSS Region 013, usual status (ps+ss), age 15+",
    visual: {
      kind: "meter",
      value: 75.3,
      label: "Men (75.30%)",
      compareLabel: "Women (53.57%)",
      compareValue: 53.57,
    },
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
      "More than half of adult women in Kashmir Valley take part in paid jobs, family farming, or household craft and trade work (53.09% across all of J&K).",
    sourceId: "plfs",
    locator: "NSS Region 013, female usual status (ps+ss), age 15+",
    visual: {
      kind: "meter",
      value: 53.57,
      label: "Kashmir Valley (53.57%)",
      compareLabel: "All J&K (53.09%)",
      compareValue: 53.09,
    },
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
    visual: {
      kind: "segments",
      items: [
        { label: "Self-employed", value: 66.7, tone: "primary" },
        { label: "Salaried", value: 21.69, tone: "teal" },
        { label: "Casual", value: 11.61, tone: "amber" },
      ],
    },
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
      "Adults in the labour force who looked for work but remained without work over the year (4.95% across J&K). Among youth aged 15–29 in the Valley, the rate is 13.55%.",
    sourceId: "plfs",
    locator: "NSS Region 013, usual status (ps+ss), age 15+",
    visual: {
      kind: "meter",
      value: 4.83,
      label: "Adults 15+ (4.83%)",
      compareLabel: "Youth 15–29 (13.55%)",
      compareValue: 13.55,
    },
    lang: "en",
  },
  {
    id: "valley-enterprise-workers",
    title: "Workers in local small businesses",
    category: "work",
    area: "valley",
    value: valleySummary.establishmentWorkers,
    format: "count",
    unit: "workers",
    period: "2025",
    kind: "Survey estimate",
    description:
      "Estimated people working in unincorporated non-farm shops, workshops, and services across the ten Valley districts (out of 14.39 lakh across all of J&K).",
    sourceId: "asuse",
    locator: "Block 8 item 789, ten Kashmir Valley districts",
    visual: {
      kind: "segments",
      items: [
        { label: "Men", value: 81.67, tone: "teal" },
        { label: "Women", value: 18.33, tone: "primary" },
      ],
    },
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
      "Small non-farm shops, workshops, and services across the ten Valley districts — 70.22% of J&K’s 8,76,588 total unincorporated establishments.",
    sourceId: "asuse",
    locator: "Block 2 (excluding NIC 68108), ten Valley districts",
    visual: {
      kind: "segments",
      items: [
        { label: "Trade", value: 38.06, tone: "teal" },
        { label: "Services", value: 32.76, tone: "sage" },
        { label: "Manufacturing", value: 29.18, tone: "primary" },
      ],
    },
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
    visual: {
      kind: "meter",
      value: 13.8,
      label: "13.80% of all Valley local businesses",
    },
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
      "Area under apple cultivation in Kashmir Division. Area measures orchard land use, not the weight or value of apples harvested.",
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
      "Nominal Gross State Domestic Product (GSDP) for the whole union territory: approximately ₹2,85,674 crore at current prices.",
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
      "Published nominal per-capita income estimate for the whole union territory. An average does not describe every person’s income.",
    sourceId: "economy",
    locator: "Macro Economic Aggregates",
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
      "Share of homes cooking mainly with LPG across the nine sampled Valley districts (firewood makes up 12.07%, vs. 72.74% LPG use across all of J&K).",
    sourceId: "hces",
    locator: "Level 03 cooking energy code 02, NSS Region 013",
    visual: {
      kind: "segments",
      items: [
        { label: "LPG gas", value: 87.91, tone: "primary" },
        { label: "Firewood & other", value: 12.09, tone: "amber" },
      ],
    },
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
    title: "J&K rural monthly spending",
    category: "households",
    area: "jk",
    value: 4774,
    format: "rupees",
    unit: "per person, per month",
    period: "2023–24",
    kind: "Survey estimate",
    description:
      "Published average Monthly Per Capita Consumption Expenditure (MPCE) in rural Jammu & Kashmir, excluding imputed values of free goods.",
    sourceId: "hces",
    locator: "HCES 2023–24 Fact Sheet, Jammu & Kashmir (Rural)",
    visual: {
      kind: "meter",
      value: (4774 / 6327) * 100,
      label: "75.45% of J&K urban spending (₹6,327)",
    },
    lang: "en",
  },
  {
    id: "jk-mpce-urban",
    title: "J&K urban monthly spending",
    category: "households",
    area: "jk",
    value: 6327,
    format: "rupees",
    unit: "per person, per month",
    period: "2023–24",
    kind: "Survey estimate",
    description:
      "Published average Monthly Per Capita Consumption Expenditure (MPCE) in urban Jammu & Kashmir, excluding imputed values of free goods.",
    sourceId: "hces",
    locator: "HCES 2023–24 Fact Sheet, Jammu & Kashmir (Urban)",
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
      "Almost all surveyed Valley homes had internet access (mainly mobile data at 95.34%, compared with 92.73% home internet across all of J&K).",
    sourceId: "cmst",
    locator: "CMST80HH item b5q2, NSS Region 013",
    visual: {
      kind: "meter",
      value: 95.34,
      label: "Mobile internet (95.34%)",
      compareLabel: "Fixed Wi-Fi (6.66%)",
      compareValue: 6.66,
    },
    lang: "en",
  },
  {
    id: "valley-home-wifi",
    title: "Households with fixed Wi-Fi",
    category: "digital",
    area: "valley",
    value: 6.66,
    format: "percent",
    unit: "of households",
    period: "Jan–Mar 2025",
    kind: "Survey estimate",
    description:
      "Only a small share of Valley homes had fixed Wi-Fi or broadband (2.89% via optical fiber; 9.36% fixed Wi-Fi across all of J&K).",
    sourceId: "cmst",
    locator: "CMST80HH item b5q4_i, NSS Region 013",
    visual: {
      kind: "meter",
      value: 6.66,
      label: "Any fixed Wi-Fi (6.66%)",
      compareLabel: "Optical fiber (2.89%)",
      compareValue: 2.89,
    },
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
    visual: {
      kind: "meter",
      value: 72.24,
      label: "Smartphone (72.24%)",
      compareLabel: "Computer / laptop (13.37%)",
      compareValue: 13.37,
    },
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
      "Share of people aged 15 and older in Kashmir Valley who used a desktop, laptop, or tablet in the past three months (11.62% across all of J&K).",
    sourceId: "cmst",
    locator: "CMST80PER item b4q8, NSS Region 013, age 15+",
    visual: {
      kind: "meter",
      value: 13.37,
      label: "Kashmir Valley (13.37%)",
      compareLabel: "All J&K (11.62%)",
      compareValue: 11.62,
    },
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
    visual: {
      kind: "meter",
      value: 47.09,
      label: "Kashmir Valley (47.09%)",
      compareLabel: "All J&K (47.65%)",
      compareValue: 47.65,
    },
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
export const formatDistrictMetric = (value: number, metric: MapMetric) =>
  isRateMetric(metric) ? formatRate(value) : formatCount(value);
