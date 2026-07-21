import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://kashmiri.dev";

const paths = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const },
  { path: "/history", priority: "0.9", changefreq: "monthly" as const },
  { path: "/language", priority: "0.9", changefreq: "monthly" as const },
  { path: "/people", priority: "0.8", changefreq: "monthly" as const },
  { path: "/civic-guide", priority: "0.8", changefreq: "monthly" as const },
  { path: "/learn-ai", priority: "0.8", changefreq: "monthly" as const },
  { path: "/watch-listen", priority: "0.7", changefreq: "monthly" as const },
  { path: "/about", priority: "0.5", changefreq: "yearly" as const },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = paths
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
