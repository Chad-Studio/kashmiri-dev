<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Kashmiri.dev — Agent Guide

**Kashmiri.dev** (`https://www.kashmiri.dev`) is a calm, fast, ad-free educational website about Kashmir built for readers in the Kashmir Valley.

## Editorial, Scope & Privacy Rules

- **Plain English**: Write all reader-facing copy in clear, accessible English (CEFR B1/B2) with short sentences.
- **Education only**: No daily news and no political commentary.
  - Historical coverage stops at **1947**.
  - Civic guides provide general educational information, never legal advice.
- **Evidence & sourcing**:
  - Cite at least **two sources** for historical and factual entries.
  - Distinguish archaeological evidence (`established`), scholarly debate (`debated`), and inherited tradition (`tradition`) in historical content.
  - Preserve exact reporting years, units, age denominators, estimate labels, and geographic scope (`Kashmir Valley` 10 districts vs. wider `Jammu & Kashmir` union territory).
- **Anonymous reading**: No user accounts, login, ads, or third-party user tracking (`@vercel/speed-insights` is the only performance telemetry).

## Tech Stack & Architecture

- **Framework**: **TanStack Start** (`@tanstack/react-start` + `@tanstack/react-router`) with **React 19**, **TypeScript**, and **Vite 8**.
- **Vite Configuration (`vite.config.ts`)**:
  - Uses `@lovable.dev/vite-tanstack-config`, which already configures TanStack devtools, `tanstackStart`, `viteReact`, `tailwindcss`, `tsConfigPaths` (`@/*` -> `./src/*`), `nitro` SSR, `VITE_*` env injection, and React/TanStack deduplication.
  - **Do NOT re-add those plugins manually** or Vite will fail with duplicate plugin errors.
- **SSR & Error Handling**:
  - `src/server.ts` is the custom SSR server entry (`tanstackStart.server.entry = "server"`). Together with `src/start.ts` request middleware and `src/lib/error-capture.ts`, it catches unhandled SSR throws (including `h3`-swallowed JSON 500s) and serves standalone fallback HTML from `src/lib/error-page.ts`.
  - `src/routes/__root.tsx` defines `RootShell` (preloads `.woff2` fonts, runs an inline `themeInitScript` before paint to prevent dark-mode FOUC, mounts `<SpeedInsights />`), `NotFoundComponent`, and `ErrorComponent` (forwards errors to `src/lib/lovable-error-reporting.ts` in Lovable previews).
  - **Server-only modules**: Do **not** import the Next.js `server-only` package (blocked by ESLint). Use `*.server.ts` filenames or `@tanstack/react-start/server-only`.
- **Styling & UI**:
  - **Tailwind CSS v4** (`src/styles.css`) + **shadcn/ui** Radix primitives (`src/components/ui/*`) + `lucide-react`.
  - Self-hosted variable fonts: `@fontsource-variable/newsreader` (`--font-serif` for headings) and `@fontsource-variable/source-sans-3` (`--font-sans` for body text).
  - Warm light/dark CSS custom properties with Chinar-red primary accent (`#a43b32`).
  - Shared chrome lives in `src/components/SiteLayout.tsx`; page headers and section headings use `src/components/PageIntro.tsx`.

## Routes & Content Map

TanStack Start uses file-based routing in `src/routes/` (see `src/routes/README.md`).

| URL | Route File(s) | Data / Components | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `src/routes/index.tsx` | `SiteLayout` | Hero and 7-path learning index (3 primary + 4 secondary). |
| `/history` | `src/routes/history.tsx` | `src/data/history.ts` | Neolithic-to-1947 timeline with evidence badges, detail modals, and myth checks. |
| `/language` | `src/routes/language.tsx` (layout), `src/routes/language.index.tsx` | `src/data/language.ts` | Koshur scripts (Perso-Arabic, Devanagari, Sharada), searchable vocabulary, loanword badges, and common phrases. |
| `/language/numbers` | `src/routes/language.numbers.tsx` | `src/data/numbers.ts` | Koshur counting 1–50 in Roman transliteration, grouped by tens. |
| `/people` | `src/routes/people.tsx` | `src/data/people.ts` | Profiles of Kashmiri poets/mystics (modal view) and traditional crafts. |
| `/stats` | `src/routes/stats.tsx` | `src/data/stats.ts`, `src/components/DistrictMap.tsx`, `src/data/district-map.ts` | Topic/area-filtered figures, interactive 10-district SVG map, Census 2011 district comparison table, and CSV export. |
| `/civic-guide` | `src/routes/civic-guide.tsx` | `src/data/civic.ts` | Plain-language explainers (RTI, consumer rights, cybercrime `1930`/portal, verifying news) with review dates. |
| `/learn-ai` | `src/routes/learn-ai.tsx` | `src/data/ai.ts` | One-click copyable study/coding/CV prompt recipes, free AI tools, and hallucination/deepfake safety tips. |
| `/watch-listen` | `src/routes/watch-listen.tsx` | `src/data/media.ts` | Curated podcasts, channels, and audio archives. |
| `/about` | `src/routes/about.tsx` | — | Editorial methodology, sourcing standards, and corrections contact (`hello@kashmiri.dev`). |
| `/sitemap.xml` | `src/routes/sitemap[.]xml.ts` + `public/sitemap.xml` | — | Dynamic SSR XML sitemap and matching static XML sitemap. |

### Routing Conventions
- **Never** create `src/pages/`, `app/layout.tsx`, or `src/routes/_app/index.tsx` (Next.js/Remix patterns).
- Parent routes with child routes (e.g., `language.tsx` + `language.index.tsx` + `language.numbers.tsx`) act as layouts and **must** render `<Outlet />`; place the index view in `*.index.tsx`.
- `src/routeTree.gen.ts` is auto-generated — **do not edit it by hand**.

## Data, Statistics & SEO Conventions

- **Localization-ready data (`src/data/*.ts`)**: Keep content structured as typed TypeScript arrays/objects with `lang: "en"` on every record so translations can be added later without changing schemas.
- **Statistics & District Map (`src/data/stats.ts`, `src/components/DistrictMap.tsx`)**:
  - Store raw Census 2011 district counts in `districtStats`. Calculate Valley-wide literacy from combined `literates / (population - children)` (aged 7+) — **never** average district literacy percentages.
  - Keep the distinction explicit between **2021 district boundary shapes** (`public/data/kashmir-valley-districts.geojson`, ODbL 1.0; see `public/data/kashmir-valley-districts.LICENSE.txt`) and **2011 Census counts**, and between **Kashmir Valley** (10 districts) and **Jammu & Kashmir** UT figures.
  - Do not hand-edit `src/data/district-map.ts`. Regenerate SVG paths (requires Node.js 24+) via:
    ```sh
    node --experimental-strip-types scripts/generate-district-map.mjs
    ```
  - Update review dates (`statsReviewedDate`, `lastReviewedDate`, etc.) whenever figures or civic explainers are verified or updated.
- **SEO & Discovery Checklist (when adding or renaming a page)**:
  1. Use canonical URLs on `https://www.kashmiri.dev` (always `www`).
  2. Configure `head()` metadata (`title`, `description`, `og:*`, canonical `<link>`, and Schema.org `application/ld+json`).
  3. Update **both** `public/sitemap.xml` and `src/routes/sitemap[.]xml.ts`.
  4. Update `public/llms.txt` (and `navItems` in `src/components/SiteLayout.tsx` if part of primary navigation).

## Commands & Package Hygiene

- `npm run dev` — start local Vite / TanStack Start dev server
- `npm run build` — build client and Nitro SSR output (also regenerates `routeTree.gen.ts` and validates types/imports)
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint + Prettier checks (`eslint .`)
- `npm run format` — format repository files (`prettier --write .`)
- **Supply-chain guard (`bunfig.toml`)**: `minimumReleaseAge = 86400` blocks packages published less than 24 hours ago when installing with Bun. Confirm with the user before adding any package to `minimumReleaseAgeExcludes`.
