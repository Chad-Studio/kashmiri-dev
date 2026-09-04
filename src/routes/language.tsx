import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import { PageIntro, SectionHeading } from "@/components/PageIntro";
import { SiteLayout } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";
import { phrases, scripts, vocabulary } from "@/data/language";

export const Route = createFileRoute("/language")({
  head: () => ({
    meta: [
      { title: "Kashmiri Language (Koshur) | Kashmiri.dev" },
      {
        name: "description",
        content:
          "Learn about Kashmiri (Koshur): its scripts, common words, and everyday phrases. Made for beginners.",
      },
      { property: "og:title", content: "Kashmiri Language (Koshur) | Kashmiri.dev" },
      {
        property: "og:description",
        content:
          "A gentle intro to the Kashmiri language, including scripts, starter vocabulary, and common phrases.",
      },
      { property: "og:url", content: "https://kashmiri.dev/language" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/language" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "Kashmiri Language (Koshur)",
          description:
            "Scripts, starter vocabulary, and everyday phrases in Kashmiri, for beginners.",
          inLanguage: "en",
          learningResourceType: "Language guide",
          url: "https://kashmiri.dev/language",
        }),
      },
    ],
  }),
  component: LanguagePage,
});

function LoanwordBadge() {
  return (
    <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
      Loanword
    </span>
  );
}

function LanguagePage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return vocabulary;

    return vocabulary.filter(
      (word) =>
        word.koshur.toLowerCase().includes(normalizedQuery) ||
        word.english.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <SiteLayout>
      <PageIntro
        label="Language"
        title="Koshur, the Kashmiri language"
        description={
          <p>
            Kashmiri, called <em>Koshur</em> by its speakers, is spoken by around 7 million people,
            mostly in the Kashmir valley. It has a rich poetry tradition and a long, mixed heritage
            of Sanskrit, Persian, and Central Asian influence. Kashmiri is one of the 22 scheduled
            languages of India.
          </p>
        }
      />

      <section className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <SectionHeading title="Scripts" />
        <div className="mt-5 grid sm:grid-cols-3 sm:gap-x-6">
          {scripts.map((script) => (
            <article key={script.name} className="border-t border-border py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-xl text-foreground">{script.name}</h3>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {script.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {script.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title="Starter vocabulary" />
          <Input
            type="search"
            placeholder="Search a word"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 sm:max-w-xs"
            aria-label="Search vocabulary"
          />
        </div>
        <p className="mt-5 border-s-2 border-primary/40 ps-4 text-sm leading-relaxed text-muted-foreground">
          Roman spellings of Kashmiri vary, so treat these as a starting point rather than a fixed
          standard. We are reviewing the words with native speakers and plan to add native script
          and audio.
        </p>
        <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <ul className="divide-y divide-border">
            {filtered.map((word) => (
              <li key={word.koshur} className="flex items-start justify-between gap-4 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span lang="ks" className="font-serif text-lg text-foreground">
                      {word.koshur}
                    </span>
                    {word.isLoanword && <LoanwordBadge />}
                  </div>
                  {word.note && (
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">{word.note}</p>
                  )}
                </div>
                <span className="shrink-0 text-right text-sm text-muted-foreground">
                  {word.english}
                </span>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                No word matches your search. Try a shorter spelling.
              </li>
            )}
          </ul>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Words are shown in Roman transliteration. Pronunciation may vary by region.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <SectionHeading title="Common phrases" />
        <ul className="mt-5 divide-y divide-border border-y border-border">
          {phrases.map((phrase) => (
            <li key={phrase.koshur} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p lang="ks" className="font-serif text-lg text-foreground">
                    {phrase.koshur}
                  </p>
                  {phrase.isLoanword && <LoanwordBadge />}
                </div>
                {phrase.note && (
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{phrase.note}</p>
                )}
              </div>
              <p className="text-sm text-muted-foreground sm:max-w-56 sm:text-right">
                {phrase.english}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <Link
          to="/language/numbers"
          className="group block rounded-xl border border-border bg-card p-5 shadow-sm transition-[background-color,border-color,box-shadow] duration-150 hover:border-primary/50 hover:shadow-[var(--surface-shadow)] active:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
        >
          <h2 className="font-serif text-2xl text-foreground transition-colors duration-150 group-hover:text-primary">
            Kashmiri counting: 1 to 50
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Learn Koshur numbers from one to fifty, grouped by tens for easy reading.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Open the counting guide
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 pt-8">
        <div className="border-t border-border pt-5">
          <h2 className="font-serif text-xl text-foreground">Sources</h2>
          <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              Braj B. Kachru, An Introduction to Spoken Kashmiri (University of Illinois, 1973)
            </li>
            <li>Wiktionary: Kashmiri word list</li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
