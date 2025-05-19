import { useEffect, useState } from "react";

const THEME_KEY = "app-theme";

export type Theme =
  | "light"
  | "dark"
  | "blue"
  | "dark-blue"
  | "rose"
  | "dark-rose"
  | "yellow"
  | "dark-yellow"
  | "green"
  | "dark-green"
  | "system";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem(THEME_KEY) as Theme) || "system";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const appliedTheme =
      theme === "system" ? (systemDark ? "dark-rose" : "light-rose") : theme;

    // Bersihkan semua class tema yang mungkin sebelumnya ada
    root.classList.remove(
      "light",
      "dark",
      "blue",
      "dark-blue",
      "rose",
      "dark-rose",
      "yellow",
      "dark-yellow",
      "green",
      "dark-green"
    );
    root.classList.add(appliedTheme);

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return { theme, setTheme };
}
