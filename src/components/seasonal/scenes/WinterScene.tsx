"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleCanvas, {
  type FrameCtx,
} from "@/components/seasonal/ParticleCanvas";
import {
  depositAt,
  drawPile,
  makeColumns,
  pileHeightAt,
  resampleColumns,
} from "@/components/seasonal/effects/SnowAccumulation";
import Mascot from "@/components/seasonal/mascot/Mascot";
import WinterCostume from "@/components/seasonal/mascot/costumes/WinterCostume";
import { useUI } from "@/components/theme/ThemeProvider";

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  speed: number;
  alpha: number;
};

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

function makeFlake(width: number, fromTop = false): Flake {
  return {
    x: Math.random() * width,
    y: fromTop ? -10 - Math.random() * 60 : Math.random() * 200 - 200,
    r: 0.8 + Math.random() * 2.4,
    vy: 0.3 + Math.random() * 0.7,
    drift: 0.3 + Math.random() * 0.9,
    phase: Math.random() * Math.PI * 2,
    speed: 0.0008 + Math.random() * 0.0014,
    alpha: 0.5 + Math.random() * 0.5,
  };
}

export default function WinterScene() {
  const flakesRef = useRef<Flake[]>([]);
  const columnsRef = useRef<Float32Array | null>(null);
  const { shellOpen } = useUI();
  const [breathKey, setBreathKey] = useState(0);

  // Periodic breath puff (every 3.2s) while in winter scene
  useEffect(() => {
    const id = setInterval(() => setBreathKey((k) => k + 1), 3200);
    return () => clearInterval(id);
  }, []);

  function init({ width }: FrameCtx) {
    const count = isMobile() ? 40 : 80;
    flakesRef.current = Array.from({ length: count }, () => makeFlake(width));
    columnsRef.current = makeColumns(width);
  }

  function onResize({ width }: FrameCtx) {
    if (!columnsRef.current) {
      columnsRef.current = makeColumns(width);
    } else {
      columnsRef.current = resampleColumns(columnsRef.current, width);
    }
    const target = isMobile() ? 40 : 80;
    const cur = flakesRef.current.length;
    if (cur < target) {
      for (let i = 0; i < target - cur; i++) {
        flakesRef.current.push(makeFlake(width, true));
      }
    } else if (cur > target) {
      flakesRef.current.length = target;
    }
  }

  function draw({ ctx, width, height, dt, t }: FrameCtx) {
    if (!columnsRef.current) columnsRef.current = makeColumns(width);
    const columns = columnsRef.current;

    ctx.clearRect(0, 0, width, height);

    // Pile gradient
    const grad = ctx.createLinearGradient(0, height - 100, 0, height);
    grad.addColorStop(0, "rgba(220, 235, 255, 0)");
    grad.addColorStop(0.4, "rgba(232, 240, 255, 0.55)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0.85)");
    drawPile(ctx, columns, width, height, grad);

    const wind = Math.sin(t * 0.0002) * 0.3;
    const flakes = flakesRef.current;
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.phase += f.speed * dt;
      f.x += Math.sin(f.phase) * f.drift * 0.6 + wind;
      f.y += f.vy * (dt / 16.67);

      if (f.x < -10) f.x = width + 10;
      else if (f.x > width + 10) f.x = -10;

      const groundY = height - pileHeightAt(columns, f.x) - f.r;
      if (f.y >= groundY) {
        depositAt(columns, f.x);
        flakes[i] = makeFlake(width, true);
        continue;
      }

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
      ctx.fill();
    }
  }

  return (
    <>
      <ParticleCanvas init={init} draw={draw} onResize={onResize} />
      {!shellOpen && (
        <Mascot
          state="shiver"
          costume={<WinterCostume />}
          overlay={
            <AnimatePresence mode="wait">
              <motion.div
                key={breathKey}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                animate={{ opacity: [0, 0.7, 0], x: 28, y: -12, scale: 1.6 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                className="absolute -top-1 right-2 w-3 h-3 rounded-full bg-white/80 pointer-events-none"
                style={{ filter: "blur(2px)" }}
                aria-hidden="true"
              />
            </AnimatePresence>
          }
        />
      )}
    </>
  );
}
