import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";

import { PageIntro, SectionHeading } from "@/components/PageIntro";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { awareness, prompts, tools } from "@/data/ai";

export const Route = createFileRoute("/learn-ai")({
  head: () => ({
    meta: [
      { title: "Learn with AI | Kashmiri.dev" },
      {
        name: "description",
        content:
          "Ready-to-use AI prompts for study, English, coding, and CVs. Plus free tools and AI safety tips.",
      },
      { property: "og:title", content: "Learn with AI | Kashmiri.dev" },
      {
        property: "og:description",
        content:
          "Use AI safely to learn faster, with prompts, tools, and ways to spot fake AI content.",
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
          mainEntity: awareness.map((item) => ({
            "@type": "Question",
            name: item.title,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${item.body} Tips: ${item.tips.join(" ")}`,
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
      <PageIntro
        label="Learn with AI"
        title="Use AI as a learning tool"
        description="AI can help you study, practise writing, or work through a coding problem. Here are a few prompts to start with, some useful tools, and advice for checking what AI gives you."
      />

      <section className="mx-auto max-w-5xl px-4 py-8">
        <SectionHeading title="Learn anything with AI" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              title={prompt.title}
              goal={prompt.goal}
              prompt={prompt.prompt}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <SectionHeading title="Free AI tools worth trying" />
        <ul className="mt-5 divide-y divide-border border-y border-border">
          {tools.map((tool) => (
            <li
              key={tool.name}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-serif text-lg font-semibold text-primary transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {tool.name}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
              <span className="text-sm text-muted-foreground sm:max-w-sm sm:text-right">
                {tool.goodAt}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Most of these tools offer a free plan. Before sharing personal information, it is worth
          checking the tool&apos;s privacy notice.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <SectionHeading title="AI awareness" />
        <div className="mt-5 flex flex-col">
          {awareness.map((item) => (
            <article key={item.title} className="border-t border-border py-6">
              <h3 className="font-serif text-xl text-foreground sm:text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.body}
              </p>
              <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed text-foreground/90 sm:text-base">
                {item.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
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
      setCopied(false);
    }
  };

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h3 className="font-serif text-2xl text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{goal}</p>
      <pre className="mt-4 flex-1 whitespace-pre-wrap break-words rounded-lg bg-muted p-4 font-mono text-sm leading-relaxed text-foreground/90">
        {prompt}
      </pre>
      <Button
        onClick={copy}
        variant="secondary"
        size="sm"
        className="mt-4 self-start"
        aria-live="polite"
      >
        {copied ? (
          <>
            <Check data-icon="inline-start" aria-hidden="true" />
            Copied
          </>
        ) : (
          <>
            <Copy data-icon="inline-start" aria-hidden="true" />
            Copy prompt
          </>
        )}
      </Button>
    </article>
  );
}
