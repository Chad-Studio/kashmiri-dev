import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const linkCls =
    "text-sm font-medium text-foreground/80 hover:text-primary transition-colors";
  return (
    <header className="border-b border-border/60 backdrop-blur bg-background/80 sticky top-0 z-40">
      <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span
            aria-hidden
            className="inline-block h-7 w-7 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, var(--saffron), var(--chinar))",
            }}
          />
          <span className="font-serif text-xl tracking-tight text-foreground">
            Kashmiri<span className="text-primary">.dev</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link to="/history" className={linkCls} activeProps={{ className: "text-primary font-semibold" }}>
            History
          </Link>
          <Link to="/language" className={linkCls} activeProps={{ className: "text-primary font-semibold" }}>
            Language
          </Link>
          <Link to="/learn-ai" className={linkCls} activeProps={{ className: "text-primary font-semibold" }}>
            Learn with AI
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
        <p>© {new Date().getFullYear()} Kashmiri.dev — Education for the valley.</p>
        <p>Made with care. No accounts. No trackers.</p>
      </div>
    </footer>
  );
}
