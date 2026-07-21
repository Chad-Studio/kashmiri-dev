import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/history", label: "History" },
  { to: "/language", label: "Language" },
  { to: "/people", label: "People" },
  { to: "/civic-guide", label: "Civic Guide" },
  { to: "/learn-ai", label: "Learn with AI" },
  { to: "/watch-listen", label: "Watch & Listen" },
] as const;

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
  const [open, setOpen] = useState(false);
  const linkCls =
    "text-sm font-medium text-foreground/80 hover:text-primary transition-colors";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-b border-border/60 backdrop-blur bg-background/80 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
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

        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={linkCls}
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-border/60 bg-background"
        >
          <ul className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground/85 hover:bg-muted hover:text-primary"
                  activeProps={{ className: "text-primary font-semibold bg-muted" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
        <p>© {new Date().getFullYear()} Kashmiri.dev — Education for the valley.</p>
        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <p>Made with care. No accounts. No trackers.</p>
        </div>
      </div>
    </footer>
  );
}
