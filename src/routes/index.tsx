import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Accent } from "@/components/Accent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kashmiri.dev — Learn Kashmir's history, language, and AI" },
      {
        name: "description",
        content:
          "A simple, calm place to learn about Kashmir: its history, the Kashmiri language, and how to learn with AI. Made for readers in the valley.",
      },
      { property: "og:title", content: "Kashmiri.dev — Learn Kashmir's history, language, and AI" },
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

const cards = [
  {
    to: "/history" as const,
    title: "History",
    desc: "A short, honest walk through Kashmir's past — from ancient times to 1947.",
  },
  {
    to: "/language" as const,
    title: "Language (Koshur)",
    desc: "Learn about scripts, everyday words, and simple phrases in Kashmiri.",
  },
  {
    to: "/learn-ai" as const,
    title: "Learn with AI",
    desc: "Prompts, free tools, and how to stay safe from fake AI content.",
  },
];

function Home() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
          Kashmiri.dev
        </p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight text-foreground">
          Learn about Kashmir —{" "}
          <span className="text-primary">its past, its words, its future.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          A calm, ad-free place made for Kashmiri readers. Simple English. No accounts. Just
          learning.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <Accent className="mb-4 h-1.5 w-10" />
              <h2 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              <span className="mt-4 inline-block text-sm font-medium text-primary">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 text-center text-sm text-muted-foreground">
        <p>
          Kashmiri.dev is for <strong className="text-foreground">education only</strong>. No
          politics. No news. Only learning.
        </p>
      </section>
    </SiteLayout>
  );
}
