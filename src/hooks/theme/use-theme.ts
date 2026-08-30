import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

export const THEME_KEY = "da:theme";

const listeners = new Set<(value: Theme) => void>();

let current: Theme = "dark";

function read(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function apply(value: Theme) {
  const root = document.documentElement;
  root.dataset["theme"] = value;
  root.style.colorScheme = value;
}

export function getTheme(): Theme {
  return current;
}

export function setTheme(value: Theme) {
  current = value;
  apply(value);
  try {
    window.localStorage.setItem(THEME_KEY, value);
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((fn) => fn(value));
}

/** Reads the persisted theme and keeps the `data-theme` attribute in sync. */
export function useTheme() {
  const [value, setValue] = useState<Theme>(current);

  useEffect(() => {
    const initial = read();
    current = initial;
    apply(initial);
    setValue(initial);

    listeners.add(setValue);
    return () => {
      listeners.delete(setValue);
    };
  }, []);

  return {
    theme: value,
    setTheme,
    toggle: () => setTheme(current === "dark" ? "light" : "dark"),
  };
}
