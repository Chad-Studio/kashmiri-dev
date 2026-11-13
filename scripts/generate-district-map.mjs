// Regenerate with: node --experimental-strip-types scripts/generate-district-map.mjs
// Geometry licence and provenance: public/data/kashmir-valley-districts.LICENSE.txt
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { format, resolveConfig } from "prettier";

import { districtStats } from "../src/data/stats.ts";

const input = new URL("../public/data/kashmir-valley-districts.geojson", import.meta.url);
const output = new URL("../src/data/district-map.ts", import.meta.url);
const data = JSON.parse(readFileSync(input, "utf8"));
const width = 720;
const height = 660;
const padding = 36;
const round = (value) => Math.round(value * 100) / 100;

function project([longitude, latitude]) {
  const radians = Math.PI / 180;
  return [longitude * radians, -Math.log(Math.tan(Math.PI / 4 + (latitude * radians) / 2))];
}

function polygons(geometry) {
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  throw new Error(`Unsupported geometry: ${geometry.type}`);
}

const coordinates = data.features.flatMap((feature) =>
  polygons(feature.geometry).flat(2).map(project),
);
const minX = Math.min(...coordinates.map(([x]) => x));
const maxX = Math.max(...coordinates.map(([x]) => x));
const minY = Math.min(...coordinates.map(([, y]) => y));
const maxY = Math.max(...coordinates.map(([, y]) => y));
const scale = Math.min(
  (width - 2 * padding) / (maxX - minX),
  (height - 2 * padding) / (maxY - minY),
);
const offsetX = (width - (maxX - minX) * scale) / 2;
const offsetY = (height - (maxY - minY) * scale) / 2;
const toScreen = (point) => {
  const [x, y] = project(point);
  return [(x - minX) * scale + offsetX, (y - minY) * scale + offsetY];
};

function ringArea(ring) {
  return Math.abs(
    ring.reduce((sum, point, i) => {
      const next = ring[(i + 1) % ring.length];
      return sum + point[0] * next[1] - next[0] * point[1];
    }, 0) / 2,
  );
}

// Signed distance to polygon edges, with even-odd handling of interior rings.
function pointDistance([x, y], rings) {
  let inside = false;
  let distanceSquared = Infinity;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [ax, ay] = ring[j];
      const [bx, by] = ring[i];
      if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) inside = !inside;
      const dx = bx - ax;
      const dy = by - ay;
      const lengthSquared = dx * dx + dy * dy;
      const t =
        lengthSquared === 0
          ? 0
          : Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / lengthSquared));
      distanceSquared = Math.min(distanceSquared, (x - ax - t * dx) ** 2 + (y - ay - t * dy) ** 2);
    }
  }
  return (inside ? 1 : -1) * Math.sqrt(distanceSquared);
}

function labelPoint(rings) {
  const outer = rings[0];
  const bounds = [
    Math.min(...outer.map(([x]) => x)),
    Math.min(...outer.map(([, y]) => y)),
    Math.max(...outer.map(([x]) => x)),
    Math.max(...outer.map(([, y]) => y)),
  ];
  let best = {
    x: (bounds[0] + bounds[2]) / 2,
    y: (bounds[1] + bounds[3]) / 2,
    distance: -Infinity,
  };
  let search = bounds;
  for (let pass = 0; pass < 4; pass++) {
    const stepX = (search[2] - search[0]) / 20;
    const stepY = (search[3] - search[1]) / 20;
    for (let ix = 0; ix <= 20; ix++) {
      for (let iy = 0; iy <= 20; iy++) {
        const x = search[0] + stepX * ix;
        const y = search[1] + stepY * iy;
        const distance = pointDistance([x, y], rings);
        if (distance > best.distance) best = { x, y, distance };
      }
    }
    search = [best.x - stepX, best.y - stepY, best.x + stepX, best.y + stepY];
  }
  if (best.distance <= 0) throw new Error("Could not find an interior label point");
  return [round(best.x), round(best.y)];
}

const features = new Map(data.features.map((feature) => [feature.properties.districtId, feature]));
if (features.size !== districtStats.length)
  throw new Error("Boundary and statistics district counts differ");
const shapes = districtStats.map((district, index) => {
  const feature = features.get(district.id);
  if (!feature || feature.properties.displayName !== district.name)
    throw new Error(`Missing boundary: ${district.name}`);
  const screenPolygons = polygons(feature.geometry).map((polygon) =>
    polygon.map((ring) => ring.map(toScreen)),
  );
  const largest = [...screenPolygons].sort((a, b) => ringArea(b[0]) - ringArea(a[0]))[0];
  const [labelX, labelY] = labelPoint(largest);
  const path = screenPolygons
    .flatMap((polygon) =>
      polygon.map(
        (ring) =>
          ring.map(([x, y], i) => `${i === 0 ? "M" : "L"}${round(x)},${round(y)}`).join("") + "Z",
      ),
    )
    .join("");
  return {
    id: district.id,
    name: district.name,
    number: index + 1,
    path,
    labelX,
    labelY,
    lang: "en",
  };
});

const metadata = {
  viewBox: `0 0 ${width} ${height}`,
  width,
  height,
  boundaryYear: data.boundaryYear,
  source: data.source,
  sourceUrl: data.sourceUrl,
  licenceUrl: data.license,
  downloadUrl: "/data/kashmir-valley-districts.geojson",
  lang: "en",
};
const generated = `// Generated from public/data/kashmir-valley-districts.geojson. Do not edit paths by hand.\n// Run scripts/generate-district-map.mjs to regenerate. Geometry: ODbL 1.0 (see public/data).\nexport const districtMapMetadata = ${JSON.stringify(metadata, null, 2)} as const;\n\nexport const districtMapShapes = ${JSON.stringify(shapes, null, 2)} as const;\n`;
writeFileSync(
  output,
  await format(generated, {
    ...(await resolveConfig(fileURLToPath(output))),
    parser: "typescript",
  }),
);
console.log(`Generated ${shapes.length} district paths in ${fileURLToPath(output)}`);
