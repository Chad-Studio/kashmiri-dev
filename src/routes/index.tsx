import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { brandMarkUrl, SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kashmiri.dev | Learn Kashmir's history, language, and AI" },
      {
        name: "description",
        content:
          "A simple, calm place to learn about Kashmir: its history, the Kashmiri language, and how to learn with AI. Made for readers in the valley.",
      },
      { property: "og:title", content: "Kashmiri.dev | Learn Kashmir's history, language, and AI" },
      {
        property: "og:description",
        content:
          "A simple, calm place to learn about Kashmir: its history, the Kashmiri language, and how to learn with AI. Made for readers in the valley.",
      },
      { property: "og:url", content: "https://kashmiri.dev/" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/" }],
  }),
  component: Home,
});

const primaryPaths = [
  {
    to: "/history" as const,
    title: "History",
    desc: "Follow Kashmir's past from its earliest settlements to 1947, with evidence and inherited tradition clearly marked.",
  },
  {
    to: "/language" as const,
    title: "Language (Koshur)",
    desc: "Begin with scripts, everyday words, simple phrases, and Kashmiri counting.",
  },
  {
    to: "/learn-ai" as const,
    title: "Learn with AI",
    desc: "Use practical prompts and free tools while learning how to check AI-generated information.",
  },
];

const secondaryPaths = [
  {
    to: "/people" as const,
    title: "People",
    desc: "Poets, mystics, and crafts of the valley.",
  },
  {
    to: "/civic-guide" as const,
    title: "Civic Guide",
    desc: "Plain-language guides to everyday rights and services.",
  },
  {
    to: "/watch-listen" as const,
    title: "Watch & Listen",
    desc: "A growing list of educational audio and video resources.",
  },
];

function Home() {
  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-10 sm:grid-cols-[minmax(0,1fr)_13rem] sm:items-center md:gap-12 md:pb-14 md:pt-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <p className="text-sm font-semibold text-primary">A digital reading room for Kashmir</p>
          <h1 className="text-balance font-serif text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">
            Learn about Kashmir: its history, language, and people.
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Clear English, carefully marked sources, and practical learning resources. Free to read,
            with no ads or sign-up.
          </p>
          <Button asChild size="lg">
            <Link to="/history">
              Start with history
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <aside className="flex items-center gap-5 border-s-2 border-primary/45 ps-5 sm:flex-col sm:items-start sm:gap-4 sm:ps-7">
          <img
            src={brandMarkUrl}
            alt=""
            aria-hidden="true"
            className="size-24 shrink-0 object-contain sm:size-36 lg:size-48"
          />
          <div className="flex flex-col gap-1 text-sm leading-relaxed text-muted-foreground">
            <p className="font-semibold text-foreground">A learning index</p>
            <p>History and evidence</p>
            <p>Koshur language</p>
            <p>Practical guides</p>
          </div>
        </aside>
      </section>

      <section aria-labelledby="learning-index" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="learning-index" className="font-serif text-3xl text-foreground sm:text-4xl">
            Choose a place to begin
          </h2>
          <p className="text-sm text-muted-foreground">Six paths, built for unhurried reading.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-12">
          {primaryPaths.map((path, index) => (
            <Link
              key={path.to}
              to={path.to}
              className={cn(
                "group flex min-h-52 flex-col justify-between gap-8 border-b border-border p-6 transition-[background-color,color] duration-150 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:p-7",
                index === 0
                  ? "bg-card shadow-[var(--surface-shadow)] sm:col-span-2 lg:col-span-6 lg:border-s-2 lg:border-s-primary"
                  : "sm:col-span-1 lg:col-span-3 lg:border-s",
              )}
            >
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-2xl text-foreground transition-colors duration-150 group-hover:text-primary sm:text-3xl">
                  {path.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {path.desc}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Open guide
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="grid border-b border-border sm:grid-cols-3">
          {secondaryPaths.map((path) => (
            <Link
              key={path.to}
              to={path.to}
              className="group flex min-h-32 flex-col justify-between gap-5 border-t border-border px-1 py-5 transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:border-s sm:px-5"
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-xl text-foreground transition-colors duration-150 group-hover:text-primary">
                  {path.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{path.desc}</p>
              </div>
              <ArrowRight className="size-4 text-primary" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <aside className="mx-auto max-w-5xl px-4 pb-4">
        <p className="max-w-2xl border-s-2 border-border ps-5 text-sm leading-relaxed text-muted-foreground">
          Kashmiri.dev focuses on history, language, people, and useful learning resources rather
          than daily news or political commentary.
        </p>
      </aside>
    </SiteLayout>
  );
}
