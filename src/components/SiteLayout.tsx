import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const brandMarkUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2029%2C%202026%2C%2002_54_48%20PM-TOP6Dt2lsin3wVQzDhgRXw9f8LbHQM.png";

const navItems = [
  { to: "/history", label: "History" },
  { to: "/language", label: "Language" },
  { to: "/people", label: "People" },
  { to: "/civic-guide", label: "Civic Guide" },
  { to: "/learn-ai", label: "Learn with AI" },
  { to: "/watch-listen", label: "Watch & Listen" },
] as const;

const mobileNavGroups = [
  { label: "Explore", items: navItems.slice(0, 3) },
  { label: "Learn", items: navItems.slice(3) },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
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
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        <Link
          to="/"
          className="group flex min-h-11 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => setOpen(false)}
        >
          <img
            src={brandMarkUrl}
            alt=""
            aria-hidden="true"
            className="size-10 shrink-0 object-contain"
          />
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
            Kashmiri<span className="text-primary">.dev</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-[background-color,color] duration-150 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              activeProps={{ className: "bg-accent text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <TooltipProvider>
          <div className="flex items-center gap-1">
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
              <TooltipContent side="bottom">{isDark ? "Light mode" : "Dark mode"}</TooltipContent>
            </Tooltip>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen((current) => !current)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="lg:hidden"
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </TooltipProvider>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-border/80 bg-background lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5">
            {mobileNavGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <p className="px-3 text-sm font-semibold text-muted-foreground">{group.label}</p>
                <ul className="grid gap-1 sm:grid-cols-3">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="block min-h-11 rounded-md px-3 py-2.5 text-base font-semibold text-foreground transition-[background-color,color] duration-150 hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        activeProps={{ className: "bg-accent text-primary" }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Kashmiri.dev. Education for the valley.</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <Link
            to="/about"
            className="font-semibold text-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            About
          </Link>
          <p>Free to read, with no sign-up or tracking.</p>
        </div>
      </div>
    </footer>
  );
}
