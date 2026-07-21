import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { timeline, type TimelineEntry } from "@/data/history";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History of Kashmir — Kashmiri.dev" },
      {
        name: "description",
        content:
          "A simple timeline of Kashmir's history from ancient times to 1947, with sources for every entry.",
      },
      { property: "og:title", content: "History of Kashmir — Kashmiri.dev" },
      {
        property: "og:description",
        content:
          "From the Nilamata Purana to Dogra rule — a clear timeline of Kashmir's past.",
      },
      { property: "og:url", content: "https://kashmiri.dev/history" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/history" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "History of Kashmir",
          description:
            "A simple timeline of Kashmir's history from ancient times to 1947, with sources for every entry.",
          inLanguage: "en",
          learningResourceType: "Timeline",
          url: "https://kashmiri.dev/history",
        }),
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [active, setActive] = useState<TimelineEntry | null>(null);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
          History
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">
          A short history of Kashmir
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          From the old story of a drained lake to the end of Dogra rule in 1947 — a
          calm walk through the eras of Kashmir. Tap any entry to read more.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <ol className="relative border-s-2 border-primary/30 ms-4 space-y-8">
          {timeline.map((entry) => (
            <li key={entry.id} className="ps-6 relative">
              <span
                aria-hidden
                className="absolute -start-[9px] top-2 h-4 w-4 rounded-full border-2 border-background"
                style={{
                  background:
                    "linear-gradient(135deg, var(--saffron), var(--chinar))",
                }}
              />
              <button
                type="button"
                onClick={() => setActive(entry)}
                className="w-full text-left rounded-xl border border-border bg-card p-5 hover:border-primary/60 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-serif text-xl text-foreground">
                    {entry.era}
                  </h2>
                  <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">
                    {entry.years}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {entry.fact}
                </p>
                <span className="mt-3 inline-block text-xs font-medium text-primary">
                  Read more →
                </span>
              </button>
            </li>
          ))}
          <li className="ps-6 relative">
            <span
              aria-hidden
              className="absolute -start-[9px] top-2 h-4 w-4 rounded-full border-2 border-background bg-muted-foreground/40"
            />
            <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5">
              <h2 className="font-serif text-lg text-foreground">
                Modern history (after 1947)
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Modern Kashmir history is beyond the scope of this site for now. We
                focus on education, not politics or news.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {active.era}
                </DialogTitle>
                <DialogDescription className="text-primary font-medium">
                  {active.years}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <p className="text-foreground leading-relaxed">
                  {active.description}
                </p>
                {active.people.length > 0 && (
                  <div>
                    <h3 className="font-serif text-base text-foreground mb-1">
                      Notable people
                    </h3>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-0.5">
                      {active.people.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <h3 className="font-serif text-base text-foreground mb-1">
                    Sources
                  </h3>
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
