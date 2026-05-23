"use client";

import { motion } from "framer-motion";

// Two parallax wave layers that animate horizontally at different speeds.
// Each layer is a wide SVG path repeated via translateX from 0 to -50%
// (the path is 200% width and tiled by repeating its shape).
export default function Waves({ paused = false }: { paused?: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[28vh] overflow-hidden pointer-events-none">
      {/* Back layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-full"
        animate={paused ? { x: "0%" } : { x: ["0%", "-50%"] }}
        transition={
          paused
            ? { duration: 0 }
            : { duration: 22, repeat: Infinity, ease: "linear" }
        }
      >
        <svg
          viewBox="0 0 1600 200"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          aria-hidden="true"
        >
          <path
            d="M0 80 Q100 40 200 80 T400 80 T600 80 T800 80 T1000 80 T1200 80 T1400 80 T1600 80 L1600 200 L0 200 Z"
            fill="#3aa9d6"
            opacity="0.55"
          />
        </svg>
      </motion.div>
      {/* Front layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-full"
        animate={paused ? { x: "0%" } : { x: ["0%", "-50%"] }}
        transition={
          paused
            ? { duration: 0 }
            : { duration: 14, repeat: Infinity, ease: "linear" }
        }
      >
        <svg
          viewBox="0 0 1600 200"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          aria-hidden="true"
        >
          <path
            d="M0 120 Q80 80 160 120 T320 120 T480 120 T640 120 T800 120 T960 120 T1120 120 T1280 120 T1440 120 T1600 120 L1600 200 L0 200 Z"
            fill="#0096c7"
            opacity="0.85"
          />
          <path
            d="M0 130 Q80 100 160 130 T320 130 T480 130 T640 130 T800 130 T960 130 T1120 130 T1280 130 T1440 130 T1600 130"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
    </div>
  );
}
