import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { people, crafts, type Person } from "@/data/people";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People & Crafts of Kashmir — Kashmiri.dev" },
      {
        name: "description",
        content:
          "Notable Kashmiri poets, mystics, and traditional crafts — shared heritage of the valley, told in simple English.",
      },
      { property: "og:title", content: "People & Crafts of Kashmir — Kashmiri.dev" },
      {
        property: "og:description",
        content:
          "Lal Ded, Nund Rishi, Habba Khatoon, and the crafts that shaped Kashmir.",
      },
      { property: "og:url", content: "https://kashmiri.dev/people" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/people" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "People & Crafts of Kashmir",
          description:
            "Notable Kashmiri poets, mystics, and traditional crafts.",
          inLanguage: "en",
          learningResourceType: "Guide",
          url: "https://kashmiri.dev/people",
        }),
      },
      ...people.map((p) => ({
        type: "application/ld+json" as const,
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: p.name,
          description: `${p.tagline} ${p.bio}`,
        }),
      })),
    ],
  }),
  component: PeoplePage,
});

function PeoplePage() {
  const [active, setActive] = useState<Person | null>(null);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
          People & Crafts
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">
          Voices and hands of Kashmir
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Poets, mystics, and craftspeople who shaped the shared heritage of the
          valley — honoured across communities.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="font-serif text-2xl text-foreground mb-4">Poets & mystics</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {people.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className="text-left rounded-xl border border-border bg-card p-5 hover:border-primary/60 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div
                aria-hidden
                className="h-1 w-8 rounded-full mb-3"
                style={{ background: "linear-gradient(90deg, var(--saffron), var(--chinar))" }}
              />
              <h3 className="font-serif text-xl text-foreground">{p.name}</h3>
              <p className="text-xs font-medium text-primary mt-0.5">{p.years}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {p.tagline}
              </p>
              <span className="mt-3 inline-block text-xs font-medium text-primary">
                Read more →
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="font-serif text-2xl text-foreground mb-4">Crafts of Kashmir</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {crafts.map((c) => (
            <article
              key={c.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div
                aria-hidden
                className="h-1 w-8 rounded-full mb-3"
                style={{ background: "linear-gradient(90deg, var(--saffron), var(--chinar))" }}
              />
              <h3 className="font-serif text-xl text-foreground">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {c.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">{active.name}</DialogTitle>
                <DialogDescription className="text-primary font-medium">
                  {active.years}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <p className="text-foreground leading-relaxed">{active.bio}</p>
                <div>
                  <h4 className="font-serif text-base text-foreground mb-1">
                    Why they matter
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {active.whyMatters}
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-base text-foreground mb-1">Sources</h4>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-0.5">
                    {active.sources.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
