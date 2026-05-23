"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export type PortalTarget = "creator" | "portfolio";

type Origin = { x: number; y: number };

type PortalState =
  | { phase: "idle" }
  | { phase: "active"; target: PortalTarget; origin: Origin };

type PortalContextValue = {
  state: PortalState;
  /** True while the transition is animating — consumers can pause heavy work. */
  isActive: boolean;
  trigger: (target: PortalTarget, origin?: Origin) => void;
  reset: () => void;
};

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortalState>({ phase: "idle" });
  const lockedRef = useRef(false);

  const trigger = useCallback((target: PortalTarget, origin?: Origin) => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setState({
      phase: "active",
      target,
      origin: origin ?? {
        x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
        y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
      },
    });
  }, []);

  const reset = useCallback(() => {
    lockedRef.current = false;
    setState({ phase: "idle" });
  }, []);

  const value = useMemo(
    () => ({ state, isActive: state.phase === "active", trigger, reset }),
    [state, trigger, reset]
  );

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used inside PortalProvider");
  return ctx;
}
