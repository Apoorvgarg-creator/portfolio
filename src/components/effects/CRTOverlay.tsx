"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

export default function CRTOverlay() {
  const { mode, mounted } = useTheme();

  // After hydration, suppress the CRT chrome in seasonal mode.
  // Before hydration, render normally so terminal-default SSR matches first paint.
  if (mounted && mode !== "terminal") return null;

  return (
    <>
      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
