"use client";

import dynamic from "next/dynamic";
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
