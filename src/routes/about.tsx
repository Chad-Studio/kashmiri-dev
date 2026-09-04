import { createFileRoute } from "@tanstack/react-router";

import { PageIntro } from "@/components/PageIntro";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Methodology | Kashmiri.dev" },
      {
        name: "description",
        content:
          "How Kashmiri.dev is written, where the information comes from, and how to send a correction.",
      },
      { property: "og:title", content: "About & Methodology | Kashmiri.dev" },
      {
        property: "og:description",
        content:
          "About Kashmiri.dev, our editorial approach, the sources we use, and how to get in touch.",
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
      <PageIntro
        label="About"
        title="About Kashmiri.dev"
        description="Kashmiri.dev is a free educational website about Kashmir, including its history, language, people, and practical learning. It is made for Kashmiri readers, especially in the valley. The site focuses on learning rather than daily news or political commentary, and it does not use ads or tracking."
      />

      <section className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex flex-col">
          <article className="border-t border-border py-6">
            <h2 className="font-serif text-2xl text-foreground">How we write</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Content is written in simple English so it is easy for young readers and for people
              learning English. Drafts are created with the help of AI and then reviewed by a human
              before publishing. Our language content is being checked by native Kashmiri speakers.
            </p>
          </article>

          <article className="border-t border-border py-6">
            <h2 className="font-serif text-2xl text-foreground">Our sources</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We try to cite at least two sources for any factual or historical content. Our history
              section covers ancient times up to 1947 only. Civic information on this site is
              general education, not legal advice.
            </p>
          </article>

          <article className="border-y border-border py-6">
            <h2 className="font-serif text-2xl text-foreground">Corrections & suggestions</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We want to get things right. If you spot a mistake or would like to suggest an
              addition, please email us at{" "}
              <a
                href="mailto:hello@kashmiri.dev"
                className="rounded-sm font-semibold text-primary underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                hello@kashmiri.dev
              </a>
              .
            </p>
          </article>
        </div>

        <p className="tabular-nums mt-5 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground/80">Last reviewed:</span> 21 July 2026
        </p>
      </section>
    </SiteLayout>
  );
}
