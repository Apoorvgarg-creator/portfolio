"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePortal } from "./PortalProvider";
import Hammer from "./Hammer";
import { playFrost, playIceShatter, playIceTap } from "./portalAudio";

type Phase =
  | "frost"
  | "prehit"
  | "swing"
  | "impact"
  | "shatter"
  | "settle"
  | "done";

const T = {
  frost: 500,
  prehit: 300,
  swing: 340,
  impact: 180,
  shatter: 620,
  settle: 200,
};

// Navigate this many ms into frost — the new route mounts behind the
// frost overlay while only an opacity tween is on screen, so React's
// reconcile work doesn't fight the visually intense impact/shatter frames.
const NAV_OFFSET = 120;

type Pt = { x: number; y: number };

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCracks(rng: () => number, scale = 1) {
  const cracks: { d: string; w: number }[] = [];
  const rays = Math.max(5, Math.round(9 * scale));
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2 + rng() * 0.4;
    let x = 0;
    let y = 0;
    let d = `M 0 0`;
    let len = (16 + rng() * 16) * scale;
    const segs = 4 + Math.floor(rng() * 2);
    let a = angle;
    for (let s = 0; s < segs; s++) {
      a += (rng() - 0.5) * 0.7;
      x += Math.cos(a) * len;
      y += Math.sin(a) * len;
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      if (s > 1 && rng() < 0.3) {
        const ba = a + (rng() < 0.5 ? -1 : 1) * (0.6 + rng() * 0.6);
        const bl = (10 + rng() * 14) * scale;
        const bx = x + Math.cos(ba) * bl;
        const by = y + Math.sin(ba) * bl;
        cracks.push({
          d: `M ${x.toFixed(1)} ${y.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)}`,
          w: 1.0,
        });
      }
      len *= 0.9;
    }
    cracks.push({ d, w: (2.0 - i * 0.05) * scale });
  }
  return cracks;
}

function buildShards(rng: () => number, count = 16) {
  const shards: {
    points: string;
    tx: number;
    ty: number;
    rot: number;
    fill: string;
    delay: number;
  }[] = [];
  for (let i = 0; i < count; i++) {
    const cx = (rng() - 0.5) * 180;
    const cy = (rng() - 0.5) * 180;
    const r = 14 + rng() * 22;
    const pts: string[] = [];
    const sides = 3 + Math.floor(rng() * 2);
    for (let s = 0; s < sides; s++) {
      const a = (s / sides) * Math.PI * 2 + rng() * 0.6;
      const rr = r * (0.6 + rng() * 0.7);
      pts.push(
        `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`
      );
    }
    const dir = Math.atan2(cy, cx) + (rng() - 0.5) * 0.4;
    const dist = 480 + rng() * 540;
    shards.push({
      points: pts.join(" "),
      tx: Math.cos(dir) * dist,
      ty: Math.sin(dir) * dist + 200,
      rot: (rng() - 0.5) * 480,
      fill: rng() < 0.5 ? "rgba(220,236,255,0.85)" : "rgba(190,220,255,0.7)",
      delay: rng() * 0.1,
    });
  }
  return shards;
}

function buildFrostBlades(rng: () => number, count = 10) {
  return Array.from({ length: count }, () => ({
    x: rng() * 100,
    y: rng() * 100,
    s: 0.5 + rng() * 0.9,
    r: rng() * 360,
    d: rng() * 0.25,
  }));
}

function randomPoint(): Pt {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    x: w * 0.2 + Math.random() * w * 0.6,
    y: h * 0.22 + Math.random() * h * 0.55,
  };
}

export default function FreezeBreakOverlay() {
  const { state, reset } = usePortal();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("frost");
  const [impactKey, setImpactKey] = useState(0);
  const [points, setPoints] = useState<{ tap: Pt; main: Pt }>({
    tap: { x: 0, y: 0 },
    main: { x: 0, y: 0 },
  });
  const navigatedRef = useRef(false);
  const shakeRef = useRef<HTMLDivElement>(null);

  const seed = useMemo(() => Math.floor(Math.random() * 1e9) + impactKey, [impactKey]);
  const mainCracks = useMemo(() => buildCracks(mulberry32(seed), 1), [seed]);
  const tapCracks = useMemo(() => buildCracks(mulberry32(seed + 7), 0.5), [seed]);
  const shards = useMemo(() => buildShards(mulberry32(seed + 1)), [seed]);
  const blades = useMemo(() => buildFrostBlades(mulberry32(seed + 2)), [seed]);

  const active = state.phase === "active";

  // Pick fresh random points + reseed every trigger
  useEffect(() => {
    if (!active) return;
    setPoints({ tap: randomPoint(), main: randomPoint() });
    setImpactKey((k) => k + 1);
  }, [active]);

  // Mark the document so the underlying page can be hidden via CSS.
  useEffect(() => {
    const el = document.documentElement;
    if (active) el.classList.add("portal-active");
    else el.classList.remove("portal-active");
    return () => el.classList.remove("portal-active");
  }, [active]);

  // Phase machine + audio cues + navigation
  useEffect(() => {
    if (!active) {
      setPhase("frost");
      navigatedRef.current = false;
      return;
    }

    let cancelled = false;
    let navTimer: ReturnType<typeof setTimeout> | undefined;

    const run = async () => {
      const wait = (ms: number) =>
        new Promise<void>((res) => setTimeout(res, ms));

      setPhase("frost");
      playFrost();

      // Navigate early during frost — by the time impact/shatter hits,
      // the new page is fully mounted behind the opaque overlay. No
      // reconcile work fighting the heavy frames.
      navTimer = setTimeout(() => {
        if (cancelled || navigatedRef.current) return;
        navigatedRef.current = true;
        const dest = state.target === "creator" ? "/creator" : "/";
        router.push(dest);
      }, NAV_OFFSET);

      await wait(T.frost);
      if (cancelled) return;

      setPhase("prehit");
      playIceTap();
      shake(shakeRef.current, "soft");
      await wait(T.prehit);
      if (cancelled) return;

      setPhase("swing");
      await wait(T.swing);
      if (cancelled) return;

      setPhase("impact");
      playIceShatter();
      shake(shakeRef.current, "hard");
      await wait(T.impact);
      if (cancelled) return;

      setPhase("shatter");
      await wait(T.shatter);
      if (cancelled) return;

      setPhase("settle");
      await wait(T.settle);
      if (cancelled) return;

      setPhase("done");
      reset();
    };

    run();
    return () => {
      cancelled = true;
      if (navTimer) clearTimeout(navTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, impactKey]);

  if (!active) return null;

  const hammerPose = (() => {
    switch (phase) {
      case "frost":
        return { x: -300, y: -300, r: -100, opacity: 0 };
      case "prehit":
        return { x: points.tap.x - 120, y: points.tap.y - 240, r: 14, opacity: 1 };
      case "swing":
        return { x: points.main.x - 120, y: points.main.y - 380, r: -28, opacity: 1 };
      case "impact":
        return { x: points.main.x - 120, y: points.main.y - 240, r: 18, opacity: 1 };
      case "shatter":
      case "settle":
        return { x: points.main.x - 120, y: points.main.y - 240, r: 18, opacity: 0 };
      default:
        return { x: -300, y: -300, r: -100, opacity: 0 };
    }
  })();

  const frostVisible =
    phase === "frost" ||
    phase === "prehit" ||
    phase === "swing" ||
    phase === "impact";

  return (
    <div
      className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Internal shake wrapper — replaces body shake. Body transform
          would re-position every position:fixed element on the page, which
          is the single biggest cause of per-frame compositing cost. */}
      <div ref={shakeRef} className="absolute inset-0">
        {/* ── FROST — fully opaque, snaps in fast.
            Underlying page is hidden via .portal-active css, so we don't
            need any transparency. Instant solid frost = zero paint cost
            for occluded content. */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: frostVisible ? 1 : 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #dde9f7 0%, #b8d0eb 60%, #91b6dc 100%)",
          }}
        />

        {/* Frost crystals */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: frostVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {blades.map((b, i) => (
            <motion.g
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: b.s, opacity: 0.85 }}
              transition={{ duration: 0.45, delay: b.d }}
              style={{ transformOrigin: `${b.x}% ${b.y}%` }}
            >
              <g transform={`translate(${b.x} ${b.y}) rotate(${b.r})`}>
                <path
                  d="M 0 -2.4 L 0.6 -0.6 L 2.4 0 L 0.6 0.6 L 0 2.4 L -0.6 0.6 L -2.4 0 L -0.6 -0.6 Z"
                  fill="rgba(255,255,255,0.85)"
                  stroke="rgba(180,220,255,0.9)"
                  strokeWidth="0.12"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            </motion.g>
          ))}
        </motion.svg>

        {/* Edge vignette (cheap) */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: frostVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(230,240,255,0.3) 70%, #b8d0eb 100%)",
          }}
        />

        {/* ── HAMMER (transform-only, NO drop-shadow filter) ── */}
        <motion.div
          className="absolute top-0 left-0"
          animate={{
            x: hammerPose.x,
            y: hammerPose.y,
            rotate: hammerPose.r,
            opacity: hammerPose.opacity,
          }}
          transition={{
            duration:
              phase === "swing"
                ? 0.32
                : phase === "impact"
                ? 0.08
                : phase === "frost"
                ? 0.18
                : 0.26,
            ease:
              phase === "swing"
                ? [0.18, 0.6, 0.32, 1]
                : phase === "impact"
                ? "easeOut"
                : "easeOut",
          }}
          style={{
            width: 240,
            height: 360,
            transformOrigin: "50% 95%",
          }}
        >
          <Hammer className="w-full h-full" />
        </motion.div>

        {/* ── TAP CRACK (NO drop-shadow filter) ── */}
        <AnimatePresence>
          {(phase === "prehit" || phase === "swing" || phase === "impact" || phase === "shatter") && (
            <motion.svg
              key="tap"
              className="absolute pointer-events-none"
              width={600}
              height={600}
              style={{
                left: 0,
                top: 0,
                transform: `translate3d(${points.tap.x - 300}px, ${points.tap.y - 300}px, 0)`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity:
                  phase === "prehit"
                    ? 0.95
                    : phase === "swing"
                    ? 0.7
                    : phase === "impact"
                    ? 0.5
                    : 0.3,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <g transform="translate(300,300)">
                <motion.circle
                  r="3"
                  fill="#fff"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 10, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
                {tapCracks.map((c, i) => (
                  <motion.path
                    key={i}
                    d={c.d}
                    stroke="#ffffff"
                    strokeWidth={c.w}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                  />
                ))}
                {tapCracks.map((c, i) => (
                  <motion.path
                    key={`d-${i}`}
                    d={c.d}
                    stroke="rgba(20,30,55,0.7)"
                    strokeWidth={Math.max(0.3, c.w - 0.8)}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                  />
                ))}
              </g>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* ── IMPACT FLASH ── */}
        <AnimatePresence>
          {phase === "impact" && (
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-white"
            />
          )}
        </AnimatePresence>

        {/* ── SHOCKWAVE (SVG circle, no box-shadow) ── */}
        <AnimatePresence>
          {(phase === "impact" || phase === "shatter") && (
            <motion.svg
              key="shock"
              className="absolute pointer-events-none"
              width={1200}
              height={1200}
              style={{
                left: 0,
                top: 0,
                transform: `translate3d(${points.main.x - 600}px, ${points.main.y - 600}px, 0)`,
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.circle
                cx={600}
                cy={600}
                r={10}
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={3}
                initial={{ scale: 0 }}
                animate={{ scale: 55 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ transformOrigin: "600px 600px" }}
              />
              <motion.circle
                cx={600}
                cy={600}
                r={10}
                fill="none"
                stroke="rgba(200,225,255,0.5)"
                strokeWidth={1.5}
                initial={{ scale: 0 }}
                animate={{ scale: 70 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.04 }}
                style={{ transformOrigin: "600px 600px" }}
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* ── MAIN CRACKS (NO drop-shadow filter) ── */}
        <AnimatePresence>
          {(phase === "impact" || phase === "shatter" || phase === "settle") && (
            <svg
              key="cracks"
              className="absolute pointer-events-none"
              width={1200}
              height={1200}
              style={{
                left: 0,
                top: 0,
                transform: `translate3d(${points.main.x - 600}px, ${points.main.y - 600}px, 0)`,
              }}
            >
              <g transform="translate(600,600)">
                {mainCracks.map((c, i) => (
                  <motion.path
                    key={i}
                    d={c.d}
                    stroke="#ffffff"
                    strokeWidth={c.w}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.34, ease: "easeOut" }}
                  />
                ))}
                {mainCracks.map((c, i) => (
                  <motion.path
                    key={`d-${i}`}
                    d={c.d}
                    stroke="rgba(20,30,55,0.7)"
                    strokeWidth={Math.max(0.4, c.w - 1.2)}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.34, ease: "easeOut" }}
                  />
                ))}
              </g>
            </svg>
          )}
        </AnimatePresence>

        {/* ── SHARDS (count reduced 22 → 16) ── */}
        <AnimatePresence>
          {(phase === "shatter" || phase === "settle") && (
            <svg
              key="shards"
              className="absolute pointer-events-none"
              width={2000}
              height={2000}
              style={{
                left: 0,
                top: 0,
                transform: `translate3d(${points.main.x - 1000}px, ${points.main.y - 1000}px, 0)`,
              }}
            >
              <g transform="translate(1000,1000)">
                {shards.map((s, i) => (
                  <motion.polygon
                    key={i}
                    points={s.points}
                    fill={s.fill}
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="0.6"
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
                    animate={{
                      x: s.tx,
                      y: s.ty,
                      rotate: s.rot,
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: s.delay,
                      ease: [0.2, 0.7, 0.4, 1],
                      times: [0, 0.1, 0.7, 1],
                    }}
                    style={{ originX: "50%", originY: "50%" }}
                  />
                ))}
              </g>
            </svg>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// One-shot shake applied to an internal overlay div (NOT body), so it
// doesn't break position:fixed anywhere else on the page.
function shake(el: HTMLDivElement | null, kind: "soft" | "hard") {
  if (!el) return;
  const cls = kind === "soft" ? "portal-shake-soft" : "portal-shake";
  el.classList.remove(cls);
  // force reflow so the animation re-triggers if called twice quickly
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 650);
}
