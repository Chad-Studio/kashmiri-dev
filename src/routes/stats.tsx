import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Check,
  Copy,
  GraduationCap,
  Home,
  Search,
  Sprout,
  Users,
  Wifi,
} from "lucide-react";
import { useMemo, useState } from "react";

import { DistrictMap } from "@/components/DistrictMap";
import { PageIntro, SectionHeading } from "@/components/PageIntro";
import { SiteLayout } from "@/components/SiteLayout";
import {
  DistrictExplorerTabs,
  IndicatorMicroVisual,
  StatsContrastsStrip,
  ValleyHundredSection,
  ValleyVsJkChartSection,
  type DistrictExplorerView,
} from "@/components/StatsVisuals";
import {
  districtStats,
  findDistrictBySlug,
  formatStatistic,
  getDistrictSlug,
  getFemaleLiteracyRate,
  getFemaleWorkerShare,
  getLiteracyRate,
  getMaleLiteracyRate,
  getManufacturingShare,
  mapMetrics,
  statsAreas,
  statsCategories,
  statsIndicators,
  statsReviewedDate,
  statsSources,
  type MapMetric,
  type StatsArea,
  type StatsCategory,
  type StatsIndicator,
} from "@/data/stats";
import { cn } from "@/lib/utils";

const pageDescription =
  "Explore Kashmir statistics on population, literacy, schools, work, local businesses, household spending, and digital access, with interactive charts, a 10-district map, and original sources.";

export type StatsSearch = {
  district?: string;
  compare?: string;
  metric?: MapMetric;
  view?: DistrictExplorerView;
  topic?: StatsCategory;
  area?: StatsArea;
  q?: string;
};

const validMetrics = new Set<MapMetric>(mapMetrics.map((item) => item.id));
const validViews = new Set<DistrictExplorerView>(["chart", "compare", "table"]);
const validTopics = new Set<StatsCategory>(statsCategories.map((item) => item.id));
const validAreas = new Set<StatsArea>(["valley", "jk"]);

function validateStatsSearch(search: Record<string, unknown>): StatsSearch {
  const result: StatsSearch = {};
  if (typeof search.district === "string" && findDistrictBySlug(search.district)) {
    result.district = search.district.trim().toLowerCase();
  }
  if (typeof search.compare === "string" && findDistrictBySlug(search.compare)) {
    result.compare = search.compare.trim().toLowerCase();
  }
  if (typeof search.metric === "string" && validMetrics.has(search.metric as MapMetric)) {
    result.metric = search.metric as MapMetric;
  }
  if (typeof search.view === "string" && validViews.has(search.view as DistrictExplorerView)) {
    result.view = search.view as DistrictExplorerView;
  }
  if (typeof search.topic === "string" && validTopics.has(search.topic as StatsCategory)) {
    result.topic = search.topic as StatsCategory;
  }
  if (typeof search.area === "string" && validAreas.has(search.area as StatsArea)) {
    result.area = search.area as StatsArea;
  }
  if (typeof search.q === "string" && search.q.trim().length > 0) {
    result.q = search.q.slice(0, 80);
  }
  return result;
}

export const Route = createFileRoute("/stats")({
  validateSearch: validateStatsSearch,
  head: () => ({
    meta: [
      { title: "Kashmir Statistics: Population, Work, Economy & Digital Access | Kashmiri.dev" },
      { name: "description", content: pageDescription },
      { property: "og:title", content: "Kashmir, in numbers | Kashmiri.dev" },
      { property: "og:description", content: pageDescription },
      { property: "og:url", content: "https://www.kashmiri.dev/stats" },
      { name: "twitter:title", content: "Kashmir, in numbers | Kashmiri.dev" },
      { name: "twitter:description", content: pageDescription },
    ],
    links: [{ rel: "canonical", href: "https://www.kashmiri.dev/stats" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Kashmir, in numbers",
          description: pageDescription,
          url: "https://www.kashmiri.dev/stats",
          inLanguage: "en",
          dateModified: statsReviewedDate,
          isBasedOn: Object.values(statsSources).map((source) => source.url),
        }),
      },
    ],
  }),
  component: StatsPage,
});

const categoryIcons: Record<StatsCategory, typeof Users> = {
  population: Users,
  literacy: BookOpen,
  education: GraduationCap,
  work: Briefcase,
  economy: Sprout,
  households: Home,
  digital: Wifi,
};

const categorySummaries: Record<StatsCategory, string> = {
  population: "Census 2011 counts across the ten Kashmir Valley districts.",
  literacy: "Age 7+ reading and writing rates from Census 2011.",
  education: "School counts across Jammu & Kashmir from the 2025–26 Economic Survey.",
  work: "Adult employment, women’s work, and job types from NSO PLFS & ASUSE 2025.",
  economy: "Small businesses, hand embroidery, orchards, and J&K macroeconomic output.",
  households: "Cooking fuel, electricity, homes, and monthly spending (HCES 2023–24).",
  digital: "Mobile data, home Wi-Fi, smartphone, and computer use in 2025.",
};

const controlClass =
  "min-h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function StatisticCard({ indicator }: { indicator: StatsIndicator }) {
  const [copied, setCopied] = useState(false);
  const Icon = categoryIcons[indicator.category];
  const source = statsSources[indicator.sourceId];
  const areaLabel = statsAreas[indicator.area].label;
  const formattedValue = formatStatistic(indicator);

  const copyCitation = async () => {
    const text = `${areaLabel} — ${indicator.title} (${indicator.period}): ${formattedValue} ${indicator.unit}. Source: ${source.shortTitle} (https://www.kashmiri.dev/stats)`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failures in restricted contexts
    }
  };

  return (
    <article className="flex flex-col gap-3.5 rounded-xl border border-border bg-card p-5 shadow-[var(--surface-shadow)] sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-semibold",
              indicator.area === "valley"
                ? "bg-primary/10 text-primary"
                : "bg-muted text-foreground",
            )}
          >
            {areaLabel}
          </span>
          <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
            {indicator.period}
          </span>
        </div>
        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">{indicator.title}</h3>
        <p className="mt-2 break-words font-serif text-4xl font-semibold tabular-nums tracking-tight text-foreground">
          {formattedValue}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{indicator.unit}</p>
      </div>

      {indicator.visual ? <IndicatorMicroVisual visual={indicator.visual} /> : null}

      <p className="text-sm leading-relaxed text-muted-foreground">{indicator.description}</p>

      <div className="mt-auto border-t border-border pt-3.5">
        <div className="flex items-center justify-between gap-2">
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-8 items-center gap-1 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {source.shortTitle}
            <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={copyCitation}
            aria-label={`Copy ${indicator.title} figure and source`}
            className="inline-flex min-h-8 cursor-pointer items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-primary" aria-hidden="true" />
                <span className="text-primary">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" aria-hidden="true" />
                <span>Cite</span>
              </>
            )}
          </button>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {indicator.kind} · {indicator.locator}
        </p>
      </div>
    </article>
  );
}

function downloadDistricts() {
  const rows = [
    [
      "District",
      "Population (2011)",
      "Population age 0-6 (2011)",
      "Literates age 7+ (2011)",
      "Literacy rate 2011 (%)",
      "Male literacy rate 2011 (%)",
      "Female literacy rate 2011 (%)",
      "Surveyed establishments (2025)",
      "Estimated establishments (2025)",
      "Estimated workers (2025)",
      "Female worker share 2025 (%)",
      "Manufacturing share 2025 (%)",
      "Hand-embroidery establishments (2025)",
      "Geography",
      "Census source",
      "ASUSE source",
    ],
    ...districtStats.map((district) => [
      district.name,
      district.population,
      district.children,
      district.literates,
      getLiteracyRate(district).toFixed(2),
      getMaleLiteracyRate(district).toFixed(2),
      getFemaleLiteracyRate(district).toFixed(2),
      district.surveyedEstablishments,
      Math.round(district.establishments),
      Math.round(district.establishmentWorkers),
      getFemaleWorkerShare(district).toFixed(2),
      getManufacturingShare(district).toFixed(2),
      Math.round(district.handEmbroideryEstablishments),
      "Kashmir Valley",
      statsSources.census.url,
      statsSources.asuse.url,
    ]),
  ];
  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "kashmir-district-statistics.csv";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function StatsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateSearch = (patch: Partial<StatsSearch>) => {
    void navigate({
      search: (prev) => {
        const next: StatsSearch = { ...prev, ...patch };
        for (const key of Object.keys(next) as (keyof StatsSearch)[]) {
          if (!next[key]) {
            delete next[key];
          }
        }
        return next;
      },
      replace: true,
      resetScroll: false,
    });
  };

  const selectedDistrict =
    findDistrictBySlug(search.district) ??
    districtStats.find((district) => district.id === "010") ??
    districtStats[0];

  const defaultCompareId = selectedDistrict.id === "010" ? "002" : "010";
  const parsedCompare = findDistrictBySlug(search.compare);
  const compareDistrictId =
    parsedCompare && parsedCompare.id !== selectedDistrict.id
      ? parsedCompare.id
      : defaultCompareId;

  const metric: MapMetric = search.metric ?? "districts";
  const view: DistrictExplorerView = search.view ?? "chart";
  const category: StatsCategory | "all" = search.topic ?? "all";
  const area: StatsArea | "all" = search.area ?? "all";
  const figureQuery = search.q ?? "";

  const handleSelectDistrict = (id: string) => {
    const found = districtStats.find((district) => district.id === id);
    if (!found) return;
    updateSearch({ district: getDistrictSlug(found) });
  };

  const handleSelectCompareDistrict = (id: string) => {
    const found = districtStats.find((district) => district.id === id);
    if (!found) return;
    updateSearch({ compare: getDistrictSlug(found) });
  };

  const handleSelectMetric = (nextMetric: MapMetric) => {
    updateSearch({ metric: nextMetric === "districts" ? undefined : nextMetric });
  };

  const handleSelectView = (nextView: DistrictExplorerView) => {
    updateSearch({ view: nextView === "chart" ? undefined : nextView });
  };

  const handleJumpToTopic = (topic: StatsCategory) => {
    updateSearch({ topic, area: undefined, q: undefined });
    if (typeof document !== "undefined") {
      document.getElementById("figures")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const normalizedFigureQuery = figureQuery.trim().toLowerCase();

  const indicators = useMemo(() => {
    return statsIndicators.filter((indicator) => {
      if (category !== "all" && indicator.category !== category) return false;
      if (area !== "all" && indicator.area !== area) return false;
      if (!normalizedFigureQuery) return true;
      const source = statsSources[indicator.sourceId];
      const haystack = [
        indicator.title,
        indicator.description,
        indicator.unit,
        indicator.period,
        source.shortTitle,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedFigureQuery);
    });
  }, [category, area, normalizedFigureQuery]);

  const groupedIndicators = useMemo(() => {
    return statsCategories
      .map((cat) => ({
        ...cat,
        items: indicators.filter((indicator) => indicator.category === cat.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [indicators]);

  const isFiltered = category !== "all" || area !== "all" || normalizedFigureQuery.length > 0;
  const showGroupedByTopic = category === "all" && normalizedFigureQuery.length === 0;

  return (
    <SiteLayout>
      <PageIntro
        label="Stats"
        title="Kashmir, in numbers"
        description="A visual, source-linked guide to population, literacy, schools, work, small businesses, household life, and digital access across Kashmir Valley and Jammu & Kashmir."
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <span>
            Reviewed <time dateTime={statsReviewedDate}>13 November 2026</time>
          </span>
          <span aria-hidden="true">·</span>
          <a
            href="#districts"
            className="rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            10 districts
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#contrasts"
            className="rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Key contrasts
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#hundred"
            className="rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            100-unit view
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#figures"
            className="rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            All {statsIndicators.length} figures
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#sources"
            className="rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sources & methods
          </a>
        </div>
      </PageIntro>

      <DistrictMap
        selectedId={selectedDistrict.id}
        onSelectDistrict={handleSelectDistrict}
        metric={metric}
        onSelectMetric={handleSelectMetric}
      />

      <DistrictExplorerTabs
        view={view}
        onChangeView={handleSelectView}
        selectedId={selectedDistrict.id}
        onSelectDistrict={handleSelectDistrict}
        compareId={compareDistrictId}
        onSelectCompareDistrict={handleSelectCompareDistrict}
        metric={metric}
        onSelectMetric={handleSelectMetric}
        onDownloadCsv={downloadDistricts}
      />

      <StatsContrastsStrip onSelectTopic={handleJumpToTopic} />

      <ValleyHundredSection />

      <ValleyVsJkChartSection />

      <section
        id="figures"
        aria-labelledby="figures-heading"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-14 sm:px-6"
      >
        <SectionHeading
          id="figures-heading"
          title="Explore all verified figures"
          description="Filter by topic, switch between Kashmir Valley (10 districts) and wider Jammu & Kashmir, or search for any subject."
        />

        <div className="mt-5 space-y-3 rounded-xl border border-border bg-card p-4 shadow-[var(--surface-shadow)] sm:p-5">
          <div
            role="group"
            aria-label="Filter statistics by topic"
            className="flex flex-wrap gap-2"
          >
            {[{ id: "all" as const, label: "All topics" }, ...statsCategories].map((item) => {
              const isSelected = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => updateSearch({ topic: item.id === "all" ? undefined : item.id })}
                  className={cn(
                    "min-h-10 cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-3 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filter statistics by geographic area"
              className="inline-flex flex-wrap items-center gap-1.5"
            >
              <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Area
              </span>
              {(
                [
                  { id: "all", label: "All areas" },
                  { id: "valley", label: "Kashmir Valley (10 districts)" },
                  { id: "jk", label: "Jammu & Kashmir (UT)" },
                ] as const
              ).map((option) => {
                const isSelected = area === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      updateSearch({ area: option.id === "all" ? undefined : option.id })
                    }
                    className={cn(
                      "min-h-9 cursor-pointer rounded-md border px-3 py-1 text-xs font-semibold transition-colors sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-accent text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-80">
              <Search
                className="absolute left-3 top-3 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={figureQuery}
                onChange={(event) =>
                  updateSearch({ q: event.target.value ? event.target.value : undefined })
                }
                placeholder="Search figures (Wi-Fi, apples, LPG…)"
                aria-label="Search figures by keyword"
                className={cn(controlClass, "w-full pl-9")}
              />
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-wrap items-center justify-between gap-2">
          <p aria-live="polite" aria-atomic="true" className="text-sm text-muted-foreground">
            {indicators.length} {indicators.length === 1 ? "figure" : "figures"} shown
          </p>
          {isFiltered ? (
            <button
              type="button"
              onClick={() => updateSearch({ topic: undefined, area: undefined, q: undefined })}
              className="cursor-pointer rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Reset filters
            </button>
          ) : null}
        </div>

        {indicators.length > 0 ? (
          showGroupedByTopic ? (
            <div className="space-y-10">
              {groupedIndicators.map((group) => {
                const GroupIcon = categoryIcons[group.id];
                return (
                  <div key={group.id}>
                    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2.5">
                      <div className="flex items-center gap-2">
                        <GroupIcon className="size-4 text-primary" aria-hidden="true" />
                        <h3 className="font-serif text-2xl text-foreground">{group.label}</h3>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
                          {group.items.length}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {categorySummaries[group.id]}
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {group.items.map((indicator) => (
                        <StatisticCard key={indicator.id} indicator={indicator} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {indicators.map((indicator) => (
                <StatisticCard key={indicator.id} indicator={indicator} />
              ))}
            </div>
          )
        ) : (
          <div className="rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <p className="font-semibold text-foreground">
              No verified figures match this selection.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {category === "education" && area === "valley"
                ? "The school figures currently cover all of Jammu & Kashmir."
                : (category === "population" || category === "literacy") && area === "jk"
                  ? "The Census 2011 population and literacy figures on this page focus on Kashmir Valley’s ten districts."
                  : "Try clearing the search box or choosing another topic or area."}
            </p>
            <button
              type="button"
              onClick={() => updateSearch({ topic: undefined, area: undefined, q: undefined })}
              className="mt-4 min-h-10 cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Show all figures
            </button>
          </div>
        )}
      </section>

      <section aria-labelledby="coverage-heading" className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="rounded-xl border border-border bg-muted/40 p-5 sm:p-6">
          <h2 id="coverage-heading" className="font-serif text-xl text-foreground">
            Reading the area and the reporting year
          </h2>
          <div className="mt-3 grid gap-4 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2 sm:gap-8">
            <p>
              <span className="font-semibold text-foreground">Kashmir Valley</span> means the ten
              districts in the map and rankings above. Population and literacy use Census 2011,
              while work, local businesses, and telecom figures use 2025 national surveys across
              those ten districts (2023–24 household figures cover nine sampled Valley districts).
            </p>
            <p>
              <span className="font-semibold text-foreground">Jammu & Kashmir</span> figures cover
              the whole union territory, including Jammu. School counts, economic output, per-capita
              income, and published rural and urban monthly spending use this wider area.
            </p>
          </div>
        </div>
      </section>

      <section
        id="sources"
        aria-labelledby="sources-heading"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-10 sm:px-6"
      >
        <SectionHeading
          id="sources-heading"
          title="Sources & methods"
          description="Each figure keeps its original reporting period. A newer report can contain older data, and an advance or sample survey estimate has sampling margins."
        />
        <div className="mt-6 grid gap-x-8 sm:grid-cols-2">
          {Object.entries(statsSources).map(([id, source]) => (
            <article key={id} className="border-t border-border py-5">
              <h3 className="font-serif text-xl text-foreground">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {source.title}
                  <ArrowUpRight className="ml-1 inline size-4" aria-hidden="true" />
                </a>
              </h3>
              <p className="mt-2 text-xs font-semibold text-muted-foreground">{source.publisher}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{source.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-3 border-y border-border py-5 text-sm leading-relaxed text-muted-foreground">
          <div className="max-w-3xl space-y-3">
            <p>
              <span className="font-semibold text-foreground">How literacy is calculated:</span>{" "}
              literate people ÷ (total population − children aged 0–6) × 100. Male and female rates
              use their own counts. Displayed rates are rounded to two decimal places.
            </p>
            <p>
              <span className="font-semibold text-foreground">Survey estimates:</span> 2023–25
              figures from PLFS, ASUSE, HCES, and the Telecom survey apply official NSO sampling
              multipliers to unit-level microdata for NSS Region 013 (Kashmir Valley) and State 01
              (Jammu & Kashmir). ASUSE business counts exclude household residential rentals (NIC
              68108) to match published MoSPI tables.
            </p>
            <p>
              <span className="font-semibold text-foreground">Coverage:</span> Anantnag, Bandipora,
              Baramulla, Budgam, Ganderbal, Kulgam, Kupwara, Pulwama, Shopian, and Srinagar (Shopian
              had no sampled blocks in HCES 2023–24). Wider J&K figures are labelled separately. No
              population projection or Valley-only GDP estimate is implied.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
