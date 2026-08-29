import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const getCurrentTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => setTheme(getCurrentTheme());
    const followSystemTheme = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      applyTheme(event.matches ? "dark" : "light");
      syncTheme();
    };

    syncTheme();
    media.addEventListener("change", followSystemTheme);
    return () => media.removeEventListener("change", followSystemTheme);
  }, []);

  const updateTheme = (nextTheme: Theme) => {
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return {
    theme,
    toggleTheme: () => updateTheme(theme === "dark" ? "light" : "dark"),
  };
}

function applyTheme(theme: Theme) {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = theme;
}
