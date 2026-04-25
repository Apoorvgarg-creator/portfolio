"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Mascot from "@/components/seasonal/mascot/Mascot";
import SummerCostume from "@/components/seasonal/mascot/costumes/SummerCostume";
import Waves from "@/components/seasonal/effects/Waves";
import SplashOverlay from "@/components/seasonal/effects/SplashOverlay";
import type { MascotState } from "@/components/seasonal/mascot/poses";
import { useUI } from "@/components/theme/ThemeProvider";

const PAUSE_STORAGE_KEY = "summer-waves-paused";

function SandCastle({ stage }: { stage: 0 | 1 | 2 | 3 }) {
  return (
    <div
      className="absolute -right-14 bottom-0 w-14 h-16 pointer-events-none"
      aria-hidden="true"
    >
      <svg viewBox="0 0 56 64" width="100%" height="100%" overflow="visible">
        {/* Sand mound */}
        <path
          d="M2 56 Q14 38 28 40 Q42 38 54 56 L54 62 L2 62 Z"
          fill="#f3c97c"
          stroke="rgba(120,80,30,0.35)"
          strokeWidth="0.8"
        />
        {/* Stage 1: small sand bump */}
        {stage >= 1 && (
          <motion.g
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ originY: "56px" }}
          >
            <path
              d="M16 56 Q22 44 28 56 Z"
              fill="#e3a45e"
              stroke="rgba(120,80,30,0.4)"
              strokeWidth="0.8"
            />
          </motion.g>
        )}
        {/* Stage 2: castle base */}
        {stage >= 2 && (
          <motion.g
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ originY: "56px" }}
          >
            <rect
              x="14"
              y="34"
              width="28"
              height="22"
              fill="#e3a45e"
              stroke="rgba(120,80,30,0.45)"
              strokeWidth="0.8"
            />
            <rect x="14" y="34" width="3" height="3" fill="#cf8a48" />
            <rect x="20" y="34" width="3" height="3" fill="#cf8a48" />
            <rect x="26" y="34" width="3" height="3" fill="#cf8a48" />
            <rect x="32" y="34" width="3" height="3" fill="#cf8a48" />
            <rect x="38" y="34" width="3" height="3" fill="#cf8a48" />
            <rect x="24" y="44" width="6" height="12" fill="#a26a32" />
          </motion.g>
        )}
        {/* Stage 3: towers + flag */}
        {stage >= 3 && (
          <motion.g
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ originY: "34px", originX: "28px" }}
          >
            <rect x="8" y="26" width="8" height="30" fill="#e3a45e" stroke="rgba(120,80,30,0.45)" />
            <path d="M8 26 L12 22 L16 26 Z" fill="#cf8a48" />
            <rect x="40" y="26" width="8" height="30" fill="#e3a45e" stroke="rgba(120,80,30,0.45)" />
            <path d="M40 26 L44 22 L48 26 Z" fill="#cf8a48" />
            <line x1="28" y1="34" x2="28" y2="20" stroke="#5a3a1a" strokeWidth="1" />
            <path d="M28 20 L36 23 L28 26 Z" fill="#e85a5a" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}

export default function SummerScene() {
  const [mascotState, setMascotState] = useState<MascotState>("sunbathe");
  const [castleStage, setCastleStage] = useState<0 | 1 | 2 | 3>(0);
  const [wavesPaused, setWavesPaused] = useState(false);
  const { shellOpen } = useUI();

  // Hydrate the pause preference from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PAUSE_STORAGE_KEY);
      if (raw === "1") setWavesPaused(true);
    } catch {
      // ignore
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      window.localStorage.setItem(PAUSE_STORAGE_KEY, wavesPaused ? "1" : "0");
    } catch {
      // ignore
    }
  }, [wavesPaused]);

  // Alternate sunbathe ↔ patSand every 6s
  useEffect(() => {
    const id = setInterval(() => {
      setMascotState((s) => (s === "sunbathe" ? "patSand" : "sunbathe"));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // Castle grows every ~16s, resets after stage 3 to stage 0
  useEffect(() => {
    const id = setInterval(() => {
      setCastleStage((s) => (s < 3 ? ((s + 1) as 0 | 1 | 2 | 3) : 0));
    }, 16000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Sun + slow rays — wrapped together so the rays center on the sun */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "8%", right: "12%", width: 320, height: 320 }}
        aria-hidden="true"
      >
        {/* Rays — fill the wrapper so their center matches the sun's */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,235,150,0.22) 0%, transparent 8%, rgba(255,235,150,0.22) 16%, transparent 24%, rgba(255,235,150,0.22) 32%, transparent 40%, rgba(255,235,150,0.22) 48%, transparent 56%, rgba(255,235,150,0.22) 64%, transparent 72%, rgba(255,235,150,0.22) 80%, transparent 88%, rgba(255,235,150,0.22) 96%, transparent 100%)",
            maskImage:
              "radial-gradient(circle, black 18%, rgba(0,0,0,0.7) 30%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(circle, black 18%, rgba(0,0,0,0.7) 30%, transparent 65%)",
          }}
        />
        {/* Sun disc — centered in the wrapper */}
        <div
          className="absolute rounded-full"
          style={{
            width: 128,
            height: 128,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,235,150,0.95) 0%, rgba(255,200,80,0.6) 45%, rgba(255,200,80,0) 72%)",
            filter: "blur(0.5px)",
          }}
        />
      </div>

      <Waves />
      <SplashOverlay paused={wavesPaused} />

      {/* Pause-the-wave toggle — fixed top-right under the navbar */}
      <button
        type="button"
        onClick={() => setWavesPaused((p) => !p)}
        aria-pressed={wavesPaused}
        aria-label={
          wavesPaused
            ? "Resume the wave splash event"
            : "Stop the wave splash event"
        }
        className="fixed right-3 z-30 pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono backdrop-blur-md border transition-colors bg-terminal-black/40 border-terminal-border text-terminal-text hover:border-terminal-green/60 hover:text-terminal-green"
        style={{ top: "calc(48px + 12px)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {wavesPaused ? (
            <motion.span
              key="resume"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <span aria-hidden="true">▶</span>
              <span>Resume waves</span>
            </motion.span>
          ) : (
            <motion.span
              key="pause"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <span aria-hidden="true">🌊</span>
              <span>Stop waves</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {!shellOpen && (
        <Mascot
          state={mascotState}
          costume={<SummerCostume />}
          overlay={<SandCastle stage={castleStage} />}
        />
      )}
    </>
  );
}
