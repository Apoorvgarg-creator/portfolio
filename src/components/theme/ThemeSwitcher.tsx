"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  SEASONS,
  SEASON_ICONS,
  SEASON_LABELS,
  type Season,
} from "@/lib/theme/types";

type Variant = "desktop" | "mobile";

export default function ThemeSwitcher({
  variant = "desktop",
}: {
  variant?: Variant;
}) {
  const { mode, season, setMode, setSeason } = useTheme();

  const isSeasonal = mode === "seasonal";

  function onChipKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = SEASONS[(index + 1) % SEASONS.length];
      setSeason(next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = SEASONS[(index - 1 + SEASONS.length) % SEASONS.length];
      setSeason(prev);
    }
  }

  return (
    <div
      className={
        variant === "desktop"
          ? "hidden md:flex items-center gap-2"
          : "flex flex-col gap-3 md:hidden"
      }
    >
      {/* Pill */}
      <div
        role="switch"
        aria-checked={isSeasonal}
        aria-label="Toggle theme between Terminal and Seasonal"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setMode(isSeasonal ? "terminal" : "seasonal");
          }
        }}
        className={`relative inline-flex items-center text-[10px] uppercase tracking-wider rounded-full border border-terminal-border bg-terminal-black/40 select-none cursor-pointer ${
          variant === "mobile" ? "self-start" : ""
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-0 bottom-0 rounded-full bg-terminal-green/15 border border-terminal-green/40"
          style={{
            width: "50%",
            left: isSeasonal ? "50%" : "0%",
          }}
        />
        <button
          type="button"
          onClick={() => setMode("terminal")}
          aria-pressed={!isSeasonal}
          className={`relative z-10 px-3 py-1 transition-colors ${
            isSeasonal
              ? "text-terminal-dim"
              : "text-terminal-green text-glow"
          }`}
        >
          Terminal
        </button>
        <button
          type="button"
          onClick={() => setMode("seasonal")}
          aria-pressed={isSeasonal}
          className={`relative z-10 px-3 py-1 transition-colors ${
            isSeasonal
              ? "text-terminal-green text-glow"
              : "text-terminal-dim"
          }`}
        >
          Seasonal
        </button>
      </div>

      {/* Season chips */}
      <AnimatePresence initial={false}>
        {isSeasonal && (
          <motion.div
            key="chips"
            role="radiogroup"
            aria-label="Select season"
            initial={{
              opacity: 0,
              x: variant === "desktop" ? -8 : 0,
              y: variant === "mobile" ? -4 : 0,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: variant === "desktop" ? -8 : 0,
              y: variant === "mobile" ? -4 : 0,
            }}
            transition={{ duration: 0.18 }}
            className={
              variant === "desktop"
                ? "flex items-center gap-1"
                : "flex items-center gap-1.5 flex-wrap"
            }
          >
            {SEASONS.map((s: Season, idx) => {
              const active = season === s;
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={SEASON_LABELS[s]}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setSeason(s)}
                  onKeyDown={(e) => onChipKeyDown(e, idx)}
                  title={SEASON_LABELS[s]}
                  className={`flex items-center justify-center text-[12px] rounded-full border transition-colors ${
                    variant === "desktop" ? "w-7 h-7" : "px-3 py-1 gap-1.5"
                  } ${
                    active
                      ? "border-terminal-green text-terminal-green bg-terminal-green/10 text-glow"
                      : "border-terminal-border text-terminal-dim hover:text-terminal-text hover:border-terminal-text/40"
                  }`}
                >
                  <span aria-hidden="true">{SEASON_ICONS[s]}</span>
                  {variant === "mobile" && (
                    <span className="text-[11px]">{SEASON_LABELS[s]}</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
