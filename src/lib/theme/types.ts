export type Mode = "terminal" | "seasonal";

export type Season = "winter" | "spring" | "summer" | "autumn" | "all";

export type ThemeState = {
  mode: Mode;
  season: Season;
};

export const SEASONS: readonly Season[] = [
  "winter",
  "spring",
  "summer",
  "autumn",
  "all",
] as const;

export const SEASON_LABELS: Record<Season, string> = {
  winter: "Winter",
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  all: "All",
};

export const SEASON_ICONS: Record<Season, string> = {
  winter: "❄",
  spring: "🌸",
  summer: "☀",
  autumn: "🍁",
  all: "✦",
};
