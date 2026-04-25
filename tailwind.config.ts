import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: "rgb(var(--terminal-black-rgb) / <alpha-value>)",
          text: "rgb(var(--terminal-text-rgb) / <alpha-value>)",
          green: "rgb(var(--terminal-green-rgb) / <alpha-value>)",
          amber: "rgb(var(--terminal-amber-rgb) / <alpha-value>)",
          dim: "rgb(var(--terminal-dim-rgb) / <alpha-value>)",
          border: "rgb(var(--terminal-border-rgb) / <alpha-value>)",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scanline: "scanline 8s linear infinite",
        flicker: "flicker 0.15s infinite",
        "glitch-1": "glitch-1 2s infinite linear alternate-reverse",
        "glitch-2": "glitch-2 3s infinite linear alternate-reverse",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "type-cursor": "blink 0.7s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%": { opacity: "0.27861" },
          "5%": { opacity: "0.34769" },
          "10%": { opacity: "0.23604" },
          "15%": { opacity: "0.90626" },
          "20%": { opacity: "0.18128" },
          "25%": { opacity: "0.83891" },
          "30%": { opacity: "0.65583" },
          "35%": { opacity: "0.67807" },
          "40%": { opacity: "0.26559" },
          "45%": { opacity: "0.84693" },
          "50%": { opacity: "0.96019" },
          "55%": { opacity: "0.08594" },
          "60%": { opacity: "0.20313" },
          "65%": { opacity: "0.71988" },
          "70%": { opacity: "0.53455" },
          "75%": { opacity: "0.37288" },
          "80%": { opacity: "0.71428" },
          "85%": { opacity: "0.70419" },
          "90%": { opacity: "0.7003" },
          "95%": { opacity: "0.36108" },
          "100%": { opacity: "0.24387" },
        },
        "glitch-1": {
          "0%": { clipPath: "inset(20% 0 60% 0)" },
          "20%": { clipPath: "inset(60% 0 1% 0)" },
          "40%": { clipPath: "inset(43% 0 1% 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)" },
          "80%": { clipPath: "inset(54% 0 7% 0)" },
          "100%": { clipPath: "inset(58% 0 43% 0)" },
        },
        "glitch-2": {
          "0%": { clipPath: "inset(65% 0 13% 0)" },
          "20%": { clipPath: "inset(79% 0 1% 0)" },
          "40%": { clipPath: "inset(48% 0 30% 0)" },
          "60%": { clipPath: "inset(10% 0 60% 0)" },
          "80%": { clipPath: "inset(30% 0 30% 0)" },
          "100%": { clipPath: "inset(10% 0 70% 0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
