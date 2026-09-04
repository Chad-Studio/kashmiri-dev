import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageIntroProps {
  label: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function PageIntro({ label, title, description, children, className }: PageIntroProps) {
  return (
    <header className={cn("mx-auto max-w-5xl px-4 pb-8 pt-12 md:pb-10 md:pt-16", className)}>
      <div className="flex max-w-3xl flex-col gap-4 border-s-2 border-primary/45 ps-5 sm:ps-7">
        <p className="text-sm font-semibold text-primary">{label}</p>
        <h1 className="text-balance font-serif text-4xl text-foreground sm:text-5xl">{title}</h1>
        <div className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </div>
        {children}
      </div>
    </header>
  );
}

interface SectionHeadingProps {
  title: string;
  description?: ReactNode;
  id?: string;
  className?: string;
}

export function SectionHeading({ title, description, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-2", className)}>
      <h2 id={id} className="text-balance font-serif text-2xl text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && (
        <div className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </div>
      )}
    </div>
  );
}
