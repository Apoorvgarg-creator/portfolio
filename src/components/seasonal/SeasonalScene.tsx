"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme/ThemeProvider";

// Lazy-load each scene; they're heavy with rAF + canvas.
const WinterScene = dynamic(() => import("./scenes/WinterScene"), {
  ssr: false,
});
const AutumnScene = dynamic(() => import("./scenes/AutumnScene"), {
  ssr: false,
});
const SpringScene = dynamic(() => import("./scenes/SpringScene"), {
  ssr: false,
});
const SummerScene = dynamic(() => import("./scenes/SummerScene"), {
  ssr: false,
});
const AllScene = dynamic(() => import("./scenes/AllScene"), {
  ssr: false,
});

export default function SeasonalScene() {
  const { mode, season, mounted } = useTheme();
  const pathname = usePathname();

  // Creator route has its own pirate-samurai surface — kill seasonal scene
  // entirely (visual scene, mascot, AND the floating wave-pause portal button).
  if (pathname?.startsWith("/creator")) return null;

  if (!mounted || mode !== "seasonal") return null;

  return (
    <div className="seasonal-scene-root" aria-hidden="true">
      {season === "winter" && <WinterScene />}
      {season === "spring" && <SpringScene />}
      {season === "summer" && <SummerScene />}
      {season === "autumn" && <AutumnScene />}
      {season === "all" && <AllScene />}
    </div>
  );
}
