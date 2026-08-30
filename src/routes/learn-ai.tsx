import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Copy,
  ExternalLink,
  GraduationCap,
  House,
  Lightbulb,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  coreLessons,
  courseSources,
  learningTracks,
  prompts,
  tools,
  type LearningTrack,
} from "@/data/ai";

const PROGRESS_KEY = "kashmiri-dev-ai-basics-progress";
const courseMinutes = coreLessons.reduce((total, lesson) => total + lesson.minutes, 0);

export const Route = createFileRoute("/learn-ai")({
  head: () => ({
    meta: [
      { title: "Learn AI from zero — Kashmiri.dev" },
      {
        name: "description",
        content:
          "A free beginner AI course for Kashmiris: understand AI, use it safely, check its answers, protect your privacy, and choose a practical learning path.",
      },
      { property: "og:title", content: "Learn AI from zero — Kashmiri.dev" },
      {
        property: "og:description",
        content:
          "Six short AI literacy lessons, practical exercises, safer prompts, and optional student and builder paths.",
      },
      { property: "og:url", content: "https://kashmiri.dev/learn-ai" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/learn-ai" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "AI basics for everyone",
          description:
            "A free beginner course about understanding, using, and checking artificial intelligence safely.",
          url: "https://kashmiri.dev/learn-ai",
          inLanguage: "en",
          educationalLevel: "Beginner",
          timeRequired: `PT${courseMinutes}M`,
          isAccessibleForFree: true,
          provider: {
            "@type": "EducationalOrganization",
            name: "Kashmiri.dev",
            url: "https://kashmiri.dev",
          },
          hasPart: coreLessons.map((lesson) => ({
            "@type": "LearningResource",
            position: lesson.number,
            name: lesson.title,
            timeRequired: `PT${lesson.minutes}M`,
            description: lesson.summary,
          })),
        }),
      },
    ],
  }),
  component: LearnAI,
});

function LearnAI() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [openLesson, setOpenLesson] = useState(coreLessons[0]?.id ?? "");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "[]");
      if (Array.isArray(saved)) {
        const lessonIds = new Set(coreLessons.map((lesson) => lesson.id));
        setCompleted(
          saved.filter((id): id is string => typeof id === "string" && lessonIds.has(id)),
        );
      }
    } catch {
      localStorage.removeItem(PROGRESS_KEY);
    }
  }, []);

  const progress = useMemo(
    () => Math.round((completed.length / coreLessons.length) * 100),
    [completed.length],
  );

  const toggleLesson = (lessonId: string) => {
    setCompleted((current) => {
      const isComplete = current.includes(lessonId);
      const next = isComplete ? current.filter((id) => id !== lessonId) : [...current, lessonId];
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));

      if (!isComplete) {
        const currentIndex = coreLessons.findIndex((lesson) => lesson.id === lessonId);
        const nextLesson = coreLessons[currentIndex + 1];
        if (nextLesson) setOpenLesson(nextLesson.id);
      }

      return next;
    });
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
              Learn AI
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              Understand AI before you depend on it
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Start with six short lessons made for complete beginners. Learn what AI can do, where
              it fails, how to check it, and how to use it without giving away your privacy or your
              judgement.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/80">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" /> About {courseMinutes}
                minutes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Circle className="h-4 w-4 text-primary" aria-hidden="true" /> No technical
                background
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" /> Free, with no
                sign-up
              </span>
            </div>
            <Button asChild size="lg" className="mt-7">
              <a href="#start">
                Start with lesson 1 <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              You will leave knowing how to
            </p>
            <ul className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/90">
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                Choose when to use AI — and when search, a calculator, or a person is better.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                Give clear instructions and check facts, sources, and quotations yourself.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                Protect private information and recognise unsafe or misleading uses.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="start" className="scroll-mt-20 border-y border-border/70 bg-card/35">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">Start here</p>
              <h2 className="mt-1 font-serif text-3xl text-foreground">AI basics for everyone</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Read one lesson, do its small task, answer the check question, then mark it
                complete.
              </p>
            </div>
            <div className="w-full rounded-xl border border-border bg-background/80 p-4 sm:w-64">
              <div className="flex items-center justify-between text-xs font-medium">
                <span>
                  {completed.length} of {coreLessons.length} lessons
                </span>
                <span>{progress}%</span>
              </div>
              <Progress
                value={progress}
                className="mt-2"
                aria-label={`${completed.length} of ${coreLessons.length} AI basics lessons complete`}
              />
              <p className="mt-2 text-[11px] text-muted-foreground">
                Progress is stored only in this browser.
              </p>
            </div>
          </div>

          {progress === 100 && (
            <div className="mt-6 rounded-xl border border-primary/35 bg-primary/10 px-4 py-3 text-sm text-foreground">
              <span className="font-semibold">Basics complete.</span> Choose a practical path below
              and use the prompt lab to practise what you learned.
            </div>
          )}

          <Accordion
            type="single"
            collapsible
            value={openLesson}
            onValueChange={setOpenLesson}
            className="mt-6 overflow-hidden rounded-2xl border border-border bg-card px-5 sm:px-6"
          >
            {coreLessons.map((lesson) => {
              const isComplete = completed.includes(lesson.id);

              return (
                <AccordionItem key={lesson.id} value={lesson.id} className="last:border-b-0">
                  <AccordionTrigger className="gap-3 py-5 hover:no-underline">
                    <span className="flex min-w-0 flex-1 items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                          isComplete
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                        aria-hidden="true"
                      >
                        {isComplete ? <Check className="h-4 w-4" /> : lesson.number}
                      </span>
                      <span className="min-w-0 text-left">
                        <span className="block font-serif text-lg leading-snug text-foreground">
                          {lesson.title}
                        </span>
                        <span className="mt-1 block text-xs font-normal text-muted-foreground">
                          {lesson.minutes} minutes
                        </span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-0 sm:pl-10">
                    <p className="max-w-3xl text-base leading-relaxed text-foreground/90">
                      {lesson.summary}
                    </p>

                    <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      Key ideas
                    </h3>
                    <ul className="mt-3 max-w-3xl space-y-2 text-sm leading-relaxed text-foreground/85">
                      {lesson.keyIdeas.map((idea) => (
                        <li key={idea} className="flex gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl bg-muted/60 p-4">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                          <Lightbulb className="h-4 w-4" aria-hidden="true" /> Example
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                          {lesson.example}
                        </p>
                      </div>
                      <div className="rounded-xl border border-saffron/35 bg-saffron/10 p-4">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/75">
                          <BookOpenCheck className="h-4 w-4 text-primary" aria-hidden="true" /> Try
                          it
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                          {lesson.practice}
                        </p>
                      </div>
                    </div>

                    <details className="group mt-4 rounded-xl border border-border px-4 py-3">
                      <summary className="cursor-pointer text-sm font-semibold text-foreground marker:text-primary">
                        Check yourself: {lesson.check.question}
                      </summary>
                      <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">
                        {lesson.check.answer}
                      </p>
                    </details>

                    <Button
                      type="button"
                      variant={isComplete ? "secondary" : "default"}
                      size="sm"
                      className="mt-5"
                      onClick={() => toggleLesson(lesson.id)}
                    >
                      {isComplete ? (
                        <>
                          <Check aria-hidden="true" /> Completed — undo
                        </>
                      ) : (
                        <>
                          <CheckCircle2 aria-hidden="true" /> Mark complete
                        </>
                      )}
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <p className="text-sm font-semibold text-primary">After the basics</p>
        <h2 className="mt-1 font-serif text-3xl text-foreground">
          Choose what you want AI to help you do
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Everyone starts with the same safety and verification skills. Then choose one path. The
          detailed path lessons will be added in stages; this is the curriculum they will follow.
        </p>

        <Tabs defaultValue="everyday" className="mt-7">
          <TabsList className="grid h-auto w-full grid-cols-1 gap-1 sm:grid-cols-3">
            {learningTracks.map((track) => (
              <TabsTrigger key={track.id} value={track.id} className="whitespace-normal py-2.5">
                {track.id === "everyday" && <House className="mr-2 h-4 w-4" aria-hidden="true" />}
                {track.id === "student" && (
                  <GraduationCap className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                {track.id === "builder" && <Wrench className="mr-2 h-4 w-4" aria-hidden="true" />}
                {track.id === "everyday"
                  ? "Everyday"
                  : track.id === "student"
                    ? "Study & work"
                    : "Build"}
              </TabsTrigger>
            ))}
          </TabsList>
          {learningTracks.map((track) => (
            <TrackPanel key={track.id} track={track} />
          ))}
        </Tabs>
      </section>

      <section className="border-y border-border/70 bg-card/35">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <p className="text-sm font-semibold text-primary">Practice lab</p>
          <h2 className="mt-1 font-serif text-3xl text-foreground">
            Prompts that make you participate
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            These prompts ask AI to question, correct, and guide you. Replace the words in square
            brackets and keep control of the work yourself.
          </p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                title={prompt.title}
                goal={prompt.goal}
                prompt={prompt.prompt}
                warning={prompt.warning}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-sm font-semibold text-primary">Toolbox</p>
        <h2 className="mt-1 font-serif text-3xl text-foreground">Pick by task, not by hype</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          No tool is best at everything. Free plans, features, and availability change, so check the
          provider before relying on one for important work.
        </p>
        <ul className="mt-7 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {tools.map((tool) => (
            <li key={tool.name} className="grid gap-2 px-5 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-serif text-lg text-primary hover:underline"
              >
                {tool.name} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <div>
                <p className="text-sm text-foreground/90">{tool.goodAt}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Remember: {tool.remember}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border/70 bg-card/35">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <p className="text-sm font-semibold text-primary">Read further</p>
          <h2 className="mt-1 font-serif text-2xl text-foreground">Sources behind this course</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The lessons are grounded in public guidance from education, standards, and consumer
            protection organisations. These are starting points, not endorsements of any AI tool.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {courseSources.map((source) => (
              <li key={source.url} className="rounded-xl border border-border bg-background/80 p-4">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1.5 font-semibold text-foreground hover:text-primary hover:underline"
                >
                  <span>{source.title}</span>
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
                <p className="mt-1 text-xs font-medium text-primary">{source.publisher}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{source.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}

function TrackPanel({ track }: { track: LearningTrack }) {
  return (
    <TabsContent value={track.id} className="mt-4">
      <article className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {track.eyebrow}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-foreground">{track.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {track.description}
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
              Five modules
            </p>
            <ol className="mt-3 space-y-3">
              {track.modules.map((module, index) => (
                <li key={module} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{module}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl bg-muted/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Outcome
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{track.outcome}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Final project
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{track.project}</p>
          </div>
        </div>
      </article>
    </TabsContent>
  );
}

function PromptCard({
  title,
  goal,
  prompt,
  warning,
}: {
  title: string;
  goal: string;
  prompt: string;
  warning?: string;
}) {
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
    <article className="flex flex-col rounded-2xl border border-border bg-card p-5">
      <div
        aria-hidden="true"
        className="mb-3 h-1 w-8 rounded-full"
        style={{ background: "linear-gradient(90deg, var(--saffron), var(--chinar))" }}
      />
      <h3 className="font-serif text-xl text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{goal}</p>
      <pre className="mt-4 flex-1 whitespace-pre-wrap rounded-xl bg-muted/60 p-4 font-mono text-xs leading-relaxed text-foreground/90">
        {prompt}
      </pre>
      {warning && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{warning}</p>}
      <Button onClick={copy} variant="secondary" size="sm" className="mt-4 self-start">
        {copied ? (
          <>
            <Check aria-hidden="true" /> Copied
          </>
        ) : (
          <>
            <Copy aria-hidden="true" /> Copy prompt
          </>
        )}
      </Button>
    </article>
  );
}
