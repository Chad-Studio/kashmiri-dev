import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { scripts, vocabulary, phrases } from "@/data/language";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/language")({
  head: () => ({
    meta: [
      { title: "Kashmiri Language (Koshur) — Kashmiri.dev" },
      {
        name: "description",
        content:
          "Learn about Kashmiri (Koshur): its scripts, common words, and everyday phrases. Made for beginners.",
      },
      { property: "og:title", content: "Kashmiri Language (Koshur) — Kashmiri.dev" },
      {
        property: "og:description",
        content:
          "A gentle intro to the Kashmiri language — scripts, starter vocabulary, and common phrases.",
      },
    ],
  }),
  component: LanguagePage,
});

function LanguagePage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vocabulary;
    return vocabulary.filter(
      (w) =>
        w.koshur.toLowerCase().includes(q) ||
        w.english.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
          Language
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">
          Koshur — the Kashmiri language
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Kashmiri, called <em>Koshur</em> by its speakers, is spoken by around 7
          million people, mostly in the Kashmir valley. It has a rich poetry
          tradition and a long, mixed heritage of Sanskrit, Persian, and Central
          Asian influence. Kashmiri is one of the 22 scheduled languages of India.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="font-serif text-2xl text-foreground mb-4">Scripts</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {scripts.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-lg text-foreground">{s.name}</h3>
                <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">
                  {s.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
          <h2 className="font-serif text-2xl text-foreground">
            Starter vocabulary
          </h2>
          <Input
            type="search"
            placeholder="Search a word..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-xs"
            aria-label="Search vocabulary"
          />
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <ul className="divide-y divide-border">
            {filtered.map((w) => (
              <li
                key={w.koshur}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <span className="font-serif text-lg text-foreground">
                  {w.koshur}
                </span>
                <span className="text-sm text-muted-foreground text-right">
                  {w.english}
                </span>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-6 text-sm text-muted-foreground text-center">
                No word matches your search.
              </li>
            )}
          </ul>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Words are shown in Roman transliteration. Pronunciation may vary by
          region.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="font-serif text-2xl text-foreground mb-4">
          Common phrases
        </h2>
        <ol className="space-y-3">
          {phrases.map((p, i) => (
            <li
              key={p.koshur}
              className="rounded-xl border border-border bg-card p-4 flex items-start gap-4"
            >
              <span className="text-xs font-mono text-primary mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <p className="font-serif text-lg text-foreground">{p.koshur}</p>
                <p className="text-sm text-muted-foreground">{p.english}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </SiteLayout>
  );
}
