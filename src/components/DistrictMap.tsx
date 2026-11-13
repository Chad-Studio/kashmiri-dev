import { ArrowUpRight } from "lucide-react";
import { useId, useState } from "react";

import { SectionHeading } from "@/components/PageIntro";
import { districtMapMetadata, districtMapShapes } from "@/data/district-map";
import {
  districtStats,
  formatCount,
  formatRate,
  getFemaleLiteracyRate,
  getFemaleWorkerShare,
  getLiteracyRate,
  getMaleLiteracyRate,
  getManufacturingShare,
  statsSources,
} from "@/data/stats";
import { cn } from "@/lib/utils";

type MapMetric = "districts" | "population" | "literacy" | "establishments";

const mappedDistricts = districtMapShapes.flatMap((shape) => {
  const stats = districtStats.find((district) => district.id === shape.id);
  return stats ? [{ ...shape, stats }] : [];
});

const mapMetrics: { id: MapMetric; label: string }[] = [
  { id: "districts", label: "Districts" },
  { id: "population", label: "Population" },
  { id: "literacy", label: "Literacy" },
  { id: "establishments", label: "Local businesses" },
];

const tint = (strength: number) =>
  `color-mix(in srgb, var(--primary) ${strength}%, var(--background))`;

export function DistrictMap() {
  const [selectedId, setSelectedId] = useState("010");
  const [metric, setMetric] = useState<MapMetric>("districts");
  const titleId = useId();
  const descriptionId = useId();
  const selected = districtStats.find((district) => district.id === selectedId) ?? districtStats[0];
  const literacy = getLiteracyRate(selected);
  const maleLiteracy = getMaleLiteracyRate(selected);
  const femaleLiteracy = getFemaleLiteracyRate(selected);
  const femaleWorkerShare = getFemaleWorkerShare(selected);
  const manufacturingShare = getManufacturingShare(selected);
  const metricValue = (district: (typeof districtStats)[number]) => {
    if (metric === "population") return district.population;
    if (metric === "establishments") return district.establishments;
    return getLiteracyRate(district);
  };
  const values = mappedDistricts.map((district) => metricValue(district.stats));
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const formatMetric =
    metric === "population" || metric === "establishments" ? formatCount : formatRate;
  const metricUnitLabel =
    metric === "population"
      ? "people (2011)"
      : metric === "establishments"
        ? "local businesses (2025)"
        : "literacy, age 7+ (2011)";

  const fill = (district: (typeof mappedDistricts)[number]) => {
    if (metric === "districts") {
      return district.id === selectedId ? "var(--primary)" : "var(--accent)";
    }
    const fraction =
      maximum === minimum ? 0.5 : (metricValue(district.stats) - minimum) / (maximum - minimum);
    return tint(Math.round(20 + fraction * 65));
  };

  return (
    <section aria-labelledby="district-map-heading" className="mx-auto max-w-6xl px-4 pb-14">
      <SectionHeading
        id="district-map-heading"
        title="Explore Kashmir Valley’s districts"
        description="Choose a district on the map or from the list to see its Census 2011 population and literacy alongside 2025 unincorporated local business figures."
      />
      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--surface-shadow)]">
        <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Choose map shading"
            className="flex flex-wrap items-center gap-2"
          >
            <span className="mr-1 text-sm font-semibold text-foreground">Show</span>
            {mapMetrics.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={metric === item.id}
                onClick={() => setMetric(item.id)}
                className={cn(
                  "min-h-11 rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  metric === item.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Boundaries: {districtMapMetadata.boundaryYear} <span aria-hidden="true">·</span>{" "}
            {metric === "establishments"
              ? "Shading: NSO ASUSE 2025"
              : "Figures: Census 2011 & ASUSE 2025"}
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,1fr)]">
          <div className="min-w-0 border-b border-border bg-muted/20 p-3 sm:p-4 lg:border-b-0 lg:border-r">
            <svg
              viewBox={districtMapMetadata.viewBox}
              role="group"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="mx-auto block h-auto w-full max-w-[720px]"
            >
              <title id={titleId}>Kashmir Valley district map</title>
              <desc id={descriptionId}>
                Ten districts, north up. Select a district with a click, or focus it and press Enter
                or Space. The district list provides the same choices. Population and literacy
                figures refer to Census 2011, and local business figures refer to ASUSE 2025.
              </desc>
              {mappedDistricts.map((district) => (
                <path
                  key={district.id}
                  d={district.path}
                  fill={fill(district)}
                  fillRule="evenodd"
                  stroke={
                    district.id === selectedId ? "var(--foreground)" : "var(--muted-foreground)"
                  }
                  strokeWidth={district.id === selectedId ? 2.5 : 1}
                  vectorEffect="non-scaling-stroke"
                  role="button"
                  tabIndex={0}
                  aria-label={`${district.name} district`}
                  aria-pressed={district.id === selectedId}
                  onClick={() => setSelectedId(district.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(district.id);
                    }
                  }}
                  className="cursor-pointer transition-[fill,stroke] duration-150 hover:brightness-95 focus-visible:stroke-foreground focus-visible:[stroke-width:3] focus-visible:outline-none"
                >
                  <title>{`${district.name}: ${formatMetric(metricValue(district.stats))} ${metricUnitLabel}`}</title>
                </path>
              ))}
              <g aria-hidden="true" pointerEvents="none">
                {mappedDistricts.map((district) => (
                  <g key={district.id}>
                    <text
                      x={district.labelX}
                      y={district.labelY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={16}
                      fontWeight={600}
                      fill="var(--foreground)"
                      stroke="var(--background)"
                      strokeWidth={3}
                      strokeLinejoin="round"
                      paintOrder="stroke"
                      className="hidden sm:block"
                    >
                      {district.name}
                    </text>
                    <g className="sm:hidden">
                      <circle
                        cx={district.labelX}
                        cy={district.labelY}
                        r={18}
                        fill="var(--background)"
                        stroke="var(--foreground)"
                        strokeWidth={1}
                      />
                      <text
                        x={district.labelX}
                        y={district.labelY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={26}
                        fontWeight={600}
                        fill="var(--foreground)"
                      >
                        {district.number}
                      </text>
                    </g>
                  </g>
                ))}
                <g
                  transform="translate(681 25)"
                  fill="var(--foreground)"
                  stroke="var(--foreground)"
                >
                  <text y={0} textAnchor="middle" fontSize={15} stroke="none">
                    N
                  </text>
                  <path d="M0,14L0,50M-5,24L0,14L5,24" fill="none" strokeWidth={2} />
                </g>
              </g>
            </svg>
            <div className="flex min-h-10 flex-wrap items-center justify-center gap-2 px-2 text-xs text-muted-foreground">
              {metric === "districts" ? (
                <>
                  <span
                    className="size-3 rounded-sm border border-border bg-primary"
                    aria-hidden="true"
                  />
                  Selected district
                </>
              ) : (
                <>
                  <span>{formatMetric(minimum)}</span>
                  <span
                    className="h-2.5 w-28 rounded-full"
                    style={{ background: `linear-gradient(to right, ${tint(20)}, ${tint(85)})` }}
                    aria-hidden="true"
                  />
                  <span>{formatMetric(maximum)}</span>
                  <span>{metricUnitLabel}</span>
                </>
              )}
            </div>
          </div>

          <aside className="min-w-0 p-5 sm:p-6" aria-labelledby="selected-district-heading">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Selected district
            </p>
            <h3 id="selected-district-heading" className="mt-2 font-serif text-3xl text-foreground">
              {selected.name}
            </h3>
            <p role="status" className="sr-only">
              {selected.name} selected. Population {formatCount(selected.population)}, literacy{" "}
              {formatRate(literacy)}, Census 2011. Local businesses{" "}
              {formatCount(selected.establishments)}, workers{" "}
              {formatCount(selected.establishmentWorkers)}, NSO ASUSE 2025.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Kashmir Valley <span aria-hidden="true">·</span> Census 2011
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-border py-4">
              <div>
                <dt className="text-xs text-muted-foreground">Population</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                  {formatCount(selected.population)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Literacy, age 7+</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                  {formatRate(literacy)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Male literacy, age 7+</dt>
                <dd className="mt-1 text-base font-semibold tabular-nums text-foreground">
                  {formatRate(maleLiteracy)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Female literacy, age 7+</dt>
                <dd className="mt-1 text-base font-semibold tabular-nums text-foreground">
                  {formatRate(femaleLiteracy)}
                </dd>
              </div>
            </dl>
            <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
              Male–female literacy gap:{" "}
              <span className="font-semibold tabular-nums text-foreground">
                {(maleLiteracy - femaleLiteracy).toFixed(2)} percentage points
              </span>
              .
            </p>

            <p className="mt-5 text-sm text-muted-foreground">
              Local businesses <span aria-hidden="true">·</span> NSO ASUSE 2025
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-border py-4">
              <div>
                <dt className="text-xs text-muted-foreground">Establishments</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                  {formatCount(selected.establishments)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Workers</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                  {formatCount(selected.establishmentWorkers)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Manufacturing</dt>
                <dd className="mt-1 text-base font-semibold tabular-nums text-foreground">
                  {formatRate(manufacturingShare)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Women workers</dt>
                <dd className="mt-1 text-base font-semibold tabular-nums text-foreground">
                  {formatRate(femaleWorkerShare)}
                </dd>
              </div>
            </dl>
            <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
              Includes{" "}
              <span className="font-semibold tabular-nums text-foreground">
                {formatCount(selected.handEmbroideryEstablishments)}
              </span>{" "}
              hand-embroidery units ({formatCount(selected.surveyedEstablishments)} surveyed
              businesses).
            </p>

            <p className="mt-5 text-sm font-semibold text-foreground">Choose a district</p>
            <div
              role="group"
              aria-label="Choose a district"
              className="mt-2 grid grid-cols-2 gap-2"
            >
              {mappedDistricts.map((district) => (
                <button
                  key={district.id}
                  type="button"
                  aria-pressed={district.id === selectedId}
                  onClick={() => setSelectedId(district.id)}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-md border px-2.5 py-2 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    district.id === selectedId
                      ? "border-primary bg-accent text-primary"
                      : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span
                    className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs tabular-nums text-foreground"
                    aria-hidden="true"
                  >
                    {district.number}
                  </span>
                  {district.name}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={statsSources.census.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-8 items-center gap-1 rounded-sm text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Census of India 2011
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
              <a
                href={statsSources.asuse.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-8 items-center gap-1 rounded-sm text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                NSO ASUSE 2025
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>

        <div className="border-t border-border px-4 py-4 text-xs leading-relaxed text-muted-foreground sm:px-5">
          <p>
            Boundary data:{" "}
            <a
              href={districtMapMetadata.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Pathways Data / geoBoundaries
            </a>
            , {districtMapMetadata.boundaryYear}, under{" "}
            <a
              href={districtMapMetadata.licenceUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              ODbL 1.0
            </a>
            . Simplified boundaries for orientation; the map covers the ten Valley districts, not
            the wider Kashmir region.
          </p>
          <p className="mt-1">
            <a
              href={districtMapMetadata.downloadUrl}
              download="kashmir-valley-districts.geojson"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Download boundary GeoJSON
            </a>{" "}
            <span aria-hidden="true">·</span>{" "}
            <a
              href="/data/kashmir-valley-districts.LICENSE.txt"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Attribution & licence
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
