"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CREATOR } from "@/lib/creator";
import { usePortal } from "@/components/portal/PortalProvider";

export default function CreatorHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), {
    stiffness: 120,
    damping: 14,
  });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), {
    stiffness: 120,
    damping: 14,
  });
  const glowX = useTransform(mx, [-1, 1], ["20%", "80%"]);
  const glowY = useTransform(my, [-1, 1], ["20%", "80%"]);
  const cardGlow = useTransform(
    [glowX, glowY],
    ([x, y]: string[]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,215,120,0.35), transparent 60%)`
  );
  const [hp, setHp] = useState(0);
  const [mp, setMp] = useState(0);
  const [xp, setXp] = useState(0);
  const { isActive: portalActive } = usePortal();

  useEffect(() => {
    const t1 = setTimeout(() => setHp(94), 250);
    const t2 = setTimeout(() => setMp(78), 450);
    const t3 = setTimeout(() => setXp(63), 650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  function onMove(e: React.MouseEvent) {
    if (portalActive) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  // Snap the card flat the moment the portal triggers — no springs running
  // in the background while the freeze/break overlay needs every frame.
  useEffect(() => {
    if (portalActive) {
      mx.set(0);
      my.set(0);
    }
  }, [portalActive, mx, my]);

  return (
    <section className="relative pt-24 pb-16 px-4 max-w-6xl mx-auto">
      {/* Top scrolling marquee */}
      <div className="overflow-hidden border-y border-[color:var(--c-border)] py-1.5 mb-10 bg-black/40">
        <div
          className="flex whitespace-nowrap text-xs tracking-[0.3em] text-[color:var(--c-gold)] creator-stamp"
          style={{ animation: "scroll-marquee 28s linear infinite", width: "max-content" }}
        >
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {[
                "⚔️ NIHONKRATOS",
                "● LIVE ON TWITCH",
                "▶ NEW ON YOUTUBE",
                "❄ POWDER LOG",
                "✺ NIHON × KRATOS",
                "⌬ CREATOR MODE",
                "✸ STORY-DRIVEN RUNS",
              ].map((t) => (
                <span key={t + k} className="px-8">
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_360px] gap-10 items-center">
        {/* LEFT: name, motto, stats */}
        <div>
          <p className="text-[color:var(--c-gold)] creator-stamp text-xs mb-3">
            ▸ Player_01 // online
          </p>
          <h1 className="font-black leading-[0.9] tracking-tight">
            <span
              className="block text-[color:var(--c-red-bright)] glow-red"
              style={{ fontSize: "clamp(3.2rem, 11vw, 7.5rem)" }}
            >
              NIHON
            </span>
            <span
              className="block text-[color:var(--c-gold-bright)] glow-gold -mt-2"
              style={{ fontSize: "clamp(3.2rem, 11vw, 7.5rem)" }}
            >
              kRATOS
            </span>
          </h1>

          <p className="mt-4 text-[color:var(--c-ink)]/80 max-w-md">
            {CREATOR.motto}
          </p>
          <p className="mt-1 text-[color:var(--c-gold)]/80 text-sm">
            {CREATOR.tagline}
          </p>

          {/* Stat bars — RPG style */}
          <div className="mt-8 space-y-2.5 max-w-md">
            <StatBar label="HP" sub="Hype" color="var(--c-red-bright)" value={hp} />
            <StatBar label="MP" sub="Momentum" color="var(--c-gold-bright)" value={mp} />
            <StatBar label="XP" sub="Mountain Days" color="var(--c-sky)" value={xp} />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <Badge label="CLASS" value="Samurai-Streamer" />
            <Badge label="RANK" value="A+" />
            <Badge label="ELEMENT" value="Snow / Sword" />
            <Badge label="LANGS" value="EN · ES · HI · JP·N5" />
          </div>
        </div>

        {/* RIGHT: tilting avatar card */}
        <div
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative mx-auto"
          style={{ width: 320, height: 460, perspective: 1000 }}
        >
          <motion.div
            className="absolute inset-0 rounded-sm border-2 border-[color:var(--c-gold)]/70"
            style={{
              rotateX: rx,
              rotateY: ry,
              transformStyle: "preserve-3d",
              background:
                "linear-gradient(140deg, #1d0a0a 0%, #2c1208 45%, #1a0608 100%)",
              boxShadow:
                "0 30px 80px rgba(214,40,40,0.25), 0 0 0 1px rgba(212,163,71,0.4) inset",
            }}
          >
            {/* Card holo glow follows cursor */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-sm"
              style={{
                background: cardGlow,
                mixBlendMode: "screen",
              }}
            />

            {/* Avatar image (fallback gradient if file missing) */}
            <div
              className="absolute inset-3 rounded-sm overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, #5a1a1a 0%, #2a0a0a 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CREATOR.avatar}
                alt="NihonkRatos avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Scanline tint */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 4px)",
                }}
              />
            </div>

            {/* Corner brackets */}
            <Corner pos="tl" />
            <Corner pos="tr" />
            <Corner pos="bl" />
            <Corner pos="br" />

            {/* Header tag */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] creator-stamp text-[color:var(--c-gold)]">
              <span>{"// ID 0428"}</span>
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--c-red-bright)]"
                  style={{ animation: "pulse-live 1.3s ease-in-out infinite" }}
                />
                LIVE
              </span>
            </div>

            {/* Footer tag */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] creator-stamp text-[color:var(--c-gold)]/90">
              <span>{CREATOR.handle.toUpperCase()}</span>
              <span>S/N · ZORO-LUFFY</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatBar({
  label,
  sub,
  color,
  value,
}: {
  label: string;
  sub: string;
  color: string;
  value: number;
}) {
  return (
    <div className="grid grid-cols-[40px_70px_1fr_42px] items-center gap-3 text-xs creator-stamp">
      <span className="text-[color:var(--c-gold)]">{label}</span>
      <span className="text-[color:var(--c-ink)]/60 normal-case text-[10px]">
        {sub}
      </span>
      <div className="relative h-2.5 bg-black/60 border border-[color:var(--c-border)] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color} 0%, ${color}aa 100%)`,
            boxShadow: `0 0 12px ${color}88`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0 2px, transparent 2px 6px)",
          }}
        />
      </div>
      <span className="text-[color:var(--c-ink)] tabular-nums">{value}%</span>
    </div>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 border border-[color:var(--c-border)] bg-black/40 px-2 py-1 text-[10px] creator-stamp">
      <span className="text-[color:var(--c-gold)]">{label}</span>
      <span className="text-[color:var(--c-ink)]">{value}</span>
    </span>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base =
    "absolute w-5 h-5 border-[color:var(--c-gold)] pointer-events-none";
  const map: Record<typeof pos, string> = {
    tl: "top-0 left-0 border-t-2 border-l-2",
    tr: "top-0 right-0 border-t-2 border-r-2",
    bl: "bottom-0 left-0 border-b-2 border-l-2",
    br: "bottom-0 right-0 border-b-2 border-r-2",
  };
  return <div className={`${base} ${map[pos]}`} />;
}
