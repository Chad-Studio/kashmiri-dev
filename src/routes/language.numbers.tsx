import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { PageIntro } from "@/components/PageIntro";
import { SiteLayout } from "@/components/SiteLayout";
import { numbers } from "@/data/numbers";

export const Route = createFileRoute("/language/numbers")({
  head: () => ({
    meta: [
      { title: "Kashmiri Counting 1 to 50 (Koshur Numbers) | Kashmiri.dev" },
      {
        name: "description",
        content:
          "Learn Kashmiri counting from 1 to 50 in simple Roman transliteration. Koshur numbers for beginners, with notes on pronunciation and sources.",
      },
      { property: "og:title", content: "Kashmiri Counting 1 to 50 | Kashmiri.dev" },
      {
        property: "og:description",
        content: "Kashmiri (Koshur) numbers 1 to 50 with easy Roman spellings for beginners.",
      },
      { property: "og:url", content: "https://kashmiri.dev/language/numbers" },
    ],
    links: [{ rel: "canonical", href: "https://kashmiri.dev/language/numbers" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "Kashmiri Counting 1 to 50",
          description:
            "Kashmiri (Koshur) numbers from 1 to 50 in Roman transliteration, for beginners.",
          inLanguage: "en",
          learningResourceType: "Language guide",
          url: "https://kashmiri.dev/language/numbers",
          isPartOf: {
            "@type": "LearningResource",
            name: "Kashmiri Language (Koshur)",
            url: "https://kashmiri.dev/language",
          },
        }),
      },
    ],
  }),
  component: NumbersPage,
});

const numberGroups = [
  { label: "1 to 10", from: 1, to: 10 },
  { label: "11 to 20", from: 11, to: 20 },
  { label: "21 to 30", from: 21, to: 30 },
  { label: "31 to 40", from: 31, to: 40 },
  { label: "41 to 50", from: 41, to: 50 },
];

function NumbersPage() {
  return (
    <SiteLayout>
      <PageIntro
        label="Language / Numbers"
        title="Kashmiri counting: 1 to 50"
        description={
          <p>
            A simple list of Kashmiri (<em>Koshur</em>) numbers from one to fifty, written in Roman
            letters so beginners can read them easily. Numbers are grouped by tens to make them
            easier to remember.
          </p>
        }
      >
        <p className="max-w-2xl border-s-2 border-border ps-4 text-sm leading-relaxed text-muted-foreground">
          Roman spellings can differ between books and regions, so you may see these numbers written
          in other ways. We are reviewing the forms with native speakers and plan to add
          Perso-Arabic script and audio.
        </p>
      </PageIntro>

      <section className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8">
        {numberGroups.map((group) => (
          <div key={group.label}>
            <h2 className="mb-3 font-serif text-2xl text-foreground">{group.label}</h2>
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <ul className="divide-y divide-border">
                {numbers
                  .filter((number) => number.digit >= group.from && number.digit <= group.to)
                  .map((number) => (
                    <li
                      key={number.digit}
                      className="grid grid-cols-[2.5rem_minmax(0,1fr)_minmax(5rem,auto)] items-center gap-3 px-4 py-3"
                    >
                      <span className="tabular-nums font-mono text-sm font-semibold text-primary">
                        {number.digit}
                      </span>
                      <span lang="ks" className="font-serif text-lg text-foreground">
                        {number.koshur}
                      </span>
                      <span className="text-right text-sm text-muted-foreground">
                        {toEnglishWord(number.digit)}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8 pt-4">
        <div className="border-y border-border py-5">
          <h2 className="font-serif text-xl text-foreground">A small tip</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Once you know the tens, <em lang="ks">dah</em> (10), <em lang="ks">wuh</em> (20),{" "}
            <em lang="ks">trih</em> (30), <em lang="ks">tsatji</em> (40), and{" "}
            <em lang="ks">pantsah</em> (50), the numbers in between become easier. Many follow
            patterns built from the ones and the tens.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 pt-4">
        <div className="border-t border-border pt-5">
          <h2 className="font-serif text-xl text-foreground">Sources</h2>
          <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              Braj B. Kachru, <em>An Introduction to Spoken Kashmiri</em> (University of Illinois,
              1973).
            </li>
            <li>Omniglot: Kashmiri language and numbers page.</li>
            <li>Wiktionary: Kashmiri numerals category.</li>
          </ul>
        </div>
        <Link
          to="/language"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-primary transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to the Kashmiri language guide
        </Link>
      </section>
    </SiteLayout>
  );
}

const englishWords: Record<number, string> = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  21: "twenty-one",
  22: "twenty-two",
  23: "twenty-three",
  24: "twenty-four",
  25: "twenty-five",
  26: "twenty-six",
  27: "twenty-seven",
  28: "twenty-eight",
  29: "twenty-nine",
  30: "thirty",
  31: "thirty-one",
  32: "thirty-two",
  33: "thirty-three",
  34: "thirty-four",
  35: "thirty-five",
  36: "thirty-six",
  37: "thirty-seven",
  38: "thirty-eight",
  39: "thirty-nine",
  40: "forty",
  41: "forty-one",
  42: "forty-two",
  43: "forty-three",
  44: "forty-four",
  45: "forty-five",
  46: "forty-six",
  47: "forty-seven",
  48: "forty-eight",
  49: "forty-nine",
  50: "fifty",
};

function toEnglishWord(number: number): string {
  return englishWords[number] ?? String(number);
}
