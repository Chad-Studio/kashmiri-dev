import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { to: "/history", label: "History" },
  { to: "/language", label: "Language" },
  { to: "/people", label: "People" },
  { to: "/civic-guide", label: "Civic Guide" },
  { to: "/learn-ai", label: "Learn AI" },
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
  const [isDark, setIsDark] = useState(false);
  const linkCls =
    "text-sm font-medium text-foreground/80 hover:text-primary transition-colors";

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.documentElement.style.colorScheme = nextIsDark ? "dark" : "light";
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <header className="border-b border-border/60 backdrop-blur bg-background/80 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2029%2C%202026%2C%2002_54_48%20PM-TOP6Dt2lsin3wVQzDhgRXw9f8LbHQM.png"
            alt=""
            aria-hidden="true"
            className="h-10 w-10 object-contain"
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

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  aria-pressed={isDark}
                >
                  {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {isDark ? "Light mode" : "Dark mode"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
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
          <p>Free to read, with no sign-up or tracking.</p>
        </div>
      </div>
    </footer>
  );
}
