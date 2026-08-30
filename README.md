# Kashmir's Knowledge Hub

Create "Kashmiri.dev" — an educational website about Kashmir, made for Kashmiri people, especially readers in the Kashmir valley. Mission: trustworthy, simple, beautiful education about Kashmiri history, language, and learning with AI. Education only — no politics, no news.

PAGES (v1):

1. Home — a warm hero with the site name, a one-sentence mission in simple English, and three cards linking to History, Language, and Learn with AI.

2. History — a vertical, scrollable timeline of Kashmir from ancient times to 1947. Each timeline entry shows the era/dynasty name, its years, and one simple fact. Clicking an entry opens a modal with a longer description (3-4 short sentences), notable people of that era, and a "Sources" list. Include these entries in order, with accurate years: Ancient Kashmir and the Nilamata Purana origin story; Kalhana and the Rajatarangini; Karkota dynasty and Lalitaditya Muktapida; Utpala dynasty and Avantivarman; Lohara dynasty; Shah Mir Sultanate (founded 1339); Sultan Zain-ul-Abidin "Budshah" and his golden age; Chak dynasty; Mughal rule (from 1586); Afghan Durrani rule (from 1753); Sikh rule (from 1819); Dogra rule (1846–1947). End the timeline with a closing card that says modern history is beyond this site's scope for now.

3. Language (Koshur) — sections: (a) short intro "About the Kashmiri language"; (b) "Scripts" — brief cards explaining the Perso-Arabic script (official), Devanagari, and the historical Sharada script; (c) "Starter vocabulary" — a searchable list of ~30 common Kashmiri words (Roman transliteration + English meaning); (d) "Common phrases" — 10 everyday phrases with transliteration and meaning.

4. Learn AI — a six-lesson beginner AI literacy course with browser-local progress, short practice tasks and knowledge checks; optional everyday, study/work, and builder paths; prompts that keep the learner participating; and a task-based tool guide.

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

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
