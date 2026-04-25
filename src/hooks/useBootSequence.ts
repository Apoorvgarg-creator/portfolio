"use client";

import { useState, useEffect } from "react";

export function useBootSequence() {
  const [isBooting, setIsBooting] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasBooted = sessionStorage.getItem("boot-complete");
    if (hasBooted) {
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
