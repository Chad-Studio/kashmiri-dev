import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { prompts, tools, awareness } from "@/data/ai";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

export const Route = createFileRoute("/learn-ai")({
  head: () => ({
    meta: [
      { title: "Learn with AI — Kashmiri.dev" },
      {
        name: "description",
        content:
          "Ready-to-use AI prompts for study, English, coding, and CVs. Plus free tools and AI safety tips.",
      },
      { property: "og:title", content: "Learn with AI — Kashmiri.dev" },
      {
        property: "og:description",
        content: "Use AI safely to learn faster — prompts, tools, and how to spot fake AI content.",
      },
      { property: "og:url", content: "https://kashmiri.dev/learn-ai" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/learn-ai" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "Learn with AI",
          description: "AI prompts, free tools, and safety tips for learning with AI.",
          inLanguage: "en",
          learningResourceType: "Guide",
          url: "https://kashmiri.dev/learn-ai",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: awareness.map((a) => ({
            "@type": "Question",
            name: a.title,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${a.body} Tips: ${a.tips.join(" ")}`,
            },
          })),
        }),
      },
    ],
  }),
  component: LearnAI,
});

function LearnAI() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
          Learn with AI
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">Use AI as a learning tool</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          AI can help you study, practise writing, or work through a coding problem. Here are a few
          prompts to start with, some useful tools, and advice for checking what AI gives you.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="font-serif text-2xl text-foreground mb-4">Learn anything with AI</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {prompts.map((p) => (
            <PromptCard key={p.id} title={p.title} goal={p.goal} prompt={p.prompt} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="font-serif text-2xl text-foreground mb-4">Free AI tools worth trying</h2>
        <ul className="rounded-xl border border-border bg-card divide-y divide-border">
          {tools.map((t) => (
            <li
              key={t.name}
              className="px-4 py-3 flex flex-wrap items-baseline gap-2 justify-between"
            >
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-lg text-primary hover:underline"
              >
                {t.name}
              </a>
              <span className="text-sm text-muted-foreground flex-1 sm:text-right">{t.goodAt}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Most of these tools offer a free plan. Before sharing personal information, it is worth
          checking the tool&apos;s privacy notice.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="font-serif text-2xl text-foreground mb-4">AI awareness</h2>
        <div className="space-y-5">
          {awareness.map((a) => (
            <article key={a.title} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-serif text-xl text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-foreground/90 space-y-1">
                {a.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function PromptCard({ title, goal, prompt }: { title: string; goal: string; prompt: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col">
      <div
        aria-hidden
        className="h-1 w-8 rounded-full mb-3"
        style={{ background: "linear-gradient(90deg, var(--saffron), var(--chinar))" }}
      />
      <h3 className="font-serif text-xl text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{goal}</p>
      <pre className="mt-3 flex-1 whitespace-pre-wrap text-xs leading-relaxed bg-muted/60 rounded-lg p-3 text-foreground/90 font-mono">
        {prompt}
      </pre>
      <Button onClick={copy} variant="secondary" size="sm" className="mt-3 self-start">
        {copied ? (
          <>
            <Check className="h-4 w-4" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" /> Copy prompt
          </>
        )}
      </Button>
    </div>
  );
}
