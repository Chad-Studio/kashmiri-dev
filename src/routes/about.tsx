import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Methodology — Kashmiri.dev" },
      {
        name: "description",
        content:
          "How Kashmiri.dev is written, how we source content, and how to send corrections. Education only.",
      },
      { property: "og:title", content: "About & Methodology — Kashmiri.dev" },
      {
        property: "og:description",
        content:
          "A free, education-only site about Kashmir. How we write, our sources, and how to reach us.",
      },
      { property: "og:url", content: "https://kashmiri.dev/about" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">About</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">About Kashmiri.dev</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Kashmiri.dev is a free, education-only website about Kashmir — its history, language,
          people, and practical learning. It is made for Kashmiri readers, especially in the valley.
          There is no politics, no news, no ads, and no tracking.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <article className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-2xl text-foreground">How we write</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Content is written in simple English so it is easy for young readers and for people
            learning English. Drafts are created with the help of AI and then reviewed by a human
            before publishing. Our language content is being checked by native Kashmiri speakers.
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-2xl text-foreground">Our sources</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            We try to cite at least two sources for any factual or historical content. Our history
            section covers ancient times up to 1947 only. Civic information on this site is general
            education, not legal advice.
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-2xl text-foreground">Corrections & suggestions</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            We want to get things right. If you spot a mistake or would like to suggest an addition,
            please email us at{" "}
            <a
              href="mailto:hello@kashmiri.dev"
              className="text-primary hover:underline font-medium"
            >
              hello@kashmiri.dev
            </a>
            .
          </p>
        </article>

        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">Last reviewed:</span> 21 July 2026
        </p>
      </section>
    </SiteLayout>
  );
}
