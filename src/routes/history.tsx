import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  evidenceLabels,
  historyMyths,
  timeline,
  type EvidenceStatus,
  type TimelineEntry,
} from "@/data/history";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History of Kashmir: Evidence & Traditions — Kashmiri.dev" },
      {
        name: "description",
        content:
          "An evidence-aware timeline of Kashmir's history, separating archaeology, scholarly debate, and tradition, with common myths checked.",
      },
      { property: "og:title", content: "History of Kashmir: Evidence & Traditions — Kashmiri.dev" },
      {
        property: "og:description",
        content:
          "Explore Kashmir's past through archaeology, texts, traditions, and carefully sourced corrections.",
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
          name: "History of Kashmir: Evidence and Traditions",
          description:
            "A sourced timeline distinguishing established evidence, scholarly debate, and tradition.",
          inLanguage: "en",
          learningResourceType: "Timeline",
          url: "https://kashmiri.dev/history",
        }),
      },
    ],
  }),
  component: HistoryPage,
});

const statusStyles: Record<EvidenceStatus, string> = {
  established: "border-primary/30 bg-primary/10 text-primary",
  debated: "border-border bg-muted text-foreground",
  tradition: "border-border bg-card text-muted-foreground",
};

function EvidenceBadge({ status }: { status: EvidenceStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[status]}`}
    >
      {evidenceLabels[status]}
    </span>
  );
}

function HistoryPage() {
  const [active, setActive] = useState<TimelineEntry | null>(null);

  return (
    <SiteLayout>
      <main>
        <section className="mx-auto max-w-3xl px-4 pt-12 pb-8">
          <p className="font-semibold text-sm uppercase tracking-[0.2em] text-primary">History</p>
          <h1 className="mt-3 text-balance font-serif text-4xl text-foreground">
            Kashmir&apos;s past, with the evidence in view
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            This timeline follows the valley from its earliest settlements to 1947. Labels show
            where an account rests on archaeology, where scholars disagree, and where it comes from
            inherited tradition.
          </p>
        </section>

        <section aria-labelledby="evidence-key" className="mx-auto max-w-3xl px-4 pb-8">
          <div className="rounded-xl border border-border bg-muted/40 p-5">
            <h2 id="evidence-key" className="font-serif text-xl text-foreground">
              How to read the evidence
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Archaeology can test dates, settlements, and objects. Literary works preserve memory,
              belief, and argument, but are not simple transcripts of events. The Nilamata Purana
              and the Rajatarangini are essential sources whose genre and date must remain visible.
            </p>
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Evidence status key">
              {(["established", "debated", "tradition"] as const).map((status) => (
                <EvidenceBadge key={status} status={status} />
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Historical timeline" className="mx-auto max-w-3xl px-4 pb-16">
          <ol className="relative ms-4 flex flex-col gap-8 border-s-2 border-primary/30">
            {timeline.map((entry) => (
              <li key={entry.id} className="relative ps-6">
                <span
                  aria-hidden
                  className="absolute -start-[9px] top-2 h-4 w-4 rounded-full border-2 border-background bg-primary"
                />
                <button
                  type="button"
                  onClick={() => setActive(entry)}
                  className="w-full rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/60 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="font-serif text-xl text-foreground">{entry.era}</h2>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {entry.years}
                    </span>
                  </div>
                  {entry.status && (
                    <div className="mt-3">
                      <EvidenceBadge status={entry.status} />
                    </div>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.fact}</p>
                  <span className="mt-3 inline-block text-xs font-medium text-primary">
                    Read more →
                  </span>
                </button>
              </li>
            ))}
            <li className="relative ps-6">
              <span
                aria-hidden
                className="absolute -start-[9px] top-2 h-4 w-4 rounded-full border-2 border-background bg-muted-foreground/40"
              />
              <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5">
                <h2 className="font-serif text-lg text-foreground">Modern history (after 1947)</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  This timeline currently ends in 1947. We hope to cover later history in a future
                  update.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section aria-labelledby="myths-heading" className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <p className="font-semibold text-sm uppercase tracking-[0.2em] text-primary">
              Fact check
            </p>
            <h2
              id="myths-heading"
              className="mt-3 text-balance font-serif text-3xl text-foreground"
            >
              Common myths, checked
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Some familiar stories come from tradition rather than firm historical evidence. Here
              is what the available research can—and cannot—tell us about them.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {historyMyths.map((item) => (
                <article key={item.myth} className="rounded-xl border border-border bg-card p-5">
                  <EvidenceBadge status={item.status} />
                  <h3 className="mt-4 font-serif text-lg text-foreground">Myth: {item.myth}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">What the evidence says: </span>
                    {item.correction}
                  </p>
                  <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Source: </span>
                    {item.source}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  {active.status && <EvidenceBadge status={active.status} />}
                  <DialogDescription className="font-medium text-primary">
                    {active.years}
                  </DialogDescription>
                </div>
                <DialogTitle className="font-serif text-2xl">{active.era}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 text-sm">
                <p className="font-medium leading-relaxed text-foreground">{active.summary}</p>
                <div className="flex flex-col gap-3">
                  {active.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed text-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {active.developments.length > 0 && (
                  <div>
                    <h3 className="mb-1 font-serif text-base text-foreground">In this age</h3>
                    <ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground">
                      {active.developments.map((development) => (
                        <li key={development}>{development}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {active.spotlight && (
                  <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
                    <h3 className="mb-1 font-serif text-base text-foreground">
                      {active.spotlight.title}
                    </h3>
                    <p className="leading-relaxed text-foreground/90">{active.spotlight.body}</p>
                  </div>
                )}
                {active.people.length > 0 && (
                  <div>
                    <h3 className="mb-1 font-serif text-base text-foreground">Notable people</h3>
                    <ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground">
                      {active.people.map((person) => (
                        <li key={person.name}>
                          <span className="font-medium text-foreground">{person.name}</span>
                          {" — "}
                          {person.note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <h3 className="mb-1 font-serif text-base text-foreground">Sources</h3>
                  <ul className="flex list-disc flex-col gap-1 break-words pl-5 text-muted-foreground">
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
