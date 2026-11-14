# Kashmir's Knowledge Hub

Create "Kashmiri.dev" — an educational website about Kashmir, made for Kashmiri people, especially readers in the Kashmir valley. Mission: trustworthy, simple, beautiful education about Kashmiri history, language, and learning with AI. Education only — no politics, no news.

PAGES (v1):

1. Home — a warm hero with the site name, a one-sentence mission in simple English, and three cards linking to History, Language, and Learn with AI.

2. History — a vertical, scrollable timeline of Kashmir from ancient times to 1947. Each timeline entry shows the era/dynasty name, its years, and one simple fact. Clicking an entry opens a modal with a longer description (3-4 short sentences), notable people of that era, and a "Sources" list. Include these entries in order, with accurate years: Ancient Kashmir and the Nilamata Purana origin story; Kalhana and the Rajatarangini; Karkota dynasty and Lalitaditya Muktapida; Utpala dynasty and Avantivarman; Lohara dynasty; Shah Mir Sultanate (founded 1339); Sultan Zain-ul-Abidin "Budshah" and his golden age; Chak dynasty; Mughal rule (from 1586); Afghan Durrani rule (from 1753); Sikh rule (from 1819); Dogra rule (1846–1947). End the timeline with a closing card that says modern history is beyond this site's scope for now.

3. Language (Koshur) — sections: (a) short intro "About the Kashmiri language"; (b) "Scripts" — brief cards explaining the Perso-Arabic script (official), Devanagari, and the historical Sharada script; (c) "Starter vocabulary" — a searchable list of ~30 common Kashmiri words (Roman transliteration + English meaning); (d) "Common phrases" — 10 everyday phrases with transliteration and meaning.

4. Learn with AI — three sections: (a) "Learn anything with AI" — ready-to-copy prompt recipes (each in a card with a copy button) for exam preparation, English practice, learning to code, and writing a CV; (b) "Free AI tools worth trying" — a short vetted list with one line on what each is good at; (c) "AI awareness" — simple explanations of AI hallucinations, deepfakes, and how to spot AI-generated fake news and rumors.

DESIGN: clean, modern, culturally warm — inspired by Kashmir: deep chinar-autumn red/orange accents, saffron highlights, warm paper-like neutrals. Mobile-first, fast, and lightweight: minimal images, no heavy animations, tasteful not kitschy.

IMPORTANT REQUIREMENTS:
- All text in simple English that a non-native speaker can read easily (CEFR B1/B2). Short sentences.
- Structure all content (timeline entries, vocabulary, phrases, prompt recipes, tools) as typed data objects/arrays with a lang: "en" field on every record, so translations can be added later without restructuring.
- Every history timeline entry must include a sources: string[] field, shown inside its modal.
- No user accounts, no login, no analytics, no third-party trackers. Anonymous reading only.
- Responsive and accessible (good contrast, keyboard-friendly modals).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kashmiri-dev.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eaea15d3-cfde-420b-b66d-a4664b26d705).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Statistics

The `/stats` page covers population, literacy, education, work, economy,
households, and digital access. The main navigation and home page link to it.
Readers can explore key data contrasts, an interactive 100-unit Valley grid, a
Kashmir Valley vs. Jammu & Kashmir benchmark chart, topic/area/keyword filters with
one-click sourced citations, visual district rankings, two-district comparisons,
and CSV export.

An interactive district map uses a local ten-feature GeoJSON subset of
geoBoundaries gbOpen IND ADM2 (2021; Pathways Data). It supports district selection,
local rank stories, shareable URLs, and shading by Census 2011 population/literacy
or NSO ASUSE 2025 local businesses, hand-embroidery units, and women workers, with
keyboard and text-button alternatives. The map distinguishes the 2021 boundary
snapshot from the underlying reporting years.

The derivative boundary data and generated paths are published under ODbL 1.0;
attribution, licence links, and a GeoJSON download appear beside the map. See
`public/data/kashmir-valley-districts.LICENSE.txt`. Regenerate the SVG path data
with Node.js 24 or later:

```sh
node --experimental-strip-types scripts/generate-district-map.mjs
```

The map uses local SVG paths and does not require a map API key or a tile server.

`src/data/stats.ts` stores typed figures, source URLs, reporting periods, geographic
coverage, original Census 2011 district counts, and weighted NSO 2023–25 survey
estimates (PLFS 2025, ASUSE 2025, HCES 2023–24, and CMS: Telecom 2025). All content
records include `lang: "en"`. Valley rates and shares are calculated from combined
numerators and denominators rather than averaging district percentages.

School counts, economic output, per-capita income, and published rural/urban MPCE
figures cover the wider Jammu & Kashmir union territory and are labelled separately.
Economic advance estimates and NSO sample survey estimates are clearly marked. The
statistics page reads checked-in data and requires no visitor account or tracking.

When updating a figure, check its source, reporting year, units, age group, and
coverage. Update the review date after checking the data. When adding a new page,
update both `public/sitemap.xml` and `src/routes/sitemap[.]xml.ts`.

## Development

Prefer working locally? Use [Bun](https://bun.sh) (this repository uses `bun.lock` and `bunfig.toml`):

```sh
git clone <this-repository-url>
cd <repository-name>
bun install
bun run dev
```
