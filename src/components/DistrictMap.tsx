import { ArrowUpRight, Check, Link2 } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { SectionHeading } from "@/components/PageIntro";
import { districtMapMetadata, districtMapShapes } from "@/data/district-map";
import {
  districtStats,
  formatCount,
  formatDistrictMetric,
  formatRate,
  getDistrictHighlights,
  getDistrictMetricUnit,
  getDistrictMetricValue,
  getDistrictRank,
  getDistrictSlug,
  getFemaleLiteracyRate,
  getFemaleWorkerShare,
  getHandEmbroideryShare,
  getLiteracyRate,
  getMaleLiteracyRate,
  getManufacturingShare,
  mapMetrics,
  statsSources,
  type MapMetric,
} from "@/data/stats";
import { cn } from "@/lib/utils";

export interface DistrictMapProps {
  selectedId?: string;
  onSelectDistrict?: (id: string) => void;
  metric?: MapMetric;
  onSelectMetric?: (metric: MapMetric) => void;
}

const mappedDistricts = districtMapShapes.flatMap((shape) => {
  const stats = districtStats.find((district) => district.id === shape.id);
  return stats ? [{ ...shape, stats }] : [];
});

const tint = (strength: number) =>
  `color-mix(in srgb, var(--primary) ${strength}%, var(--background))`;

export function DistrictMap({
  selectedId: controlledSelectedId,
  onSelectDistrict,
  metric: controlledMetric,
  onSelectMetric,
}: DistrictMapProps = {}) {
  const [internalSelectedId, setInternalSelectedId] = useState("010");
  const [internalMetric, setInternalMetric] = useState<MapMetric>("districts");
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedId = controlledSelectedId ?? internalSelectedId;
  const metric = controlledMetric ?? internalMetric;

  const handleSelectDistrict = (id: string) => {
    if (onSelectDistrict) {
      onSelectDistrict(id);
    } else {
      setInternalSelectedId(id);
    }
  };

  const handleSelectMetric = (nextMetric: MapMetric) => {
    if (onSelectMetric) {
      onSelectMetric(nextMetric);
    } else {
      setInternalMetric(nextMetric);
    }
  };

  useEffect(() => {
    setCopiedLink(false);
  }, [selectedId, metric]);

  const titleId = useId();
  const descriptionId = useId();
  const selected = districtStats.find((district) => district.id === selectedId) ?? districtStats[0];
  const literacy = getLiteracyRate(selected);
  const maleLiteracy = getMaleLiteracyRate(selected);
  const femaleLiteracy = getFemaleLiteracyRate(selected);
  const femaleWorkerShare = getFemaleWorkerShare(selected);
  const manufacturingShare = getManufacturingShare(selected);
  const embroideryShare = getHandEmbroideryShare(selected);
  const highlights = getDistrictHighlights(selected);

  const values = mappedDistricts.map((district) => getDistrictMetricValue(district.stats, metric));
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const metricUnitLabel = getDistrictMetricUnit(metric);
  const activeMetricDef = mapMetrics.find((item) => item.id === metric) ?? mapMetrics[0];
  const selectedRank = metric === "districts" ? null : getDistrictRank(selected, metric);

  const shadingCaption =
    metric === "districts"
      ? "Figures: Census 2011 & ASUSE 2025"
      : metric === "population" || metric === "literacy"
        ? "Shading: Census 2011"
        : "Shading: NSO ASUSE 2025";

  const fill = (district: (typeof mappedDistricts)[number]) => {
    if (metric === "districts") {
      return district.id === selectedId ? "var(--primary)" : "var(--accent)";
    }
    const value = getDistrictMetricValue(district.stats, metric);
    const fraction = maximum === minimum ? 0.5 : (value - minimum) / (maximum - minimum);
    return tint(Math.round(20 + fraction * 65));
  };

  const copyDistrictLink = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("district", getDistrictSlug(selected));
    if (metric !== "districts") {
      url.searchParams.set("metric", metric);
    } else {
      url.searchParams.delete("metric");
    }
    url.hash = "districts";
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Ignore clipboard failures in restricted contexts
    }
  };

  return (
    <section
      id="districts"
      aria-labelledby="district-map-heading"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-6 sm:px-6"
    >
      <SectionHeading
        id="district-map-heading"
        title="Explore Kashmir Valley’s ten districts"
        description="Tap any district on the map or list to see what stands out locally across Census 2011 population and literacy and 2025 unincorporated small businesses."
      />
      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--surface-shadow)]">
        <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:px-5 xl:flex-row xl:items-center xl:justify-between">
          <div
            role="group"
            aria-label="Choose map shading"
            className="flex flex-wrap items-center gap-2"
          >
            <span className="mr-1 text-sm font-semibold text-foreground">Shade by</span>
            {mapMetrics.map((item) => {
              const isActive = metric === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleSelectMetric(item.id)}
                  className={cn(
                    "inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <span>{item.label}</span>
                  {item.period ? (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[11px] font-medium tabular-nums",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {item.period}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Boundaries: {districtMapMetadata.boundaryYear} <span aria-hidden="true">·</span>{" "}
            {shadingCaption}
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,1fr)]">
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
              {mappedDistricts.map((district) => {
                const value = getDistrictMetricValue(district.stats, metric);
                return (
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
                    onClick={() => handleSelectDistrict(district.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleSelectDistrict(district.id);
                      }
                    }}
                    className="cursor-pointer transition-[fill,stroke] duration-150 hover:brightness-95 focus-visible:stroke-foreground focus-visible:[stroke-width:3] focus-visible:outline-none"
                  >
                    <title>{`${district.name}: ${formatDistrictMetric(value, metric)} ${metricUnitLabel}`}</title>
                  </path>
                );
              })}
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
                        fill={district.id === selectedId ? "var(--primary)" : "var(--background)"}
                        stroke="var(--foreground)"
                        strokeWidth={district.id === selectedId ? 1.75 : 1}
                      />
                      <text
                        x={district.labelX}
                        y={district.labelY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={24}
                        fontWeight={700}
                        fill={
                          district.id === selectedId
                            ? "var(--primary-foreground)"
                            : "var(--foreground)"
                        }
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
                  <span>Selected district (tap any district to inspect)</span>
                </>
              ) : (
                <>
                  <span className="tabular-nums">{formatDistrictMetric(minimum, metric)}</span>
                  <span
                    className="h-2.5 w-28 rounded-full"
                    style={{ background: `linear-gradient(to right, ${tint(20)}, ${tint(85)})` }}
                    aria-hidden="true"
                  />
                  <span className="tabular-nums">{formatDistrictMetric(maximum, metric)}</span>
                  <span>{metricUnitLabel}</span>
                </>
              )}
            </div>

            <div
              aria-live="polite"
              className="mt-2 rounded-lg border border-border bg-card p-3.5 shadow-2xs lg:hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Selected · District {mappedDistricts.find((d) => d.id === selected.id)?.number}
                  </p>
                  <p className="mt-0.5 font-serif text-xl font-semibold text-foreground">
                    {selected.name}
                  </p>
                </div>
                <a
                  href="#selected-district-heading"
                  className="inline-flex min-h-9 shrink-0 items-center rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Full profile ↓
                </a>
              </div>
              {metric === "districts" ? (
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {formatCount(selected.population)}
                  </span>{" "}
                  people (2011) ·{" "}
                  <span className="font-semibold text-foreground">{formatRate(literacy)}</span>{" "}
                  literacy ·{" "}
                  <span className="font-semibold text-foreground">
                    {formatCount(selected.establishments)}
                  </span>{" "}
                  local businesses (2025)
                </p>
              ) : (
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold tabular-nums text-foreground">
                    {formatDistrictMetric(getDistrictMetricValue(selected, metric), metric)}
                  </span>{" "}
                  {metricUnitLabel} ·{" "}
                  <span className="font-semibold text-primary">
                    Rank #{selectedRank} of 10 in {activeMetricDef.label.toLowerCase()}
                  </span>
                </p>
              )}
            </div>
          </div>

          <aside className="min-w-0 p-5 sm:p-6" aria-labelledby="selected-district-heading">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Selected district
              </p>
              <button
                type="button"
                onClick={copyDistrictLink}
                className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {copiedLink ? (
                  <>
                    <Check className="size-3.5 text-primary" aria-hidden="true" />
                    <span className="text-primary">Link copied</span>
                  </>
                ) : (
                  <>
                    <Link2 className="size-3.5" aria-hidden="true" />
                    <span>Share {selected.name}</span>
                  </>
                )}
              </button>
            </div>

            <h3
              id="selected-district-heading"
              className="mt-1.5 scroll-mt-24 font-serif text-3xl text-foreground"
            >
              {selected.name}
            </h3>
            <p role="status" className="sr-only">
              {selected.name} selected. Population {formatCount(selected.population)}, literacy{" "}
              {formatRate(literacy)}, Census 2011. Local businesses{" "}
              {formatCount(selected.establishments)}, workers{" "}
              {formatCount(selected.establishmentWorkers)}, NSO ASUSE 2025.
            </p>

            <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3.5">
              <div className="flex flex-wrap gap-1.5">
                {selectedRank !== null ? (
                  <span className="rounded-full border border-primary/30 bg-background px-2.5 py-0.5 text-xs font-semibold text-primary">
                    #{selectedRank} of 10 in {activeMetricDef.label.toLowerCase()}
                  </span>
                ) : null}
                {highlights.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {highlights.story}
              </p>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Census 2011 · Population & literacy
            </p>
            <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-3.5 border-y border-border py-3.5">
              <div>
                <dt className="text-xs text-muted-foreground">Population</dt>
                <dd className="mt-0.5 text-xl font-semibold tabular-nums text-foreground">
                  {formatCount(selected.population)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Literacy, age 7+</dt>
                <dd className="mt-0.5 text-xl font-semibold tabular-nums text-foreground">
                  {formatRate(literacy)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Male literacy, 7+</dt>
                <dd className="mt-0.5 text-base font-semibold tabular-nums text-foreground">
                  {formatRate(maleLiteracy)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Female literacy, 7+</dt>
                <dd className="mt-0.5 text-base font-semibold tabular-nums text-foreground">
                  {formatRate(femaleLiteracy)}
                </dd>
              </div>
            </dl>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Male–female literacy gap:{" "}
              <span className="font-semibold tabular-nums text-foreground">
                {(maleLiteracy - femaleLiteracy).toFixed(2)} percentage points
              </span>
              .
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              NSO ASUSE 2025 · Local businesses
            </p>
            <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-3.5 border-y border-border py-3.5">
              <div>
                <dt className="text-xs text-muted-foreground">Establishments</dt>
                <dd className="mt-0.5 text-xl font-semibold tabular-nums text-foreground">
                  {formatCount(selected.establishments)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Workers</dt>
                <dd className="mt-0.5 text-xl font-semibold tabular-nums text-foreground">
                  {formatCount(selected.establishmentWorkers)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Manufacturing</dt>
                <dd className="mt-0.5 text-base font-semibold tabular-nums text-foreground">
                  {formatRate(manufacturingShare)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Women workers</dt>
                <dd className="mt-0.5 text-base font-semibold tabular-nums text-foreground">
                  {formatRate(femaleWorkerShare)}
                </dd>
              </div>
            </dl>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Includes{" "}
              <span className="font-semibold tabular-nums text-foreground">
                {formatCount(selected.handEmbroideryEstablishments)}
              </span>{" "}
              hand-embroidery units ({formatRate(embroideryShare)} of local businesses;{" "}
              {formatCount(selected.surveyedEstablishments)} surveyed).
            </p>

            <div className="mt-4 sm:hidden">
              <p className="text-sm font-semibold text-foreground">Choose a district</p>
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
                    onClick={() => handleSelectDistrict(district.id)}
                    className={cn(
                      "flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-2.5 py-1.5 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      district.id === selectedId
                        ? "border-primary bg-accent text-primary"
                        : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex size-5 shrink-0 items-center justify-center rounded-full text-xs tabular-nums",
                        district.id === selectedId
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground",
                      )}
                      aria-hidden="true"
                    >
                      {district.number}
                    </span>
                    <span className="truncate">{district.name}</span>
                  </button>
                ))}
              </div>
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
