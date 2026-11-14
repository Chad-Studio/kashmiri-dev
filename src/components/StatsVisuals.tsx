import { ArrowDownToLine, ArrowLeftRight, ArrowUpDown, ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";

import { SectionHeading } from "@/components/PageIntro";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  districtStats,
  formatCount,
  formatDistrictMetric,
  formatRate,
  getDistrictMetricUnit,
  getDistrictMetricValue,
  getFemaleLiteracyRate,
  getFemaleWorkerShare,
  getLiteracyRate,
  getMaleLiteracyRate,
  isRateMetric,
  mapMetrics,
  statsContrasts,
  statsSources,
  valleyHundredLenses,
  valleySummary,
  valleyVsJkBenchmarks,
  type IndicatorVisual,
  type MapMetric,
  type StatsCategory,
  type VisualTone,
} from "@/data/stats";
import { cn } from "@/lib/utils";

export type DistrictExplorerView = "chart" | "compare" | "table";

const toneBgClass: Record<VisualTone | "muted", string> = {
  primary: "bg-chart-1",
  teal: "bg-chart-2",
  amber: "bg-chart-3",
  sage: "bg-chart-4",
  muted: "bg-muted-foreground/25",
};

const controlClass =
  "min-h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function IndicatorMicroVisual({ visual }: { visual: IndicatorVisual }) {
  if (visual.kind === "meter") {
    const primaryWidth = Math.min(100, Math.max(2, visual.value));
    if (visual.compareValue !== undefined) {
      const secondaryWidth = Math.min(100, Math.max(2, visual.compareValue));
      return (
        <div className="space-y-2 pt-1" aria-hidden="true">
          <div>
            {visual.label ? (
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{visual.label}</span>
              </div>
            ) : null}
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-chart-1 transition-[width] duration-300"
                style={{ width: `${primaryWidth}%` }}
              />
            </div>
          </div>
          <div>
            {visual.compareLabel ? (
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{visual.compareLabel}</span>
              </div>
            ) : null}
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-chart-2 transition-[width] duration-300"
                style={{ width: `${secondaryWidth}%` }}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="pt-1" aria-hidden="true">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-chart-1 transition-[width] duration-300"
            style={{ width: `${primaryWidth}%` }}
          />
        </div>
        {visual.label ? (
          <p className="mt-1.5 text-xs text-muted-foreground">{visual.label}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="pt-1" aria-hidden="true">
      <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-muted">
        {visual.items.map((segment) => (
          <div
            key={segment.label}
            className={cn(
              "h-full first:rounded-l-full last:rounded-r-full",
              toneBgClass[segment.tone],
            )}
            style={{ width: `${Math.max(2, segment.value)}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {visual.items.map((segment) => (
          <span key={segment.label} className="inline-flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", toneBgClass[segment.tone])} />
            <span>
              {segment.label}{" "}
              <span className="font-medium tabular-nums text-foreground">
                {segment.value.toFixed(1)}%
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatsContrastsStrip({
  onSelectTopic,
}: {
  onSelectTopic: (topic: StatsCategory) => void;
}) {
  return (
    <section
      id="contrasts"
      aria-labelledby="contrasts-heading"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-14 sm:px-6"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="contrasts-heading" className="font-serif text-2xl text-foreground">
          Three contrasts that shape everyday life
        </h2>
        <p className="text-xs text-muted-foreground">
          Weighted NSO survey estimates for Kashmir Valley (2025)
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {statsContrasts.map((item) => {
          const source = statsSources[item.sourceId];
          return (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--surface-shadow)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-primary">{item.eyebrow}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 font-medium tabular-nums text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <h3 className="mt-2.5 font-serif text-xl leading-snug text-foreground">
                  {item.headline}
                </h3>

                <div className="mt-4 space-y-3 rounded-lg border border-border/80 bg-muted/30 p-3.5">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-serif text-2xl font-semibold tabular-nums text-foreground">
                        {item.primaryFigure}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {item.primaryLabel}
                      </span>
                    </div>
                    <div
                      className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full bg-chart-1"
                        style={{ width: `${Math.min(100, Math.max(3, item.primaryPercent))}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-serif text-xl font-semibold tabular-nums text-foreground">
                        {item.secondaryFigure}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {item.secondaryLabel}
                      </span>
                    </div>
                    <div
                      className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full bg-chart-2"
                        style={{ width: `${Math.min(100, Math.max(3, item.secondaryPercent))}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-8 items-center gap-1 font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {source.shortTitle}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => onSelectTopic(item.topic)}
                  className="inline-flex min-h-8 cursor-pointer items-center gap-1 rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  See topic figures ↓
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ValleyHundredSection() {
  const [lensId, setLensId] = useState(valleyHundredLenses[0].id);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const lens = valleyHundredLenses.find((item) => item.id === lensId) ?? valleyHundredLenses[0];
  const source = statsSources[lens.sourceId];

  const cells = useMemo(() => {
    const list: {
      index: number;
      segmentIndex: number;
      label: string;
      tone: VisualTone | "muted";
    }[] = [];
    lens.segments.forEach((segment, segmentIndex) => {
      for (let count = 0; count < segment.dots; count += 1) {
        list.push({
          index: list.length,
          segmentIndex,
          label: segment.label,
          tone: segment.tone,
        });
      }
    });
    return list.slice(0, 100);
  }, [lens]);

  return (
    <section
      id="hundred"
      aria-labelledby="hundred-heading"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-14 sm:px-6"
    >
      <SectionHeading
        id="hundred-heading"
        title="If Kashmir Valley were 100…"
        description="Large totals are easier to picture on a human scale. Each square below stands for 1 out of 100 homes, adult workers, or local small businesses."
      />

      <div className="mt-5 rounded-xl border border-border bg-card p-5 shadow-[var(--surface-shadow)] sm:p-6">
        <div
          role="group"
          aria-label="Choose a 100-unit lens"
          className="flex flex-wrap gap-2 border-b border-border pb-4"
        >
          {valleyHundredLenses.map((item) => {
            const isSelected = item.id === lens.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setLensId(item.id);
                  setActiveSegment(null);
                }}
                className={cn(
                  "min-h-10 cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.tabLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-10">
          <div className="mx-auto w-full max-w-[310px]">
            <div
              aria-hidden="true"
              className="grid aspect-square grid-cols-10 gap-1.5 rounded-xl border border-border bg-muted/30 p-3 sm:gap-2 sm:p-3.5"
            >
              {cells.map((cell) => {
                const isDimmed = activeSegment !== null && activeSegment !== cell.segmentIndex;
                return (
                  <span
                    key={`${lens.id}-${cell.index}`}
                    title={cell.label}
                    className={cn(
                      "rounded-[4px] transition-opacity duration-150",
                      toneBgClass[cell.tone],
                      isDimmed ? "opacity-20" : "opacity-100",
                    )}
                  />
                );
              })}
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              10 × 10 grid = 100 units (tap a group to highlight)
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
                Kashmir Valley
              </span>
              <span className="font-medium tabular-nums text-muted-foreground">
                {lens.period} · {source.shortTitle}
              </span>
            </div>
            <h3 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">{lens.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{lens.subtitle}</p>

            <ul className="mt-4 space-y-2">
              {lens.segments.map((segment, index) => {
                const isHighlighted = activeSegment === index;
                return (
                  <li key={segment.label}>
                    <button
                      type="button"
                      aria-pressed={isHighlighted}
                      onClick={() =>
                        setActiveSegment((current) => (current === index ? null : index))
                      }
                      onMouseEnter={() => setActiveSegment(index)}
                      onMouseLeave={() => setActiveSegment(null)}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isHighlighted
                          ? "border-primary bg-accent/60"
                          : "border-border bg-background hover:bg-muted/50",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cn("size-3 shrink-0 rounded-sm", toneBgClass[segment.tone])}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-semibold text-foreground">
                          {segment.label}
                        </span>
                      </span>
                      <span className="shrink-0 text-right tabular-nums">
                        <span className="font-serif text-lg font-semibold text-foreground">
                          {segment.dots}
                        </span>
                        <span className="text-xs text-muted-foreground"> / 100 </span>
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({segment.exactPercent.toFixed(2)}%)
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 rounded-lg border border-border bg-muted/30 p-3.5 text-sm leading-relaxed text-muted-foreground">
              {lens.takeaway}{" "}
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline"
              >
                {source.shortTitle}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const districtRankChartConfig = {
  value: {
    label: "Selected metric",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type TableSortField =
  | "population"
  | "literacy"
  | "maleLiteracy"
  | "femaleLiteracy"
  | "establishments"
  | "workers"
  | "name";

export interface DistrictExplorerTabsProps {
  view: DistrictExplorerView;
  onChangeView: (view: DistrictExplorerView) => void;
  selectedId: string;
  onSelectDistrict: (id: string) => void;
  compareId: string;
  onSelectCompareDistrict: (id: string) => void;
  metric: MapMetric;
  onSelectMetric: (metric: MapMetric) => void;
  onDownloadCsv: () => void;
}

export function DistrictExplorerTabs({
  view,
  onChangeView,
  selectedId,
  onSelectDistrict,
  compareId,
  onSelectCompareDistrict,
  metric,
  onSelectMetric,
  onDownloadCsv,
}: DistrictExplorerTabsProps) {
  const [chartMode, setChartMode] = useState<"metric" | "literacyGap">("metric");
  const [tableQuery, setTableQuery] = useState("");
  const [sortField, setSortField] = useState<TableSortField>("population");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const effectiveChartMetric: Exclude<MapMetric, "districts"> =
    metric === "districts" ? "establishments" : metric;

  const rankedDistricts = useMemo(() => {
    return [...districtStats]
      .map((district) => {
        const value = getDistrictMetricValue(district, effectiveChartMetric);
        return {
          id: district.id,
          name: district.name,
          value: Number(value.toFixed(2)),
          formatted: formatDistrictMetric(value, effectiveChartMetric),
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [effectiveChartMetric]);

  const literacyGapDistricts = useMemo(() => {
    return [...districtStats]
      .map((district) => {
        const male = getMaleLiteracyRate(district);
        const female = getFemaleLiteracyRate(district);
        return {
          id: district.id,
          name: district.name,
          male,
          female,
          gap: male - female,
        };
      })
      .sort((a, b) => a.gap - b.gap);
  }, []);

  const districtA = districtStats.find((d) => d.id === selectedId) ?? districtStats[9];
  const districtB =
    districtStats.find((d) => d.id === compareId) ??
    districtStats.find((d) => d.id !== districtA.id) ??
    districtStats[0];

  const comparisonRows = useMemo(
    () => [
      {
        label: "Population",
        period: "Census 2011",
        a: districtA.population,
        b: districtB.population,
        format: formatCount,
        max: Math.max(...districtStats.map((d) => d.population)),
        valleyText: `Valley total: ${formatCount(valleySummary.population)}`,
      },
      {
        label: "Overall literacy (age 7+)",
        period: "Census 2011",
        a: getLiteracyRate(districtA),
        b: getLiteracyRate(districtB),
        format: formatRate,
        max: 100,
        valleyText: `Valley rate: ${formatRate(valleySummary.literacy)}`,
      },
      {
        label: "Female literacy (age 7+)",
        period: "Census 2011",
        a: getFemaleLiteracyRate(districtA),
        b: getFemaleLiteracyRate(districtB),
        format: formatRate,
        max: 100,
        valleyText: `Valley rate: ${formatRate(valleySummary.femaleLiteracy)}`,
      },
      {
        label: "Local unincorporated businesses",
        period: "ASUSE 2025",
        a: districtA.establishments,
        b: districtB.establishments,
        format: formatCount,
        max: Math.max(...districtStats.map((d) => d.establishments)),
        valleyText: `Valley total: ${formatCount(valleySummary.establishments)}`,
      },
      {
        label: "Hand-embroidery workshops",
        period: "ASUSE 2025",
        a: districtA.handEmbroideryEstablishments,
        b: districtB.handEmbroideryEstablishments,
        format: formatCount,
        max: Math.max(...districtStats.map((d) => d.handEmbroideryEstablishments)),
        valleyText: `Valley total: ${formatCount(valleySummary.handEmbroideryEstablishments)}`,
      },
      {
        label: "Women’s share of business workers",
        period: "ASUSE 2025",
        a: getFemaleWorkerShare(districtA),
        b: getFemaleWorkerShare(districtB),
        format: formatRate,
        max: 50,
        valleyText: `Valley share: ${formatRate(valleySummary.femaleWorkerShare)}`,
      },
    ],
    [districtA, districtB],
  );

  const maxPopulation = useMemo(() => Math.max(...districtStats.map((d) => d.population)), []);
  const maxBusinesses = useMemo(() => Math.max(...districtStats.map((d) => d.establishments)), []);

  const filteredDistricts = useMemo(() => {
    const q = tableQuery.trim().toLowerCase();
    return districtStats
      .filter((district) => `${district.name} ${district.censusName}`.toLowerCase().includes(q))
      .sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "literacy":
            comparison = getLiteracyRate(a) - getLiteracyRate(b);
            break;
          case "maleLiteracy":
            comparison = getMaleLiteracyRate(a) - getMaleLiteracyRate(b);
            break;
          case "femaleLiteracy":
            comparison = getFemaleLiteracyRate(a) - getFemaleLiteracyRate(b);
            break;
          case "establishments":
            comparison = a.establishments - b.establishments;
            break;
          case "workers":
            comparison = a.establishmentWorkers - b.establishmentWorkers;
            break;
          default:
            comparison = a.population - b.population;
        }
        return sortDir === "asc" ? comparison : -comparison;
      });
  }, [tableQuery, sortField, sortDir]);

  const toggleSort = (field: TableSortField) => {
    if (sortField === field) {
      setSortDir((current) => (current === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir(field === "name" ? "asc" : "desc");
    }
  };

  const getAriaSort = (field: TableSortField): "ascending" | "descending" | "none" => {
    if (sortField !== field) return "none";
    return sortDir === "asc" ? "ascending" : "descending";
  };

  const numericMetrics = mapMetrics.filter(
    (
      item,
    ): item is {
      id: Exclude<MapMetric, "districts">;
      label: string;
      period?: string;
      lang: "en";
    } => item.id !== "districts",
  );

  return (
    <section
      aria-labelledby="district-explorer-heading"
      className="mx-auto max-w-6xl px-4 pb-14 sm:px-6"
    >
      <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--surface-shadow)] sm:p-6">
        <Tabs
          value={view}
          onValueChange={(next) => onChangeView(next as DistrictExplorerView)}
          className="w-full"
        >
          <div className="flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 id="district-explorer-heading" className="font-serif text-2xl text-foreground">
                Compare the ten districts
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Rank all ten districts visually, compare any two side by side, or download the CSV.
              </p>
            </div>
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1 sm:w-auto sm:inline-flex">
              <TabsTrigger value="chart" className="min-h-9 px-3 py-1.5 text-xs sm:text-sm">
                Visual ranking
              </TabsTrigger>
              <TabsTrigger value="compare" className="min-h-9 px-3 py-1.5 text-xs sm:text-sm">
                Compare 2
              </TabsTrigger>
              <TabsTrigger value="table" className="min-h-9 px-3 py-1.5 text-xs sm:text-sm">
                Table & CSV
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chart" className="mt-5">
            <div
              role="group"
              aria-label="Choose district ranking chart"
              className="flex flex-wrap items-center gap-2"
            >
              {numericMetrics.map((item) => {
                const isSelected = chartMode === "metric" && effectiveChartMetric === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setChartMode("metric");
                      onSelectMetric(item.id);
                    }}
                    className={cn(
                      "min-h-9 cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-colors sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {item.label} {item.period ? `(${item.period})` : ""}
                  </button>
                );
              })}
              <button
                type="button"
                aria-pressed={chartMode === "literacyGap"}
                onClick={() => setChartMode("literacyGap")}
                className={cn(
                  "min-h-9 cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-colors sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  chartMode === "literacyGap"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                Male–female literacy gap (2011)
              </button>
            </div>

            {chartMode === "metric" ? (
              <div className="mt-5">
                <p className="mb-3 text-xs text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {getDistrictMetricUnit(effectiveChartMetric)}
                  </span>
                  . Click any bar to select that district on the map above (
                  <span className="font-semibold text-primary">{districtA.name}</span> highlighted).
                </p>
                <ChartContainer
                  config={districtRankChartConfig}
                  className="aspect-auto h-[360px] w-full"
                >
                  <BarChart
                    data={rankedDistricts}
                    layout="vertical"
                    margin={{ top: 4, right: 76, left: 4, bottom: 4 }}
                  >
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      hide
                      domain={isRateMetric(effectiveChartMetric) ? [0, 100] : [0, "dataMax"]}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={92}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fontWeight: 600 }}
                    />
                    <ChartTooltip
                      cursor={{ fill: "var(--muted)", opacity: 0.45 }}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const row = payload[0]?.payload as
                          | { name: string; formatted: string }
                          | undefined;
                        if (!row) return null;
                        return (
                          <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-lg">
                            <p className="font-semibold text-foreground">{row.name}</p>
                            <p className="mt-1 tabular-nums text-muted-foreground">
                              <span className="font-semibold text-foreground">
                                {row.formatted}
                              </span>{" "}
                              {getDistrictMetricUnit(effectiveChartMetric)}
                            </p>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[0, 6, 6, 0]}
                      maxBarSize={24}
                      className="cursor-pointer"
                      onClick={(barData) => {
                        const nextId =
                          (barData as { id?: string; payload?: { id?: string } })?.id ??
                          (barData as { payload?: { id?: string } })?.payload?.id;
                        if (nextId) onSelectDistrict(nextId);
                      }}
                    >
                      {rankedDistricts.map((entry) => (
                        <Cell
                          key={entry.id}
                          fill={entry.id === selectedId ? "var(--chart-1)" : "var(--chart-2)"}
                          fillOpacity={entry.id === selectedId ? 1 : 0.78}
                        />
                      ))}
                      <LabelList
                        dataKey="formatted"
                        position="right"
                        className="fill-foreground text-xs font-semibold tabular-nums"
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            ) : (
              <div className="mt-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <p>
                    Sorted from smallest to widest gap (Census 2011, age 7+). Click a row to select
                    that district on the map.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                      <span className="size-2.5 rounded-full bg-chart-1" aria-hidden="true" />
                      Female literacy
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                      <span className="size-2.5 rounded-full bg-chart-2" aria-hidden="true" />
                      Male literacy
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {literacyGapDistricts.map((row) => {
                    const isSelected = row.id === selectedId;
                    return (
                      <button
                        key={row.id}
                        type="button"
                        onClick={() => onSelectDistrict(row.id)}
                        className={cn(
                          "grid w-full cursor-pointer grid-cols-[5.5rem_minmax(0,1fr)_5.5rem] items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors sm:grid-cols-[7rem_minmax(0,1fr)_8.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border/70 bg-background hover:bg-muted/40",
                        )}
                      >
                        <span
                          className={cn(
                            "truncate text-xs font-semibold sm:text-sm",
                            isSelected ? "text-primary" : "text-foreground",
                          )}
                        >
                          {row.name}
                        </span>
                        <span
                          className="relative block h-3 rounded-full bg-muted"
                          aria-hidden="true"
                        >
                          <span
                            className="absolute top-1 h-1 rounded-full bg-foreground/35"
                            style={{
                              left: `${row.female}%`,
                              width: `${Math.max(1, row.male - row.female)}%`,
                            }}
                          />
                          <span
                            className="absolute top-0.5 size-2 -translate-x-1/2 rounded-full bg-chart-1 ring-2 ring-background"
                            style={{ left: `${row.female}%` }}
                          />
                          <span
                            className="absolute top-0.5 size-2 -translate-x-1/2 rounded-full bg-chart-2 ring-2 ring-background"
                            style={{ left: `${row.male}%` }}
                          />
                        </span>
                        <span className="text-right text-xs tabular-nums text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            {row.gap.toFixed(1)} pts
                          </span>
                          <span className="hidden sm:inline">
                            {" "}
                            ({row.female.toFixed(0)}–{row.male.toFixed(0)}%)
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="compare" className="mt-5">
            <div className="grid gap-3 rounded-xl border border-border bg-muted/30 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <div>
                <label
                  htmlFor="compare-district-a"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary"
                >
                  <span className="size-2.5 rounded-full bg-chart-1" aria-hidden="true" />
                  District A (selected on map)
                </label>
                <select
                  id="compare-district-a"
                  value={districtA.id}
                  onChange={(event) => onSelectDistrict(event.target.value)}
                  className={cn(controlClass, "mt-1.5 w-full font-semibold")}
                >
                  {districtStats.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  const prevA = districtA.id;
                  onSelectDistrict(districtB.id);
                  onSelectCompareDistrict(prevA);
                }}
                aria-label="Swap compared districts"
                className={cn(
                  controlClass,
                  "inline-flex cursor-pointer items-center justify-center gap-1.5 font-semibold hover:bg-accent",
                )}
              >
                <ArrowLeftRight className="size-4" aria-hidden="true" />
                <span className="sm:sr-only">Swap</span>
              </button>

              <div>
                <label
                  htmlFor="compare-district-b"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground"
                >
                  <span className="size-2.5 rounded-full bg-chart-2" aria-hidden="true" />
                  District B
                </label>
                <select
                  id="compare-district-b"
                  value={districtB.id}
                  onChange={(event) => onSelectCompareDistrict(event.target.value)}
                  className={cn(controlClass, "mt-1.5 w-full font-semibold")}
                >
                  {districtStats.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {comparisonRows.map((row) => {
                const widthA = Math.min(100, Math.max(2, (row.a / row.max) * 100));
                const widthB = Math.min(100, Math.max(2, (row.b / row.max) * 100));
                return (
                  <div
                    key={row.label}
                    className="rounded-lg border border-border bg-background p-4"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-semibold text-foreground">{row.label}</h4>
                      <span className="text-xs text-muted-foreground">{row.period}</span>
                    </div>

                    <div className="mt-3 space-y-2.5">
                      <div>
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-medium text-foreground">{districtA.name}</span>
                          <span className="font-serif text-base font-semibold tabular-nums text-foreground">
                            {row.format(row.a)}
                          </span>
                        </div>
                        <div
                          className="mt-1 h-2 overflow-hidden rounded-full bg-muted"
                          aria-hidden="true"
                        >
                          <div
                            className="h-full rounded-full bg-chart-1"
                            style={{ width: `${widthA}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-medium text-foreground">{districtB.name}</span>
                          <span className="font-serif text-base font-semibold tabular-nums text-foreground">
                            {row.format(row.b)}
                          </span>
                        </div>
                        <div
                          className="mt-1 h-2 overflow-hidden rounded-full bg-muted"
                          aria-hidden="true"
                        >
                          <div
                            className="h-full rounded-full bg-chart-2"
                            style={{ width: `${widthB}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="mt-2.5 text-xs text-muted-foreground">{row.valleyText}</p>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="table" className="mt-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative sm:w-72">
                <Search
                  className="absolute left-3 top-3 size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={tableQuery}
                  onChange={(event) => setTableQuery(event.target.value)}
                  placeholder="Find a district"
                  aria-label="Search districts"
                  className={cn(controlClass, "w-full pl-9")}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <label htmlFor="district-sort" className="text-xs font-semibold text-foreground">
                  Sort
                </label>
                <select
                  id="district-sort"
                  value={sortField}
                  onChange={(event) => {
                    const next = event.target.value as TableSortField;
                    setSortField(next);
                    setSortDir(next === "name" ? "asc" : "desc");
                  }}
                  className={cn(controlClass, "flex-1 sm:flex-none")}
                >
                  <option value="population">Population (2011)</option>
                  <option value="literacy">Literacy (2011)</option>
                  <option value="femaleLiteracy">Female literacy (2011)</option>
                  <option value="establishments">Local businesses (2025)</option>
                  <option value="workers">Business workers (2025)</option>
                  <option value="name">District name (A–Z)</option>
                </select>
                <button
                  type="button"
                  onClick={onDownloadCsv}
                  className={cn(
                    controlClass,
                    "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold hover:bg-accent",
                  )}
                >
                  <ArrowDownToLine className="size-4" aria-hidden="true" />
                  Download CSV
                </button>
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
                    <th
                      scope="col"
                      aria-sort={getAriaSort("name")}
                      className="sticky left-0 z-10 bg-muted/95 px-4 py-3.5 text-left font-semibold backdrop-blur-xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort("name")}
                        className="inline-flex cursor-pointer items-center gap-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        District
                        <ArrowUpDown
                          className="size-3.5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                    <th
                      scope="col"
                      aria-sort={getAriaSort("population")}
                      className="px-4 py-3.5 text-right font-semibold"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort("population")}
                        className="inline-flex cursor-pointer items-center justify-end gap-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Population, 2011
                        <ArrowUpDown
                          className="size-3.5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                    <th
                      scope="col"
                      aria-sort={getAriaSort("literacy")}
                      className="px-4 py-3.5 text-right font-semibold"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort("literacy")}
                        className="inline-flex cursor-pointer items-center justify-end gap-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Literacy, 7+ (2011)
                        <ArrowUpDown
                          className="size-3.5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                    <th
                      scope="col"
                      aria-sort={getAriaSort("maleLiteracy")}
                      className="px-4 py-3.5 text-right font-semibold"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort("maleLiteracy")}
                        className="inline-flex cursor-pointer items-center justify-end gap-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Male, 7+
                        <ArrowUpDown
                          className="size-3.5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                    <th
                      scope="col"
                      aria-sort={getAriaSort("femaleLiteracy")}
                      className="px-4 py-3.5 text-right font-semibold"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort("femaleLiteracy")}
                        className="inline-flex cursor-pointer items-center justify-end gap-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Female, 7+
                        <ArrowUpDown
                          className="size-3.5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                    <th
                      scope="col"
                      aria-sort={getAriaSort("establishments")}
                      className="px-4 py-3.5 text-right font-semibold"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort("establishments")}
                        className="inline-flex cursor-pointer items-center justify-end gap-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Businesses, 2025
                        <ArrowUpDown
                          className="size-3.5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                    <th
                      scope="col"
                      aria-sort={getAriaSort("workers")}
                      className="px-4 py-3.5 text-right font-semibold"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort("workers")}
                        className="inline-flex cursor-pointer items-center justify-end gap-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Workers, 2025
                        <ArrowUpDown
                          className="size-3.5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredDistricts.map((district) => {
                    const isSelected = district.id === selectedId;
                    const literacy = getLiteracyRate(district);
                    return (
                      <tr
                        key={district.id}
                        onClick={() => onSelectDistrict(district.id)}
                        className={cn(
                          "cursor-pointer transition-colors hover:bg-muted/40",
                          isSelected && "bg-primary/5",
                        )}
                      >
                        <th
                          scope="row"
                          className={cn(
                            "sticky left-0 z-10 px-4 py-3.5 text-left font-semibold",
                            isSelected ? "bg-accent text-primary" : "bg-card text-foreground",
                          )}
                        >
                          {district.name}
                        </th>
                        <td className="px-4 py-3.5 text-right tabular-nums text-foreground">
                          <div>{formatCount(district.population)}</div>
                          <div
                            className="ml-auto mt-1 h-1 w-20 overflow-hidden rounded-full bg-muted"
                            aria-hidden="true"
                          >
                            <div
                              className="h-full rounded-full bg-chart-1/75"
                              style={{
                                width: `${(district.population / maxPopulation) * 100}%`,
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right tabular-nums text-foreground">
                          <div>{formatRate(literacy)}</div>
                          <div
                            className="ml-auto mt-1 h-1 w-16 overflow-hidden rounded-full bg-muted"
                            aria-hidden="true"
                          >
                            <div
                              className="h-full rounded-full bg-chart-2/80"
                              style={{ width: `${literacy}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right tabular-nums text-muted-foreground">
                          {formatRate(getMaleLiteracyRate(district))}
                        </td>
                        <td className="px-4 py-3.5 text-right tabular-nums text-muted-foreground">
                          {formatRate(getFemaleLiteracyRate(district))}
                        </td>
                        <td className="px-4 py-3.5 text-right tabular-nums text-foreground">
                          <div>{formatCount(district.establishments)}</div>
                          <div
                            className="ml-auto mt-1 h-1 w-20 overflow-hidden rounded-full bg-muted"
                            aria-hidden="true"
                          >
                            <div
                              className="h-full rounded-full bg-chart-1/75"
                              style={{
                                width: `${(district.establishments / maxBusinesses) * 100}%`,
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right tabular-nums text-muted-foreground">
                          {formatCount(district.establishmentWorkers)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t-2 border-border bg-muted/40">
                  <tr>
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-muted px-4 py-4 text-left font-semibold"
                    >
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

            {filteredDistricts.length === 0 ? (
              <p role="status" className="mt-4 text-sm text-muted-foreground">
                No district matches “{tableQuery}”. Try another spelling.
              </p>
            ) : null}

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              The Kashmir Valley row always covers all ten districts: literacy uses combined counts
              aged 7+ rather than averaging district rates, and 2025 business figures sum weighted
              estimates across all ten districts.{" "}
              <a
                href={statsSources.census.url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Census 2011
              </a>{" "}
              <span aria-hidden="true">·</span>{" "}
              <a
                href={statsSources.asuse.url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                NSO ASUSE 2025
              </a>
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

const benchmarkChartConfig = {
  valley: {
    label: "Kashmir Valley (10 districts)",
    color: "var(--chart-1)",
  },
  jk: {
    label: "Jammu & Kashmir (whole UT)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ValleyVsJkChartSection() {
  return (
    <section
      aria-labelledby="benchmark-heading"
      className="mx-auto max-w-6xl px-4 pb-14 sm:px-6"
    >
      <SectionHeading
        id="benchmark-heading"
        title="Kashmir Valley vs. Jammu & Kashmir"
        description="Official reports often publish union-territory totals alongside regional survey microdata. Here is how the ten Valley districts compare with all of Jammu & Kashmir across 2023–25 NSO surveys."
      />

      <div className="mt-5 rounded-xl border border-border bg-card p-5 shadow-[var(--surface-shadow)] sm:p-6">
        <ChartContainer config={benchmarkChartConfig} className="aspect-auto h-[390px] w-full">
          <BarChart
            data={valleyVsJkBenchmarks}
            layout="vertical"
            margin={{ top: 4, right: 24, left: 4, bottom: 4 }}
            barGap={3}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value: number) => `${value}%`}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="shortLabel"
              type="category"
              width={126}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fontWeight: 600 }}
            />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.45 }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const row = payload[0]?.payload as
                  | (typeof valleyVsJkBenchmarks)[number]
                  | undefined;
                if (!row) return null;
                const source = statsSources[row.sourceId];
                return (
                  <div className="max-w-xs rounded-lg border border-border bg-background p-3 text-xs shadow-lg">
                    <p className="font-semibold text-foreground">{row.label}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {row.period} · {source.shortTitle}
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <span className="size-2 rounded-sm bg-chart-1" />
                          Kashmir Valley
                        </span>
                        <span className="font-semibold tabular-nums text-foreground">
                          {row.valley.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <span className="size-2 rounded-sm bg-chart-2" />
                          All Jammu & Kashmir
                        </span>
                        <span className="font-semibold tabular-nums text-foreground">
                          {row.jk.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 border-t border-border pt-1.5 text-[11px] text-muted-foreground">
                      {row.note}
                    </p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="valley"
              fill="var(--color-valley)"
              radius={[0, 4, 4, 0]}
              maxBarSize={14}
            />
            <Bar dataKey="jk" fill="var(--color-jk)" radius={[0, 4, 4, 0]} maxBarSize={14} />
          </BarChart>
        </ChartContainer>

        <table className="sr-only">
          <caption>
            Comparison of Kashmir Valley and Jammu & Kashmir percentages across 2023–25 NSO surveys
          </caption>
          <thead>
            <tr>
              <th scope="col">Indicator</th>
              <th scope="col">Kashmir Valley</th>
              <th scope="col">Jammu & Kashmir</th>
              <th scope="col">Period</th>
            </tr>
          </thead>
          <tbody>
            {valleyVsJkBenchmarks.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.label}</th>
                <td>{row.valley.toFixed(2)}%</td>
                <td>{row.jk.toFixed(2)}%</td>
                <td>{row.period}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Kashmir Valley leads in household LPG cooking (87.91% across nine sampled Valley districts
          vs. 72.74% across all of J&K) and household internet access (97.41% vs. 92.73%), while
          fixed home Wi-Fi remains low in both areas (6.66% in the Valley vs. 9.36% across J&K).
        </p>
      </div>
    </section>
  );
}
