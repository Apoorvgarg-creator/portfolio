"use client";

import { useEffect, useRef, useState } from "react";
import ParticleCanvas, {
  type FrameCtx,
} from "@/components/seasonal/ParticleCanvas";
import Mascot from "@/components/seasonal/mascot/Mascot";
import SpringCostume from "@/components/seasonal/mascot/costumes/SpringCostume";
import Butterflies from "@/components/seasonal/effects/Butterflies";
import PlantBloom, {
  type PlantStage,
} from "@/components/seasonal/effects/PlantBloom";
import type { MascotState } from "@/components/seasonal/mascot/poses";
import { useUI } from "@/components/theme/ThemeProvider";

type Petal = {
  x: number;
  y: number;
  vy: number;
  drift: number;
  phase: number;
  speed: number;
  rot: number;
  rotSpeed: number;
  scale: number;
  hue: number;
};

const PETAL_COLORS = ["#ffb6cc", "#ff8fb1", "#ffd2e0", "#ffe5ee", "#fcd0e0"];

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

function makePetal(width: number, fromTop = false): Petal {
  return {
    x: Math.random() * width,
    y: fromTop ? -20 - Math.random() * 60 : Math.random() * 200 - 200,
    vy: 0.25 + Math.random() * 0.45,
    drift: 1.0 + Math.random() * 1.6,
    phase: Math.random() * Math.PI * 2,
    speed: 0.0008 + Math.random() * 0.0014,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.003,
    scale: 0.6 + Math.random() * 0.6,
    hue: Math.random(),
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.scale(p.scale, p.scale);
  ctx.beginPath();
  // Rounded petal shape (almond)
  ctx.moveTo(0, -6);
  ctx.bezierCurveTo(5, -4, 5, 4, 0, 6);
  ctx.bezierCurveTo(-5, 4, -5, -4, 0, -6);
  ctx.closePath();
  ctx.fillStyle = PETAL_COLORS[Math.floor(p.hue * PETAL_COLORS.length)];
  ctx.fill();
  ctx.strokeStyle = "rgba(180,80,110,0.35)";
  ctx.lineWidth = 0.6;
  ctx.stroke();
  ctx.restore();
}

export default function SpringScene() {
  const petalsRef = useRef<Petal[]>([]);
  const [mascotState, setMascotState] = useState<MascotState>("water");
  const [plantStage, setPlantStage] = useState<PlantStage>(0);
  const [droplets, setDroplets] = useState<{ id: number; t: number }[]>([]);
  const dropletIdRef = useRef(0);
  const { shellOpen } = useUI();

  // Plant grows ~every 18s
  useEffect(() => {
    const id = setInterval(() => {
      setPlantStage((s) => (s < 3 ? ((s + 1) as PlantStage) : 0));
    }, 18000);
    return () => clearInterval(id);
  }, []);

  // Watering droplets every 1.2s while in `water` state
  useEffect(() => {
    if (mascotState !== "water") return;
    const id = setInterval(() => {
      const newId = ++dropletIdRef.current;
      setDroplets((d) => [...d, { id: newId, t: Date.now() }]);
      window.setTimeout(() => {
        setDroplets((d) => d.filter((x) => x.id !== newId));
      }, 1200);
    }, 1100);
    return () => clearInterval(id);
  }, [mascotState]);

  // Occasional butterfly chase
  useEffect(() => {
    function scheduleNext() {
      const wait = 12000 + Math.random() * 14000;
      return window.setTimeout(() => {
        setMascotState("chase");
        window.setTimeout(() => setMascotState("water"), 4000);
        scheduleNext();
      }, wait);
    }
    const id = scheduleNext();
    return () => clearTimeout(id);
  }, []);

  function init({ width }: FrameCtx) {
    const count = isMobile() ? 15 : 30;
    petalsRef.current = Array.from({ length: count }, () => makePetal(width));
  }

  function onResize({ width }: FrameCtx) {
    const target = isMobile() ? 15 : 30;
    const cur = petalsRef.current.length;
    if (cur < target) {
      for (let i = 0; i < target - cur; i++) {
        petalsRef.current.push(makePetal(width, true));
      }
    } else if (cur > target) {
      petalsRef.current.length = target;
    }
  }

  function draw({ ctx, width, height, dt, t }: FrameCtx) {
    ctx.clearRect(0, 0, width, height);

    const wind = Math.sin(t * 0.0003) * 0.4;
    const petals = petalsRef.current;
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.phase += p.speed * dt;
      p.x += Math.sin(p.phase) * p.drift + wind;
      p.y += p.vy * (dt / 16.67);
      p.rot += p.rotSpeed * dt;

      if (p.x < -20) p.x = width + 20;
      else if (p.x > width + 20) p.x = -20;

      if (p.y > height + 20) {
        petals[i] = makePetal(width, true);
        continue;
      }

      drawPetal(ctx, p);
    }
  }

  return (
    <>
      <ParticleCanvas init={init} draw={draw} onResize={onResize} />
      <Butterflies />
      {!shellOpen && (
        <Mascot
          state={mascotState}
          costume={<SpringCostume />}
          overlay={
            <>
              <PlantBloom stage={plantStage} />
              {/* Watering droplets emit from right arm toward plant */}
              {droplets.map((d) => (
                <span
                  key={d.id}
                  className="absolute w-1.5 h-2 rounded-full bg-sky-300/80 pointer-events-none animate-water-drop"
                  style={{
                    right: -4,
                    bottom: 60,
                    animation: "water-drop 1.1s ease-in forwards",
                  }}
                  aria-hidden="true"
                />
              ))}
            </>
          }
        />
      )}
    </>
  );
}
