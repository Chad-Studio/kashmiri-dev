import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { media } from "@/data/media";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/watch-listen")({
  head: () => ({
    ...seo({
      title: "Watch & Listen",
      description:
        "A curated list of educational podcasts, channels, and audio resources about Kashmiri history, culture, and language.",
      ogDescription: "Podcasts, YouTube channels, and audio archives to learn about Kashmir.",
      path: "/watch-listen",
    }),
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
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
          Watch & Listen
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">
          Learn by watching and listening
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          A short, careful list of educational resources about Kashmiri history, culture, and
          language.
        </p>
        <p className="mt-3 text-sm text-muted-foreground italic">
          This list is curated and will grow. Suggest additions coming soon.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <ul className="rounded-xl border border-border bg-card divide-y divide-border">
          {media.map((m) => (
            <li key={m.id} className="px-5 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg text-primary hover:underline"
                >
                  {m.name}
                </a>
                <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">
                  {typeLabel[m.type] ?? m.type}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{m.oneLiner}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/80">Topic:</span> {m.topic}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
