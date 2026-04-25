"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Mode, Season, ThemeState } from "@/lib/theme/types";
import {
  DEFAULT_THEME,
  readTheme,
  writeTheme,
} from "@/lib/theme/storage";

type ThemeContextValue = {
  mode: Mode;
  season: Season;
  mounted: boolean;
  setMode: (mode: Mode) => void;
  setSeason: (season: Season) => void;
  toggleMode: () => void;
};

type UIContextValue = {
  shellOpen: boolean;
  setShellOpen: (open: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const UIContext = createContext<UIContextValue | null>(null);

function applyDom(state: ThemeState) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  if (state.mode === "seasonal") {
    html.setAttribute("data-theme", "seasonal");
    html.setAttribute("data-season", state.season);
  } else {
    html.removeAttribute("data-theme");
    html.removeAttribute("data-season");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Server-render baseline matches DEFAULT_THEME so the body class colors
  // align with the data-attributes applied by the pre-paint init script.
  const [state, setState] = useState<ThemeState>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);
  const [shellOpen, setShellOpen] = useState(false);

  // Hydrate from localStorage on mount; the inline init script has already
  // applied data attributes before paint, so this just syncs React state.
  useEffect(() => {
    const stored = readTheme();
    if (stored) {
      setState(stored);
    }
    setMounted(true);
  }, []);

  // Keep DOM and storage in sync after hydration.
  useEffect(() => {
    if (!mounted) return;
    applyDom(state);
    writeTheme(state);
  }, [state, mounted]);

  const setMode = useCallback((mode: Mode) => {
    setState((prev) => ({ ...prev, mode }));
  }, []);

  const setSeason = useCallback((season: Season) => {
    setState((prev) => ({ ...prev, season, mode: "seasonal" }));
  }, []);

  const toggleMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      mode: prev.mode === "terminal" ? "seasonal" : "terminal",
    }));
  }, []);

  const themeValue = useMemo<ThemeContextValue>(
    () => ({
      mode: state.mode,
      season: state.season,
      mounted,
      setMode,
      setSeason,
      toggleMode,
    }),
    [state.mode, state.season, mounted, setMode, setSeason, toggleMode]
  );

  const uiValue = useMemo<UIContextValue>(
    () => ({ shellOpen, setShellOpen }),
    [shellOpen]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <UIContext.Provider value={uiValue}>{children}</UIContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error("useUI must be used within ThemeProvider");
  }
  return ctx;
}
