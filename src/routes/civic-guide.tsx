import { createFileRoute } from "@tanstack/react-router";

import { PageIntro } from "@/components/PageIntro";
import { SiteLayout } from "@/components/SiteLayout";
import { civicExplainers } from "@/data/civic";

export const Route = createFileRoute("/civic-guide")({
  head: () => ({
    meta: [
      { title: "Civic Guide | Kashmiri.dev" },
      {
        name: "description",
        content:
          "Plain-language guides to RTI, consumer rights, cybercrime reporting, and spotting fake news. Educational, not legal advice.",
      },
      { property: "og:title", content: "Civic Guide | Kashmiri.dev" },
      {
        property: "og:description",
        content: "Simple explainers of long-standing civic rights and services in India.",
      },
      { property: "og:url", content: "https://kashmiri.dev/civic-guide" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/civic-guide" }],
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
          url: "https://kashmiri.dev/civic-guide",
        }),
      },
    ],
  }),
  component: CivicGuidePage,
});

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function CivicGuidePage() {
  return (
    <SiteLayout>
      <PageIntro
        label="Civic Guide"
        title="A practical guide to everyday rights"
        description="Plain-language information about a few rights and public services you may need in everyday life. It is a general guide, not legal advice."
      />

      <section className="mx-auto flex max-w-3xl flex-col px-4 pb-16">
        {civicExplainers.map((explainer) => (
          <article key={explainer.id} className="border-t border-border py-8 first:pt-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">{explainer.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {explainer.summary}
            </p>

            <ol className="mt-5 flex list-decimal flex-col gap-2 pl-5 text-sm text-foreground/90 sm:text-base">
              {explainer.steps.map((step) => (
                <li key={step} className="leading-relaxed marker:font-semibold marker:text-primary">
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-6">
              <h3 className="font-serif text-lg text-foreground">Sources</h3>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                {explainer.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </div>

            <dl className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
              <div className="flex gap-1.5">
                <dt className="font-semibold text-foreground/80">Published:</dt>
                <dd className="tabular-nums">{formatDate(explainer.publishedDate)}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="font-semibold text-foreground/80">Last reviewed:</dt>
                <dd className="tabular-nums">{formatDate(explainer.lastReviewedDate)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
