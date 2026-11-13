import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Search,
  Sprout,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { PageIntro, SectionHeading } from "@/components/PageIntro";
import { SiteLayout } from "@/components/SiteLayout";
import {
  districtStats,
  formatCount,
  formatRate,
  formatStatistic,
  getFemaleLiteracyRate,
  getLiteracyRate,
  getMaleLiteracyRate,
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
  "Explore Kashmir statistics on population, literacy, education, and the economy, with district comparisons, dated figures, and original sources.";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Kashmir Statistics: Population, Literacy & Economy | Kashmiri.dev" },
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

const categoryIcons = {
  population: Users,
  literacy: BookOpen,
  education: GraduationCap,
  economy: Sprout,
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
      "Census year",
      "Population",
      "Population age 0-6",
      "Literates age 7+",
      "Literacy rate (%)",
      "Male literacy rate (%)",
      "Female literacy rate (%)",
      "Geography",
      "Source",
    ],
    ...districtStats.map((district) => [
      district.name,
      2011,
      district.population,
      district.children,
      district.literates,
      getLiteracyRate(district).toFixed(2),
      getMaleLiteracyRate(district).toFixed(2),
      getFemaleLiteracyRate(district).toFixed(2),
      "Kashmir Valley",
      statsSources.census.url,
    ]),
  ];
  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "kashmir-district-statistics-census-2011.csv";
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
        if (sort === "name") return a.name.localeCompare(b.name);
        return b.population - a.population;
      });
  }, [query, sort]);

  return (
    <SiteLayout>
      <PageIntro
        label="Stats"
        title="Kashmir, in numbers"
        description="A dated snapshot of population, literacy, schools, and livelihoods. Follow the sources, compare districts, and see what each figure actually measures."
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
              districts in the comparison below. Population and literacy use Census 2011. These are
              historical figures, not 2026 estimates.
            </p>
            <p>
              <span className="font-semibold text-foreground">Jammu & Kashmir</span> figures cover
              the whole union territory, including Jammu. The school and income figures below use
              this wider area.
            </p>
          </div>
        </div>
      </section>

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
                ? "The education figures currently cover all of Jammu & Kashmir."
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
              description="Census 2011. Literacy rates describe people aged seven and above. District percentages are calculated from the original census counts."
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
                <option value="population">Population, highest first</option>
                <option value="literacy">Literacy, highest first</option>
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
            <table className="w-full min-w-[660px] text-sm">
              <caption className="sr-only">
                Population and literacy in the ten Kashmir Valley districts, Census 2011. Male and
                female rates each use the corresponding population aged seven and above.
              </caption>
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th scope="col" className="px-4 py-4 text-left font-semibold">
                    District
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Population
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Literacy, 7+
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Male, 7+
                  </th>
                  <th scope="col" className="px-4 py-4 text-right font-semibold">
                    Female, 7+
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
            population aged 7+, rather than an average of district percentages.{" "}
            <a
              href={statsSources.census.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Open the Census source
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
          description="Each figure keeps its original reporting period. A newer report can contain older data, and an advance estimate can change."
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
            <span className="font-semibold text-foreground">Coverage:</span> Anantnag, Bandipora,
            Baramulla, Budgam, Ganderbal, Kulgam, Kupwara, Pulwama, Shopian, and Srinagar. Wider J&K
            figures are labelled separately. No population projection or Valley-only income estimate
            is implied.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
