"use client";

import { useState, useEffect } from "react";

export function useBootSequence() {
  const [isBooting, setIsBooting] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // The terminal boot is a green-on-black phosphor intro; in seasonal
    // mode the colors clash and the metaphor doesn't fit. Skip it.
    const isSeasonal =
      document.documentElement.getAttribute("data-theme") === "seasonal";

    const hasBooted = sessionStorage.getItem("boot-complete");
    if (hasBooted || isSeasonal) {
      setBootComplete(true);
      return;
    }

    setIsBooting(true);
    const timer = setTimeout(() => {
      setIsBooting(false);
      setBootComplete(true);
      sessionStorage.setItem("boot-complete", "true");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return { isBooting, bootComplete };
}
