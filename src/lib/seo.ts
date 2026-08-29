/**
 * Single source of truth for the site's canonical origin and per-page SEO tags.
 *
 * Route `head()` functions previously hand-wrote canonical + Open Graph tags and
 * repeated the literal origin ~30 times. Use `seo()` instead so the origin lives
 * in exactly one place and every page emits a consistent tag set.
 */

export const SITE_URL = "https://kashmiri.dev";
export const SITE_NAME = "Kashmiri.dev";
export const OG_IMAGE = "/og-image.png";

/** Joins a route path onto the canonical origin. */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoOptions = {
  /** Page title. `" — Kashmiri.dev"` is appended unless `exactTitle` is true. */
  title: string;
  description: string;
  /** Route path, e.g. `/language/numbers`. Drives canonical + `og:url`. */
  path: string;
  /** Override the Open Graph description when it should differ from `description`. */
  ogDescription?: string;
  /** Use `title` verbatim instead of appending the site-name suffix. */
  exactTitle?: boolean;
};

type MetaTag = Record<string, string>;
type LinkTag = Record<string, string>;

/**
 * Builds the `meta` and `links` arrays for a route's `head()`.
 *
 * Spread the result and add any page-specific `scripts` (e.g. JSON-LD) alongside it:
 *
 * ```ts
 * head: () => ({
 *   ...seo({ title: "About", description: "...", path: "/about" }),
 *   scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
 * })
 * ```
 */
export function seo(options: SeoOptions): { meta: MetaTag[]; links: LinkTag[] } {
  const { title, description, path, ogDescription, exactTitle } = options;
  const fullTitle = exactTitle ? title : `${title} — ${SITE_NAME}`;
  const url = absoluteUrl(path);

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: ogDescription ?? description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: ogDescription ?? description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
