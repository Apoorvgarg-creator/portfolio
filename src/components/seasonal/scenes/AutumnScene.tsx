"use client";

import { useRef, useState } from "react";
import ParticleCanvas, {
  type FrameCtx,
} from "@/components/seasonal/ParticleCanvas";
import Mascot from "@/components/seasonal/mascot/Mascot";
import AutumnCostume from "@/components/seasonal/mascot/costumes/AutumnCostume";
import type { MascotState } from "@/components/seasonal/mascot/poses";
import { useUI } from "@/components/theme/ThemeProvider";

type Leaf = {
  x: number;
  y: number;
  vy: number;
  drift: number;
  phase: number;
  speed: number;
  rot: number;
  rotSpeed: number;
  scale: number;
  hue: number; // 0..1 picks from palette
};

const LEAF_COLORS: { fill: string; stroke: string }[] = [
  { fill: "#ff7733", stroke: "#a83a14" },
  { fill: "#fcb75b", stroke: "#a86b1c" },
  { fill: "#d44a1e", stroke: "#7a2410" },
  { fill: "#f7c860", stroke: "#9a7a14" },
  { fill: "#c2391a", stroke: "#6e1d0a" },
];

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

function makeLeaf(width: number, fromTop = false): Leaf {
  return {
    x: Math.random() * width,
    y: fromTop ? -30 - Math.random() * 80 : Math.random() * 200 - 200,
    vy: 0.4 + Math.random() * 0.6,
    drift: 0.8 + Math.random() * 1.6,
    phase: Math.random() * Math.PI * 2,
    speed: 0.0009 + Math.random() * 0.0014,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.004,
    scale: 0.7 + Math.random() * 0.7,
    hue: Math.random(),
  };
}

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  leaf: Leaf
) {
  const c = LEAF_COLORS[Math.floor(leaf.hue * LEAF_COLORS.length)];
  ctx.save();
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate(leaf.rot);
  ctx.scale(leaf.scale, leaf.scale);
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.lineTo(3, -7);
  ctx.lineTo(11, -4);
  ctx.lineTo(6, 0);
  ctx.lineTo(13, 5);
  ctx.lineTo(5, 5);
  ctx.lineTo(4, 13);
  ctx.lineTo(0, 8);
  ctx.lineTo(-4, 13);
  ctx.lineTo(-5, 5);
  ctx.lineTo(-13, 5);
  ctx.lineTo(-6, 0);
  ctx.lineTo(-11, -4);
  ctx.lineTo(-3, -7);
  ctx.closePath();
  ctx.fillStyle = c.fill;
  ctx.fill();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = c.stroke;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.lineTo(0, 13);
  ctx.strokeStyle = c.stroke;
  ctx.lineWidth = 0.8;
  ctx.stroke();
  ctx.restore();
}

// Mascot lives in the bottom-left fixed corner; estimate its hitbox in viewport space.
function getMascotHitbox(width: number, height: number) {
  const mobile = width < 768;
  const w = mobile ? 80 : 120;
  const h = mobile ? 100 : 140;
  const left = mobile ? 8 : 16;
  const bottom = mobile ? 8 : 16;
  return {
    left,
    right: left + w,
    top: height - bottom - h,
    bottom: height - bottom,
  };
}

export default function AutumnScene() {
  const leavesRef = useRef<Leaf[]>([]);
  const [mascotState, setMascotState] = useState<MascotState>("idle");
  const [caught, setCaught] = useState(0);
  const lastCatchRef = useRef<number>(0);
  const { shellOpen } = useUI();

  function init({ width }: FrameCtx) {
    const count = isMobile() ? 20 : 40;
    leavesRef.current = Array.from({ length: count }, () => makeLeaf(width));
  }

  function onResize({ width }: FrameCtx) {
    const target = isMobile() ? 20 : 40;
    const cur = leavesRef.current.length;
    if (cur < target) {
      for (let i = 0; i < target - cur; i++) {
        leavesRef.current.push(makeLeaf(width, true));
      }
    } else if (cur > target) {
      leavesRef.current.length = target;
    }
  }

  function draw({ ctx, width, height, dt, t }: FrameCtx) {
    ctx.clearRect(0, 0, width, height);

    const wind = Math.sin(t * 0.0003) * 0.5;
    const leaves = leavesRef.current;
    const hitbox = getMascotHitbox(width, height);

    for (let i = 0; i < leaves.length; i++) {
      const l = leaves[i];
      l.phase += l.speed * dt;
      l.x += Math.sin(l.phase) * l.drift + wind;
      l.y += l.vy * (dt / 16.67);
      l.rot += l.rotSpeed * dt;

      if (l.x < -20) l.x = width + 20;
      else if (l.x > width + 20) l.x = -20;

      // Catch detection: leaf enters mascot hitbox AND throttle the jump
      if (
        !shellOpen &&
        l.x >= hitbox.left - 10 &&
        l.x <= hitbox.right + 10 &&
        l.y >= hitbox.top &&
        l.y <= hitbox.top + 60
      ) {
        const now = performance.now();
        if (now - lastCatchRef.current > 700) {
          lastCatchRef.current = now;
          setMascotState("jump");
          setCaught((n) => n + 1);
          // schedule return to idle
          window.setTimeout(() => setMascotState("idle"), 650);
        }
        leaves[i] = makeLeaf(width, true);
        continue;
      }

      // Off-screen at the bottom — recycle
      if (l.y > height + 20) {
        leaves[i] = makeLeaf(width, true);
        continue;
      }

      drawLeaf(ctx, l);
    }
  }

  return (
    <>
      <ParticleCanvas init={init} draw={draw} onResize={onResize} />
      {!shellOpen && (
        <Mascot
          state={mascotState}
          costume={<AutumnCostume />}
          overlay={
            caught > 0 ? (
              <div
                className="absolute -top-1 -right-2 px-2 py-0.5 text-[10px] rounded-full bg-terminal-amber/30 border border-terminal-amber/60 text-terminal-amber font-mono select-none"
                aria-hidden="true"
              >
                🍁 {caught}
              </div>
            ) : null
          }
        />
      )}
    </>
  );
}
