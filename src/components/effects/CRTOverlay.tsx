"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function CRTOverlay() {
  const { mode, mounted } = useTheme();
  const pathname = usePathname();
  const onCreator = pathname?.startsWith("/creator");

  // Suppress CRT chrome on the creator route — pirate-samurai aesthetic isn't phosphor.
  if (onCreator) return null;

  // After hydration, suppress the CRT chrome in seasonal mode.
  if (mounted && mode !== "terminal") return null;

  return (
    <>
      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
