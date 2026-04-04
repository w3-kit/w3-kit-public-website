export type Theme = "system" | "light" | "dark";
export type Section = "landing" | "ui" | "docs" | "registry" | "design";

export const THEME_KEY = "w3-theme";
export const THEME_ATTR = "data-theme";
export const SYSTEM_DARK_CLASS = "system-dark";
const DARK_MQ = "(prefers-color-scheme: dark)";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(THEME_KEY) as Theme) || "system";
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
  const root = document.documentElement;
  root.setAttribute(THEME_ATTR, theme);

  if (theme === "system") {
    root.classList.toggle(
      SYSTEM_DARK_CLASS,
      window.matchMedia(DARK_MQ).matches
    );
  } else {
    root.classList.remove(SYSTEM_DARK_CLASS);
  }
}

export function listenToSystemTheme(callback: () => void): () => void {
  const mq = window.matchMedia(DARK_MQ);
  const handler = () => {
    if (getStoredTheme() === "system") {
      document.documentElement.classList.toggle(SYSTEM_DARK_CLASS, mq.matches);
      callback();
    }
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
