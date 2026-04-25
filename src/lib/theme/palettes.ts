import type { Season } from "./types";

type PaletteVars = {
  "--terminal-black-rgb": string;
  "--terminal-text-rgb": string;
  "--terminal-green-rgb": string;
  "--terminal-amber-rgb": string;
  "--terminal-dim-rgb": string;
  "--terminal-border-rgb": string;
  "--glow-rgb": string;
  "--scene-bg": string;
};

export const TERMINAL_PALETTE: PaletteVars = {
  "--terminal-black-rgb": "0 0 0",
  "--terminal-text-rgb": "224 224 224",
  "--terminal-green-rgb": "0 255 65",
  "--terminal-amber-rgb": "255 176 0",
  "--terminal-dim-rgb": "85 85 85",
  "--terminal-border-rgb": "51 51 51",
  "--glow-rgb": "0 255 65",
  "--scene-bg": "#000000",
};

export const SEASON_PALETTES: Record<Season, PaletteVars> = {
  winter: {
    "--terminal-black-rgb": "11 18 48",
    "--terminal-text-rgb": "232 238 247",
    "--terminal-green-rgb": "124 200 255",
    "--terminal-amber-rgb": "255 243 168",
    "--terminal-dim-rgb": "105 121 168",
    "--terminal-border-rgb": "42 53 96",
    "--glow-rgb": "124 200 255",
    "--scene-bg":
      "radial-gradient(circle at 80% 15%, rgba(255,243,200,0.12) 0%, transparent 40%), linear-gradient(180deg, #060a1c 0%, #0b1230 50%, #1a2455 100%)",
  },
  spring: {
    "--terminal-black-rgb": "255 240 246",
    "--terminal-text-rgb": "61 34 51",
    "--terminal-green-rgb": "232 90 138",
    "--terminal-amber-rgb": "127 201 127",
    "--terminal-dim-rgb": "160 123 138",
    "--terminal-border-rgb": "245 205 217",
    "--glow-rgb": "232 90 138",
    "--scene-bg":
      "linear-gradient(180deg, #ffe4ec 0%, #fff8d6 55%, #d6f5d6 100%)",
  },
  summer: {
    "--terminal-black-rgb": "255 244 217",
    "--terminal-text-rgb": "58 37 17",
    "--terminal-green-rgb": "0 150 199",
    "--terminal-amber-rgb": "255 183 3",
    "--terminal-dim-rgb": "160 132 105",
    "--terminal-border-rgb": "245 214 139",
    "--glow-rgb": "0 150 199",
    "--scene-bg":
      "linear-gradient(180deg, #87ceeb 0%, #b9e3f5 35%, #f6e4a3 75%, #f4d28b 100%)",
  },
  autumn: {
    "--terminal-black-rgb": "58 26 14",
    "--terminal-text-rgb": "251 228 199",
    "--terminal-green-rgb": "255 119 51",
    "--terminal-amber-rgb": "252 183 91",
    "--terminal-dim-rgb": "138 91 63",
    "--terminal-border-rgb": "94 47 26",
    "--glow-rgb": "255 119 51",
    "--scene-bg":
      "linear-gradient(180deg, #2a0e07 0%, #5a1f0c 45%, #a8431e 100%)",
  },
  all: {
    "--terminal-black-rgb": "247 243 255",
    "--terminal-text-rgb": "45 31 61",
    "--terminal-green-rgb": "124 92 176",
    "--terminal-amber-rgb": "232 133 84",
    "--terminal-dim-rgb": "138 122 163",
    "--terminal-border-rgb": "212 200 232",
    "--glow-rgb": "124 92 176",
    "--scene-bg":
      "radial-gradient(circle at 15% 10%, rgba(180,210,255,0.4) 0%, transparent 45%), radial-gradient(circle at 85% 15%, rgba(255,215,180,0.4) 0%, transparent 45%), radial-gradient(circle at 80% 85%, rgba(255,200,220,0.35) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(220,200,255,0.4) 0%, transparent 45%), linear-gradient(180deg, #f7f3ff 0%, #fff7ec 100%)",
  },
};

export type { PaletteVars };
