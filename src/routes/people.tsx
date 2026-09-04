import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { PageIntro, SectionHeading } from "@/components/PageIntro";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { crafts, people, type Person } from "@/data/people";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People & Crafts of Kashmir | Kashmiri.dev" },
      {
        name: "description",
        content:
          "Notable Kashmiri poets, mystics, and traditional crafts, a shared heritage of the valley told in simple English.",
      },
      { property: "og:title", content: "People & Crafts of Kashmir | Kashmiri.dev" },
      {
        property: "og:description",
        content: "Lal Ded, Nund Rishi, Habba Khatoon, and the crafts that shaped Kashmir.",
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
          description: "Notable Kashmiri poets, mystics, and traditional crafts.",
          inLanguage: "en",
          learningResourceType: "Guide",
          url: "https://kashmiri.dev/people",
        }),
      },
      ...people.map((person) => ({
        type: "application/ld+json" as const,
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: person.name,
          description: `${person.tagline} ${person.bio}`,
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
      <PageIntro
        label="People & Crafts"
        title="Voices and hands of Kashmir"
        description="Meet some of the poets and mystics remembered across Kashmir, and learn about crafts that have long been part of life in the valley."
      />

      <section className="mx-auto max-w-5xl px-4 py-8">
        <SectionHeading title="Poets & mystics" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {people.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() => setActive(person)}
              className="group rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-[background-color,border-color,box-shadow] duration-150 hover:border-primary/60 hover:shadow-[var(--surface-shadow)] active:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6"
            >
              <h3 className="font-serif text-2xl text-foreground transition-colors duration-150 group-hover:text-primary">
                {person.name}
              </h3>
              <p className="tabular-nums mt-1 text-sm font-semibold text-primary">{person.years}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {person.tagline}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read the profile
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <SectionHeading title="Crafts of Kashmir" />
        <div className="mt-5 grid sm:grid-cols-2 sm:gap-x-8">
          {crafts.map((craft) => (
            <article key={craft.id} className="border-t border-border py-5">
              <h3 className="font-serif text-xl text-foreground">{craft.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {craft.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">{active.name}</DialogTitle>
                <DialogDescription className="tabular-nums font-semibold text-primary">
                  {active.years}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 text-sm">
                <p className="leading-relaxed text-foreground">{active.bio}</p>
                <div>
                  <h3 className="mb-1 font-serif text-base text-foreground">Why they matter</h3>
                  <p className="leading-relaxed text-muted-foreground">{active.whyMatters}</p>
                </div>
                <div>
                  <h3 className="mb-1 font-serif text-base text-foreground">Sources</h3>
                  <ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground">
                    {active.sources.map((source) => (
                      <li key={source}>{source}</li>
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
