import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { PageIntro } from "@/components/PageIntro";
import { SiteLayout } from "@/components/SiteLayout";
import { media } from "@/data/media";

export const Route = createFileRoute("/watch-listen")({
  head: () => ({
    meta: [
      { title: "Watch & Listen | Kashmiri.dev" },
      {
        name: "description",
        content:
          "A curated list of educational podcasts, channels, and audio resources about Kashmiri history, culture, and language.",
      },
      { property: "og:title", content: "Watch & Listen | Kashmiri.dev" },
      {
        property: "og:description",
        content: "Podcasts, YouTube channels, and audio archives to learn about Kashmir.",
      },
      { property: "og:url", content: "https://kashmiri.dev/watch-listen" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/watch-listen" }],
  }),
  component: WatchListenPage,
});

const typeLabel: Record<string, string> = {
  podcast: "Podcast",
  channel: "Channel",
  audio: "Audio",
};

function WatchListenPage() {
  return (
    <SiteLayout>
      <PageIntro
        label="Watch & Listen"
        title="Learn by watching and listening"
        description="A growing selection of podcasts, videos, and audio archives about Kashmiri history, culture, and language."
      >
        <p className="text-sm italic text-muted-foreground">
          We are still adding to this list and plan to open suggestions soon.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <ul className="divide-y divide-border border-y border-border">
          {media.map((item) => (
            <li key={item.id} className="py-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-serif text-xl font-semibold text-primary transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.name}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {typeLabel[item.type] ?? item.type}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.oneLiner}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground/80">Topic:</span> {item.topic}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
