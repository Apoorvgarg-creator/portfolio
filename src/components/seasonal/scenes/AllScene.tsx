"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ParticleCanvas, {
  type FrameCtx,
} from "@/components/seasonal/ParticleCanvas";
import Mascot from "@/components/seasonal/mascot/Mascot";
import AllCostume from "@/components/seasonal/mascot/costumes/AllCostume";
import type { MascotState } from "@/components/seasonal/mascot/poses";
import { useUI } from "@/components/theme/ThemeProvider";

type Snow = {
  kind: "snow";
  x: number;
  y: number;
  r: number;
  vy: number;
  phase: number;
  speed: number;
};
type Leaf = {
  kind: "leaf";
  x: number;
  y: number;
  vy: number;
  phase: number;
  speed: number;
  rot: number;
  rotSpeed: number;
  scale: number;
  hue: number;
};
type Petal = {
  kind: "petal";
  x: number;
  y: number;
  vy: number;
  phase: number;
  speed: number;
  rot: number;
  rotSpeed: number;
  scale: number;
  hue: number;
};

type AnyParticle = Snow | Leaf | Petal;

const LEAF_FILLS = ["#ff7733", "#fcb75b", "#d44a1e", "#f7c860"];
const PETAL_FILLS = ["#ffb6cc", "#ff8fb1", "#ffd2e0"];

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

function counts() {
  const m = isMobile();
  return {
    snow: m ? 12 : 24,
    leaf: m ? 6 : 12,
    petal: m ? 8 : 16,
  };
}

function makeSnow(width: number, fromTop = false): Snow {
  return {
    kind: "snow",
    x: Math.random() * width,
    y: fromTop ? -10 - Math.random() * 60 : Math.random() * 200 - 200,
    r: 0.8 + Math.random() * 1.8,
    vy: 0.3 + Math.random() * 0.5,
    phase: Math.random() * Math.PI * 2,
    speed: 0.0008 + Math.random() * 0.0014,
  };
}
function makeLeaf(width: number, fromTop = false): Leaf {
  return {
    kind: "leaf",
    x: Math.random() * width,
    y: fromTop ? -30 - Math.random() * 80 : Math.random() * 200 - 200,
    vy: 0.4 + Math.random() * 0.5,
    phase: Math.random() * Math.PI * 2,
    speed: 0.0009 + Math.random() * 0.0014,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.003,
    scale: 0.6 + Math.random() * 0.4,
    hue: Math.random(),
  };
}
function makePetal(width: number, fromTop = false): Petal {
  return {
    kind: "petal",
    x: Math.random() * width,
    y: fromTop ? -20 - Math.random() * 60 : Math.random() * 200 - 200,
    vy: 0.25 + Math.random() * 0.4,
    phase: Math.random() * Math.PI * 2,
    speed: 0.0008 + Math.random() * 0.0014,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.003,
    scale: 0.5 + Math.random() * 0.5,
    hue: Math.random(),
  };
}

export default function AllScene() {
  const particlesRef = useRef<AnyParticle[]>([]);
  const [mascotState, setMascotState] = useState<MascotState>("idle");
  const { shellOpen } = useUI();

  // Mascot drifts through gentle states every ~7s
  useEffect(() => {
    const cycle: MascotState[] = ["idle", "sunbathe", "idle", "patSand"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % cycle.length;
      setMascotState(cycle[i]);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  function init({ width }: FrameCtx) {
    const c = counts();
    const all: AnyParticle[] = [
      ...Array.from({ length: c.snow }, () => makeSnow(width)),
      ...Array.from({ length: c.leaf }, () => makeLeaf(width)),
      ...Array.from({ length: c.petal }, () => makePetal(width)),
    ];
    particlesRef.current = all;
  }

  function onResize({ width }: FrameCtx) {
    const c = counts();
    const target = c.snow + c.leaf + c.petal;
    const cur = particlesRef.current.length;
    if (cur < target) {
      const need = target - cur;
      for (let i = 0; i < need; i++) {
        const r = Math.random();
        if (r < 0.4) particlesRef.current.push(makeSnow(width, true));
        else if (r < 0.7) particlesRef.current.push(makePetal(width, true));
        else particlesRef.current.push(makeLeaf(width, true));
      }
    } else if (cur > target) {
      particlesRef.current.length = target;
    }
  }

  function draw({ ctx, width, height, dt, t }: FrameCtx) {
    ctx.clearRect(0, 0, width, height);
    const wind = Math.sin(t * 0.0003) * 0.3;
    const arr = particlesRef.current;

    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      p.phase += p.speed * dt;
      p.y += p.vy * (dt / 16.67);

      if (p.kind === "snow") {
        p.x += Math.sin(p.phase) * 0.5 + wind;
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y > height + 10) {
          arr[i] = makeSnow(width, true);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fill();
      } else if (p.kind === "leaf") {
        p.x += Math.sin(p.phase) * 1.2 + wind;
        p.rot += p.rotSpeed * dt;
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y > height + 20) {
          arr[i] = makeLeaf(width, true);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(p.scale, p.scale);
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(3, -4);
        ctx.lineTo(8, -2);
        ctx.lineTo(4, 1);
        ctx.lineTo(9, 4);
        ctx.lineTo(3, 4);
        ctx.lineTo(3, 9);
        ctx.lineTo(0, 6);
        ctx.lineTo(-3, 9);
        ctx.lineTo(-3, 4);
        ctx.lineTo(-9, 4);
        ctx.lineTo(-4, 1);
        ctx.lineTo(-8, -2);
        ctx.lineTo(-3, -4);
        ctx.closePath();
        ctx.fillStyle = LEAF_FILLS[Math.floor(p.hue * LEAF_FILLS.length)];
        ctx.fill();
        ctx.strokeStyle = "rgba(120,40,10,0.45)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      } else {
        p.x += Math.sin(p.phase) * 1.4 + wind;
        p.rot += p.rotSpeed * dt;
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y > height + 20) {
          arr[i] = makePetal(width, true);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(p.scale, p.scale);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.bezierCurveTo(4, -3, 4, 3, 0, 5);
        ctx.bezierCurveTo(-4, 3, -4, -3, 0, -5);
        ctx.closePath();
        ctx.fillStyle = PETAL_FILLS[Math.floor(p.hue * PETAL_FILLS.length)];
        ctx.fill();
        ctx.strokeStyle = "rgba(180,80,110,0.35)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  return (
    <>
      <ParticleCanvas init={init} draw={draw} onResize={onResize} />
      {/* Faint waves at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[12vh] overflow-hidden pointer-events-none opacity-40">
        <motion.div
          className="absolute bottom-0 left-0 w-[200%] h-full"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 1600 200"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            aria-hidden="true"
          >
            <path
              d="M0 110 Q100 80 200 110 T400 110 T600 110 T800 110 T1000 110 T1200 110 T1400 110 T1600 110 L1600 200 L0 200 Z"
              fill="#9a7ed8"
              opacity="0.5"
            />
          </svg>
        </motion.div>
      </div>
      {!shellOpen && <Mascot state={mascotState} costume={<AllCostume />} />}
    </>
  );
}
