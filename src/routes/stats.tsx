import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpen,
  Briefcase,
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
  districtStats,
  formatCount,
  formatRate,
  formatStatistic,
  getFemaleLiteracyRate,
  getFemaleWorkerShare,
  getLiteracyRate,
  getMaleLiteracyRate,
  getManufacturingShare,
  statsAreas,
  statsCategories,
  statsIndicators,
  statsReviewedDate,
  statsSources,
  valleySummary,
  type StatsArea,
  type StatsCategory,
  type StatsIndicator,
} from "@/data/stats";
import { cn } from "@/lib/utils";

const pageDescription =
  "Explore Kashmir statistics on population, literacy, schools, work, local businesses, household spending, and digital access, with an interactive district map and original sources.";

export const Route = createFileRoute("/stats")({
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
const controlClass =
  "min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function StatisticCard({ indicator }: { indicator: StatsIndicator }) {
  const Icon = categoryIcons[indicator.category];
  const source = statsSources[indicator.sourceId];
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--surface-shadow)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            indicator.area === "valley" ? "bg-primary/10 text-primary" : "bg-muted text-foreground",
          )}
        >
          {statsAreas[indicator.area].label}
        </span>
        <Icon className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{indicator.title}</h3>
        <p className="mt-3 break-words font-serif text-4xl font-semibold tabular-nums tracking-tight text-foreground">
          {formatStatistic(indicator)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{indicator.unit}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{indicator.description}</p>
      <div className="mt-auto border-t border-border pt-4">
        <p className="text-sm font-semibold tabular-nums text-foreground">
          {indicator.period}{" "}
          <span className="font-normal text-muted-foreground">· {indicator.kind}</span>
        </p>
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex min-h-8 items-center gap-1 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {source.shortTitle}
          <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
        </a>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{indicator.locator}</p>
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
  const [category, setCategory] = useState<StatsCategory | "all">("all");
  const [area, setArea] = useState<StatsArea | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("population");
  const indicators = statsIndicators.filter(
    (indicator) =>
      (category === "all" || indicator.category === category) &&
      (area === "all" || indicator.area === area),
  );
  const districts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return districtStats
      .filter((district) =>
        `${district.name} ${district.censusName}`.toLowerCase().includes(normalizedQuery),
      )
      .sort((a, b) => {
        if (sort === "literacy") return getLiteracyRate(b) - getLiteracyRate(a);
        if (sort === "establishments") return b.establishments - a.establishments;
        if (sort === "workers") return b.establishmentWorkers - a.establishmentWorkers;
        if (sort === "name") return a.name.localeCompare(b.name);
        return b.population - a.population;
      });
  }, [query, sort]);

  return (
    <SiteLayout>
      <PageIntro
        label="Stats"
        title="Kashmir, in numbers"
        description="A dated snapshot of population, literacy, schools, work, households, and digital access. Follow the sources, compare districts, and see what each figure actually measures."
      >
        <p className="text-sm text-muted-foreground">
          Sources reviewed <time dateTime={statsReviewedDate}>13 November 2026</time>{" "}
          <span aria-hidden="true">·</span>{" "}
          <a
            href="#sources"
            className="rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sources & methods
          </a>
        </p>
      </PageIntro>

      <section aria-labelledby="coverage-heading" className="mx-auto max-w-5xl px-4 pb-8">
        <div className="rounded-xl border border-border bg-muted/40 p-5 sm:p-6">
          <h2 id="coverage-heading" className="font-serif text-xl text-foreground">
            Start with the area and the year
          </h2>
          <div className="mt-3 grid gap-4 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2 sm:gap-8">
            <p>
              <span className="font-semibold text-foreground">Kashmir Valley</span> means the ten
              districts in the comparison below. Population and literacy use Census 2011, while
              work, local businesses, and telecom figures use 2025 national surveys across those ten
              districts (2023–24 household figures cover nine sampled Valley districts).
            </p>
            <p>
              <span className="font-semibold text-foreground">Jammu & Kashmir</span> figures cover
              the whole union territory, including Jammu. School counts, economic output, per-capita
              income, and published rural and urban monthly spending use this wider area.
            </p>
          </div>
        </div>
      </section>

      <DistrictMap />

      <section aria-labelledby="figures-heading" className="mx-auto max-w-6xl px-4 pb-14">
        <SectionHeading id="figures-heading" title="Explore the figures" />
        <div className="mt-5 flex flex-col gap-4 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter statistics by topic"
            className="flex flex-wrap gap-2"
          >
            {[{ id: "all" as const, label: "All topics" }, ...statsCategories].map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  category === item.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="stats-area" className="shrink-0 text-sm font-semibold text-foreground">
              Area
            </label>
            <select
              id="stats-area"
              value={area}
              onChange={(event) => setArea(event.target.value as StatsArea | "all")}
              className={cn(controlClass, "w-full lg:w-auto")}
            >
              <option value="all">All areas</option>
              <option value="valley">Kashmir Valley</option>
              <option value="jk">Jammu & Kashmir</option>
            </select>
          </div>
        </div>
        <p aria-live="polite" aria-atomic="true" className="my-4 text-sm text-muted-foreground">
          {indicators.length} {indicators.length === 1 ? "figure" : "figures"} shown
        </p>
        {indicators.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indicators.map((indicator) => (
              <StatisticCard key={indicator.id} indicator={indicator} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <p className="font-semibold text-foreground">
              No verified figures for this selection yet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {category === "education" && area === "valley"
                ? "The school figures currently cover all of Jammu & Kashmir."
                : (category === "population" || category === "literacy") && area === "jk"
                  ? "The Census 2011 population and literacy figures on this page focus on Kashmir Valley’s ten districts."
                  : "Choose another topic or area to see the available figures."}
            </p>
            <button
              type="button"
              onClick={() => {
                setArea("all");
                setCategory("all");
              }}
              className="mt-4 min-h-11 rounded-md px-4 py-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Show all figures
            </button>
          </div>
        )}
      </section>

      <section aria-labelledby="districts-heading" className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="districts-heading"
              title="Compare the ten districts"
              description="Population and age 7+ literacy come from Census 2011. Unincorporated local businesses and their workers come from NSO ASUSE 2025."
            />
            <button
              type="button"
              onClick={downloadDistricts}
              className={cn(
                controlClass,
                "inline-flex shrink-0 items-center justify-center gap-2 font-semibold hover:bg-accent",
              )}
            >
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              Download CSV
            </button>
          </div>
          <div className="my-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative sm:w-72">
              <Search
                className="absolute left-3 top-3.5 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a district"
                aria-label="Search districts"
                className={cn(controlClass, "w-full pl-9")}
              />
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="district-sort" className="text-sm font-semibold text-foreground">
                Sort by
              </label>
              <select
                id="district-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className={cn(controlClass, "flex-1 sm:flex-none")}
              >
                <option value="population">Population (2011), highest first</option>
                <option value="literacy">Literacy (2011), highest first</option>
                <option value="establishments">Local businesses (2025), highest first</option>
                <option value="workers">Business workers (2025), highest first</option>
                <option value="name">District name</option>
              </select>
            </div>
          </div>
          <div
            role="region"
            aria-label="District statistics table; scroll horizontally on small screens"
            tabIndex={0}
            className="overflow-x-auto rounded-xl border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <table className="w-full min-w-[780px] text-sm">
              <caption className="sr-only">
                Population and age 7+ literacy from Census 2011 alongside unincorporated
                establishments and workers from NSO ASUSE 2025 across the ten Kashmir Valley
                districts.
              </caption>
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th scope="col" className="px-4 py-4 text-left font-semibold">
                    District
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Population, 2011
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Literacy, 7+ (2011)
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Male, 7+
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Female, 7+
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Businesses, 2025
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Workers, 2025
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {districts.map((district) => (
                  <tr key={district.id} className="hover:bg-muted/30">
                    <th scope="row" className="px-4 py-4 text-left font-semibold text-foreground">
                      {district.name}
                    </th>
                    <td className="px-4 py-4 text-right tabular-nums text-foreground">
                      {formatCount(district.population)}
                    </td>
                    <td className="px-4 py-4 text-right tabular-nums text-foreground">
                      {formatRate(getLiteracyRate(district))}
                    </td>
                    <td className="px-4 py-4 text-right tabular-nums text-muted-foreground">
                      {formatRate(getMaleLiteracyRate(district))}
                    </td>
                    <td className="px-4 py-4 text-right tabular-nums text-muted-foreground">
                      {formatRate(getFemaleLiteracyRate(district))}
                    </td>
                    <td className="px-4 py-4 text-right tabular-nums text-foreground">
                      {formatCount(district.establishments)}
                    </td>
                    <td className="px-4 py-4 text-right tabular-nums text-muted-foreground">
                      {formatCount(district.establishmentWorkers)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-border bg-muted/40">
                <tr>
                  <th scope="row" className="px-4 py-4 text-left font-semibold">
                    Kashmir Valley
                  </th>
                  <td className="px-4 py-4 text-right font-semibold tabular-nums">
                    {formatCount(valleySummary.population)}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold tabular-nums">
                    {formatRate(valleySummary.literacy)}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold tabular-nums">
                    {formatRate(valleySummary.maleLiteracy)}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold tabular-nums">
                    {formatRate(valleySummary.femaleLiteracy)}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold tabular-nums">
                    {formatCount(valleySummary.establishments)}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold tabular-nums">
                    {formatCount(valleySummary.establishmentWorkers)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {districts.length === 0 && (
            <p role="status" className="mt-4 text-sm text-muted-foreground">
              No district matches “{query}”. Try another spelling.
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The final row always covers all ten districts. Its literacy rate uses the combined
            population aged 7+, rather than an average of district percentages, and 2025 business
            totals sum the weighted estimates across all ten districts.{" "}
            <a
              href={statsSources.census.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Census 2011 source
            </a>{" "}
            <span aria-hidden="true">·</span>{" "}
            <a
              href={statsSources.asuse.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              ASUSE 2025 source
            </a>
            .
          </p>
        </div>
      </section>

      <section
        id="sources"
        aria-labelledby="sources-heading"
        className="mx-auto max-w-5xl scroll-mt-24 px-4 pt-12"
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
          <p>
            <span className="font-semibold text-foreground">How literacy is calculated:</span>{" "}
            literate people ÷ (total population − children aged 0–6) × 100. Male and female rates
            use their own counts. Displayed rates are rounded to two decimal places.
          </p>
          <p className="mt-3">
            <span className="font-semibold text-foreground">Survey estimates:</span> 2023–25 figures
            from PLFS, ASUSE, HCES, and the Telecom survey apply official NSO sampling multipliers
            to unit-level microdata for NSS Region 013 (Kashmir Valley) and State 01 (Jammu &
            Kashmir). ASUSE business counts exclude household residential rentals (NIC 68108) to
            match published MoSPI tables.
          </p>
          <p className="mt-3">
            <span className="font-semibold text-foreground">Coverage:</span> Anantnag, Bandipora,
            Baramulla, Budgam, Ganderbal, Kulgam, Kupwara, Pulwama, Shopian, and Srinagar (Shopian
            had no sampled blocks in HCES 2023–24). Wider J&K figures are labelled separately. No
            population projection or Valley-only GDP estimate is implied.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
