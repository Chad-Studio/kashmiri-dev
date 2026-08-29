import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Accent } from "@/components/Accent";
import { civicExplainers } from "@/data/civic";
import { seo, absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/civic-guide")({
  head: () => ({
    ...seo({
      title: "Civic Guide",
      description:
        "Plain-language guides to RTI, consumer rights, cybercrime reporting, and spotting fake news. Educational, not legal advice.",
      ogDescription: "Simple explainers of long-standing civic rights and services in India.",
      path: "/civic-guide",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "Civic Guide",
          description: "Plain-language guides to civic rights and services in India.",
          inLanguage: "en",
          learningResourceType: "Guide",
          url: absoluteUrl("/civic-guide"),
        }),
      },
    ],
  }),
  component: CivicGuidePage,
});

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function CivicGuidePage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">Civic Guide</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">Know your rights, simply</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          This page explains general rights and services in simple English. It is educational
          information, not legal advice.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 space-y-6">
        {civicExplainers.map((e) => (
          <article key={e.id} className="rounded-xl border border-border bg-card p-6">
            <Accent className="w-10" />
            <h2 className="font-serif text-2xl text-foreground">{e.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.summary}</p>

            <ol className="mt-4 list-decimal pl-5 text-sm text-foreground/90 space-y-1.5">
              {e.steps.map((s) => (
                <li key={s} className="leading-relaxed">
                  {s}
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h3 className="font-serif text-base text-foreground mb-1">Sources</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-0.5">
                {e.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground border-t border-border pt-3">
              <span>
                <span className="font-medium text-foreground/80">Published:</span>{" "}
                {formatDate(e.publishedDate)}
              </span>
              <span>
                <span className="font-medium text-foreground/80">Last reviewed:</span>{" "}
                {formatDate(e.lastReviewedDate)}
              </span>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
