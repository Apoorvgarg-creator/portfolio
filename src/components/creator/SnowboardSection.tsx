"use client";

import { useEffect, useRef, useState } from "react";
import { SNOW_TRICKS, SNOW_LOG } from "@/lib/creator";
import { usePortal } from "@/components/portal/PortalProvider";

const W = 800;
const H = 400;

type Rider = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
};

type TrailPt = { x: number; y: number; a: number };

type Flake = { x: number; y: number; vx: number; vy: number; r: number; a: number };

export default function SnowboardSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const steeringRef = useRef(false);
  const [hud, setHud] = useState({ speed: 0, mode: "AUTO-CARVE" });
  const { isActive: portalActive } = usePortal();
  const portalActiveRef = useRef(portalActive);
  useEffect(() => {
    portalActiveRef.current = portalActive;
  }, [portalActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const rider: Rider = { x: 100, y: 240, vx: 0, vy: 0, angle: 0 };
    const trail: TrailPt[] = [];
    const flakes: Flake[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: -8 + Math.random() * 16,
      vy: 18 + Math.random() * 30,
      r: 0.6 + Math.random() * 1.6,
      a: 0.4 + Math.random() * 0.5,
    }));

    let last = performance.now();
    let raf = 0;
    let hudAccum = 0;

    const loop = (now: number) => {
      // Pause expensive sim/draw while the portal transition is animating —
      // smooth frames for the freeze/break overlay > snowboard fidelity.
      if (portalActiveRef.current) {
        last = now;
        raf = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // ── target: cursor when steering, else a smooth sine path
      let tx: number;
      let ty: number;
      if (steeringRef.current && targetRef.current) {
        tx = targetRef.current.x;
        ty = targetRef.current.y;
      } else {
        const t = now / 1000;
        tx = W / 2 + Math.sin(t * 0.45) * (W * 0.4);
        ty = 230 + Math.sin(t * 0.9) * 38;
      }

      // ── spring follow toward target, dt-normalised
      const k = 8;     // spring stiffness
      const d = 4.5;   // damping
      const ax = (tx - rider.x) * k - rider.vx * d;
      const ay = (ty - rider.y) * k - rider.vy * d;
      rider.vx += ax * dt;
      rider.vy += ay * dt;
      // cap velocity so a far cursor doesn't make it snap
      const maxV = 520;
      const vmag = Math.hypot(rider.vx, rider.vy);
      if (vmag > maxV) {
        rider.vx = (rider.vx / vmag) * maxV;
        rider.vy = (rider.vy / vmag) * maxV;
      }
      rider.x += rider.vx * dt;
      rider.y += rider.vy * dt;

      // clamp to canvas (no teleport)
      if (rider.x < 30) {
        rider.x = 30;
        rider.vx = Math.abs(rider.vx) * 0.4;
      }
      if (rider.x > W - 30) {
        rider.x = W - 30;
        rider.vx = -Math.abs(rider.vx) * 0.4;
      }
      if (rider.y < 30) {
        rider.y = 30;
        rider.vy = Math.abs(rider.vy) * 0.4;
      }
      if (rider.y > H - 30) {
        rider.y = H - 30;
        rider.vy = -Math.abs(rider.vy) * 0.4;
      }

      rider.angle = Math.atan2(rider.vy, rider.vx) * (180 / Math.PI);
      const clampedAngle = Math.max(-22, Math.min(22, rider.angle));

      // ── trail
      trail.push({ x: rider.x, y: rider.y + 10, a: 1 });
      if (trail.length > 50) trail.shift();
      for (let i = 0; i < trail.length; i++) {
        trail[i].a -= dt * 0.55;
      }
      while (trail.length && trail[0].a <= 0) trail.shift();

      // ── snow
      for (const f of flakes) {
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        if (f.y > H + 4) {
          f.y = -4;
          f.x = Math.random() * W;
        }
        if (f.x < -4) f.x = W + 4;
        if (f.x > W + 4) f.x = -4;
      }

      // ── DRAW ───────────────────────────────
      ctx.clearRect(0, 0, W, H);

      // trail
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      for (let i = 1; i < trail.length; i++) {
        const p0 = trail[i - 1];
        const p1 = trail[i];
        ctx.globalAlpha = p1.a * 0.55;
        ctx.lineWidth = 2 + i * 0.05;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // snowflakes
      ctx.fillStyle = "#ffffff";
      for (const f of flakes) {
        ctx.globalAlpha = f.a;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // rider
      ctx.save();
      ctx.translate(rider.x, rider.y);
      ctx.rotate((clampedAngle * Math.PI) / 180);
      // board
      ctx.fillStyle = "#d62828";
      ctx.fillRect(-22, 6, 44, 5);
      ctx.strokeStyle = "#ffd16a";
      ctx.lineWidth = 0.8;
      ctx.strokeRect(-22, 6, 44, 5);
      // legs
      ctx.strokeStyle = "#1a1a22";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-8, 6); ctx.lineTo(-6, -6);
      ctx.moveTo(8, 6);  ctx.lineTo(6, -6);
      ctx.stroke();
      // coat (red)
      ctx.fillStyle = "#d62828";
      ctx.beginPath();
      ctx.moveTo(-7, -6); ctx.lineTo(7, -6); ctx.lineTo(9, -16); ctx.lineTo(-9, -16); ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#5a0d0d";
      ctx.lineWidth = 0.6;
      ctx.stroke();
      // helmet
      ctx.fillStyle = "#0e1a25";
      ctx.beginPath();
      ctx.arc(0, -22, 6, 0, Math.PI * 2);
      ctx.fill();
      // gold goggles
      ctx.fillStyle = "#ffd16a";
      ctx.fillRect(-6, -25, 12, 3);
      // arm
      ctx.strokeStyle = "#1a1a22";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(4, -12); ctx.lineTo(14, -6);
      ctx.stroke();
      ctx.restore();

      // ── HUD update (throttled) ───────────
      hudAccum += dt;
      if (hudAccum > 0.25) {
        hudAccum = 0;
        const speed = Math.min(99, Math.round(Math.hypot(rider.vx, rider.vy) * 0.18));
        setHud({ speed, mode: steeringRef.current ? "PLAYER STEER" : "AUTO-CARVE" });
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    // ── cursor handlers
    const wrap = wrapRef.current;
    const onMove = (e: MouseEvent) => {
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * W;
      const y = ((e.clientY - r.top) / r.height) * H;
      targetRef.current = { x, y };
      steeringRef.current = true;
    };
    const onLeave = () => {
      steeringRef.current = false;
    };
    wrap?.addEventListener("mousemove", onMove);
    wrap?.addEventListener("mouseleave", onLeave);

    // Pause when tab is hidden — saves battery & avoids jump on resume
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      wrap?.removeEventListener("mousemove", onMove);
      wrap?.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section className="relative px-4 py-20 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[color:var(--c-sky)] creator-stamp text-xs glow-gold">
          {"// ch.2 — snow chapters"}
        </span>
        <span className="flex-1 h-px bg-gradient-to-r from-[color:var(--c-sky)] via-[color:var(--c-sky)]/30 to-transparent" />
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
        {/* Mountain canvas */}
        <div
          ref={wrapRef}
          className="relative w-full border border-[color:var(--c-border)] rounded-sm overflow-hidden cursor-crosshair select-none"
          style={{
            aspectRatio: `${W} / ${H}`,
            background:
              "linear-gradient(180deg, #0d1830 0%, #1d2a4d 35%, #324863 70%, #4a6b85 100%)",
          }}
        >
          {/* Static mountain illustration (rendered once) */}
          <StaticMountains />

          {/* Animation canvas (rider + trail + snow) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ width: "100%", height: "100%" }}
            aria-hidden="true"
          />

          {/* HUD overlays */}
          <div className="absolute top-3 left-3 text-[10px] creator-stamp text-white/85 bg-black/40 px-2 py-1">
            SPEED · {hud.speed} km/h
          </div>
          <div className="absolute top-3 right-3 text-[10px] creator-stamp bg-black/40 px-2 py-1 text-white/85">
            {hud.mode}
          </div>
          <div className="absolute bottom-3 left-3 text-[10px] creator-stamp text-white/80 bg-black/40 px-2 py-1">
            ↳ move your cursor to steer · leave to auto-carve
          </div>
        </div>

        {/* Trick list */}
        <div className="border border-[color:var(--c-border)] bg-black/55 p-5 rounded-sm">
          <div className="creator-stamp text-[color:var(--c-gold)] text-xs mb-3">
            {"// trick tree"}
          </div>
          <ul className="space-y-2 text-sm">
            {SNOW_TRICKS.map((t) => (
              <li key={t.name} className="flex items-center justify-between gap-3">
                <span className="text-[color:var(--c-ink)]/90">{t.name}</span>
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="inline-block w-2 h-2 rotate-45"
                      style={{
                        background:
                          i < t.difficulty
                            ? "var(--c-gold-bright)"
                            : "transparent",
                        border: "1px solid var(--c-gold)",
                        boxShadow:
                          i < t.difficulty
                            ? "0 0 6px var(--c-gold-bright)"
                            : "none",
                      }}
                    />
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 creator-stamp text-[color:var(--c-sky)] text-xs mb-3">
            {"// mountain log"}
          </div>
          <ul className="space-y-2 text-xs">
            {SNOW_LOG.map((m) => (
              <li key={m.mountain} className="grid grid-cols-[1fr_auto] gap-2 items-baseline">
                <div>
                  <span className="text-[color:var(--c-ink)] font-bold">{m.mountain}</span>
                  <span className="text-[color:var(--c-ink)]/50 ml-2">{m.country}</span>
                  <div className="text-[color:var(--c-ink)]/60 text-[11px] italic">{m.vibe}</div>
                </div>
                <span className="text-[color:var(--c-gold)] creator-stamp">
                  {m.days}d
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-4">
        <Stat label="Total powder days" value="120+" />
        <Stat label="Countries ridden" value="4" />
        <Stat label="Hardest sent" value="BS Rodeo 540" />
      </div>
    </section>
  );
}

function StaticMountains() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="m-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a5070" />
          <stop offset="1" stopColor="#22324c" />
        </linearGradient>
        <linearGradient id="m-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a7a99" />
          <stop offset="1" stopColor="#2a3b58" />
        </linearGradient>
        <linearGradient id="m-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8f1ff" />
          <stop offset="0.4" stopColor="#bcd1e8" />
          <stop offset="1" stopColor="#46618a" />
        </linearGradient>
        <radialGradient id="moon" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff5d4" />
          <stop offset="1" stopColor="#ffd16a" />
        </radialGradient>
      </defs>

      <circle cx="660" cy="80" r="44" fill="url(#moon)" opacity="0.95" />
      <circle cx="660" cy="80" r="80" fill="#fff5d4" opacity="0.08" />

      <path d="M 0 230 L 60 180 L 130 210 L 200 150 L 280 200 L 360 160 L 450 210 L 540 170 L 640 200 L 740 180 L 800 220 L 800 400 L 0 400 Z" fill="url(#m-far)" />
      <path d="M 0 290 L 80 240 L 160 280 L 240 230 L 340 270 L 440 240 L 540 280 L 660 230 L 760 270 L 800 270 L 800 400 L 0 400 Z" fill="url(#m-mid)" />
      <path d="M 0 320 C 140 280, 260 360, 400 320 S 660 280, 800 360 L 800 400 L 0 400 Z" fill="url(#m-near)" />

      {Array.from({ length: 16 }).map((_, i) => {
        const x = (i * 53 + 30) % 800;
        const slopeY = 300 + Math.sin(x * 0.011) * 28;
        const h = 18 + ((i * 7) % 14);
        return (
          <g key={i} transform={`translate(${x} ${slopeY - h})`} opacity="0.85">
            <path d={`M 0 0 L -${h * 0.35} ${h} L ${h * 0.35} ${h} Z`} fill="#0e1a25" />
            <path d={`M 0 -${h * 0.3} L -${h * 0.45} ${h * 0.7} L ${h * 0.45} ${h * 0.7} Z`} fill="#102232" />
          </g>
        );
      })}

      <path d="M 0 220 C 120 180, 220 280, 360 240 S 620 170, 800 280" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" strokeDasharray="4 6" />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[color:var(--c-border)] bg-black/55 p-4">
      <div className="creator-stamp text-[10px] text-[color:var(--c-gold)] mb-1">
        {label}
      </div>
      <div className="text-2xl text-[color:var(--c-ink)] font-bold">
        {value}
      </div>
    </div>
  );
}
