"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Drop = {
  id: number;
  left: number; // %
  top: number; // %
  size: number; // px
  delay: number; // ms
  duration: number; // ms
};

const DESKTOP_COUNT = 30;
const MOBILE_COUNT = 14;

let nextId = 1;

function makeBatch(count: number): Drop[] {
  const drops: Drop[] = [];
  for (let i = 0; i < count; i++) {
    drops.push({
      id: nextId++,
      left: Math.random() * 100,
      top: 5 + Math.random() * 35,
      size: 6 + Math.random() * 12,
      delay: Math.random() * 250,
      duration: 1700 + Math.random() * 1300,
    });
  }
  return drops;
}

// Lazily-created audio context. Browsers require a user gesture before
// playback; the user clicking the Summer chip already counts as one,
// so by the time this component mounts, resume() should succeed.
type AudioRefShape = { ctx: AudioContext | null };

function ensureCtx(ref: AudioRefShape): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ref.ctx) {
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      ref.ctx = new Ctor();
    } catch {
      return null;
    }
  }
  if (ref.ctx.state === "suspended") {
    ref.ctx.resume().catch(() => {});
  }
  return ref.ctx;
}

function playBeep(
  ref: AudioRefShape,
  freq: number,
  duration = 0.22,
  gain = 0.05
) {
  const ctx = ensureCtx(ref);
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(g).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  } catch {
    // ignore
  }
}

function playSplashSound(ref: AudioRefShape) {
  const ctx = ensureCtx(ref);
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    // Upward whoosh: short pitch sweep from 200 Hz to 1.2 kHz
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.06, now + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    // Bandpass for a watery character
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(1.4, now);
    osc.connect(filter).connect(g).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.55);
  } catch {
    // ignore
  }
}

const COUNTDOWN_FREQS: Record<3 | 2 | 1, number> = {
  3: 880,
  2: 660,
  1: 440,
};

export default function SplashOverlay({
  paused = false,
}: {
  paused?: boolean;
}) {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [count, setCount] = useState<3 | 2 | 1 | null>(null);
  const audioRef = useRef<AudioRefShape>({ ctx: null });

  useEffect(() => {
    if (paused) {
      // Clear any visible countdown when pausing mid-sequence
      setCount(null);
      return;
    }
    function fireSplash() {
      const isMobile = window.innerWidth < 768;
      const batch = makeBatch(isMobile ? MOBILE_COUNT : DESKTOP_COUNT);
      setDrops((prev) => [...prev, ...batch]);
      playSplashSound(audioRef.current);
      const maxLife = batch.reduce(
        (m, d) => Math.max(m, d.delay + d.duration + 200),
        0
      );
      window.setTimeout(() => {
        const ids = new Set(batch.map((d) => d.id));
        setDrops((prev) => prev.filter((d) => !ids.has(d.id)));
      }, maxLife);
    }

    function runCountdown() {
      // Sequence: 3 (now) → 2 (+800ms) → 1 (+1600ms) → splash (+2400ms)
      const sequence: Array<{ at: number; n: 3 | 2 | 1 | null }> = [
        { at: 0, n: 3 },
        { at: 800, n: 2 },
        { at: 1600, n: 1 },
        { at: 2400, n: null },
      ];
      const timers = sequence.map(({ at, n }) =>
        window.setTimeout(() => {
          setCount(n);
          if (n != null) playBeep(audioRef.current, COUNTDOWN_FREQS[n]);
          else fireSplash();
        }, at)
      );
      return () => timers.forEach(clearTimeout);
    }

    function schedule(initial = false) {
      const wait = initial ? 6000 : 18000 + Math.random() * 12000;
      return window.setTimeout(() => {
        cleanupCountdown = runCountdown();
        // Schedule the next cycle relative to the END of this splash.
        nextTimer = schedule();
      }, wait);
    }

    let cleanupCountdown: (() => void) | undefined;
    let nextTimer = schedule(true);

    return () => {
      window.clearTimeout(nextTimer);
      cleanupCountdown?.();
    };
  }, [paused]);

  return (
    <>
      {/* Countdown overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[25] flex items-center justify-center"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          {count !== null && (
            <motion.div
              key={count}
              initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
              animate={{ scale: 1.1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.6, opacity: 0, rotate: 6 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="font-mono font-black select-none"
              style={{
                fontSize: "clamp(120px, 22vw, 240px)",
                color: "rgb(var(--terminal-green-rgb))",
                textShadow:
                  "0 0 20px rgb(var(--glow-rgb) / 0.45), 0 6px 24px rgb(0 0 0 / 0.18)",
                letterSpacing: "-0.02em",
              }}
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drops */}
      <div
        className="fixed inset-0 pointer-events-none z-[20]"
        aria-hidden="true"
      >
        {drops.map((d) => (
          <span
            key={d.id}
            className="absolute rounded-b-full bg-sky-300/85 ring-1 ring-sky-200/40 shadow-[0_0_8px_rgba(120,200,255,0.5)]"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: `${d.size}px`,
              height: `${d.size * 1.4}px`,
              animation: `splash-drip ${d.duration}ms ${d.delay}ms ease-in forwards`,
            }}
          />
        ))}
      </div>
    </>
  );
}
