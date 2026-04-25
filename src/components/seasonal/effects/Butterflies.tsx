"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ButterflyConfig = {
  id: number;
  delay: number;
  color: string;
  altColor: string;
  duration: number;
  yBase: number; // 0..1
};

const BUTTERFLIES: ButterflyConfig[] = [
  {
    id: 1,
    delay: 0,
    color: "#ff6fa3",
    altColor: "#ffd2e0",
    duration: 22,
    yBase: 0.35,
  },
  {
    id: 2,
    delay: 7,
    color: "#9a7ed8",
    altColor: "#d4c8e8",
    duration: 26,
    yBase: 0.55,
  },
];

function ButterflySvg({
  color,
  altColor,
}: {
  color: string;
  altColor: string;
}) {
  return (
    <svg
      width="36"
      height="32"
      viewBox="0 0 36 32"
      overflow="visible"
      aria-hidden="true"
    >
      <motion.g
        animate={{ scaleX: [1, 0.4, 1] }}
        transition={{
          duration: 0.25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: "18px", originY: "16px" }}
      >
        {/* Wings */}
        <path
          d="M18 16 Q4 4 2 14 Q4 22 14 22 Z"
          fill={color}
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.8"
        />
        <path
          d="M18 16 Q4 28 6 22 Q10 18 14 22 Z"
          fill={altColor}
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.8"
        />
        <path
          d="M18 16 Q32 4 34 14 Q32 22 22 22 Z"
          fill={color}
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.8"
        />
        <path
          d="M18 16 Q32 28 30 22 Q26 18 22 22 Z"
          fill={altColor}
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.8"
        />
        {/* Wing dots */}
        <circle cx="9" cy="14" r="1.2" fill="rgba(0,0,0,0.4)" />
        <circle cx="27" cy="14" r="1.2" fill="rgba(0,0,0,0.4)" />
      </motion.g>
      {/* Body */}
      <ellipse cx="18" cy="16" rx="1.4" ry="6" fill="#3a2233" />
      {/* Antennae */}
      <path
        d="M18 11 Q16 7 14 6 M18 11 Q20 7 22 6"
        stroke="#3a2233"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Butterflies() {
  const [vw, setVw] = useState(1024);
  const [vh, setVh] = useState(768);

  useEffect(() => {
    function update() {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      {BUTTERFLIES.map((b) => {
        const yBase = vh * b.yBase;
        return (
          <motion.div
            key={b.id}
            className="absolute pointer-events-none"
            initial={{ x: -60, y: yBase }}
            animate={{
              x: [-60, vw * 0.25, vw * 0.5, vw * 0.75, vw + 60],
              y: [
                yBase,
                yBase - 60,
                yBase + 30,
                yBase - 40,
                yBase + 10,
              ],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0,
            }}
            style={{ top: 0, left: 0 }}
          >
            <ButterflySvg color={b.color} altColor={b.altColor} />
          </motion.div>
        );
      })}
    </>
  );
}
