"use client";

import { useEffect, useRef } from "react";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type FrameCtx = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dt: number;
  t: number;
};

type ParticleCanvasProps = {
  /** Called once on mount with width/height; use to seed particles. */
  init?: (ctx: FrameCtx) => void;
  /** Called every animation frame. */
  draw: (ctx: FrameCtx) => void;
  /** Called on resize after the canvas is resized; useful to resample state. */
  onResize?: (ctx: FrameCtx, prevWidth: number, prevHeight: number) => void;
  className?: string;
};

export default function ParticleCanvas({
  init,
  draw,
  onResize,
  className = "seasonal-particles",
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const visible = useDocumentVisibility();
  const reduced = useReducedMotion();

  // We deliberately mount canvas via ref and run a single rAF loop.
  // Keep latest callbacks in refs so we don't tear down rAF on every render.
  const drawRef = useRef(draw);
  const initRef = useRef(init);
  const resizeRef = useRef(onResize);
  drawRef.current = draw;
  initRef.current = init;
  resizeRef.current = onResize;

  useEffect(() => {
    if (reduced) return; // hard opt-out
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function sizeCanvas() {
      if (!canvas || !ctx) return { w: 0, h: 0 };
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    }

    let { w, h } = sizeCanvas();
    startTimeRef.current = performance.now();
    initRef.current?.({ ctx, width: w, height: h, dt: 0, t: 0 });

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    function handleResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const prev = { w, h };
        const next = sizeCanvas();
        w = next.w;
        h = next.h;
        if (ctx) {
          resizeRef.current?.(
            { ctx, width: w, height: h, dt: 0, t: performance.now() - startTimeRef.current },
            prev.w,
            prev.h
          );
        }
      }, 100);
    }
    window.addEventListener("resize", handleResize);

    function loop(time: number) {
      if (!ctx) return;
      const last = lastTimeRef.current || time;
      const dt = Math.min(64, time - last); // clamp to avoid huge jumps after tab inactivity
      lastTimeRef.current = time;
      const t = time - startTimeRef.current;
      drawRef.current({ ctx, width: w, height: h, dt, t });
      rafRef.current = requestAnimationFrame(loop);
    }

    if (visible) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = 0;
    };
  }, [visible, reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
