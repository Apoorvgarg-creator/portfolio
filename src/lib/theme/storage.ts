import type { Mode, Season, ThemeState } from "./types";

export const STORAGE_KEY = "theme-v1";

// First-time visitors with no stored preference land on seasonal/summer.
export const DEFAULT_THEME: ThemeState = { mode: "seasonal", season: "summer" };

export function monthToSeason(month: number): Season {
  if (month === 12 || month === 1 || month === 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  return "autumn";
}

export function defaultSeason(): Season {
  return DEFAULT_THEME.season;
}

export function readTheme(): ThemeState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ThemeState>;
    // Stored values take precedence; otherwise fall back to defaults
    const mode: Mode = parsed.mode === "terminal" ? "terminal" : "seasonal";
    const validSeasons: Season[] = [
      "winter",
      "spring",
      "summer",
      "autumn",
      "all",
    ];
    const season: Season = validSeasons.includes(parsed.season as Season)
      ? (parsed.season as Season)
      : DEFAULT_THEME.season;
    return { mode, season };
  } catch {
    return null;
  }
}

export function writeTheme(state: ThemeState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private-mode failures
  }
}
