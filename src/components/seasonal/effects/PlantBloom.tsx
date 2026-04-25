"use client";

import { motion } from "framer-motion";

export type PlantStage = 0 | 1 | 2 | 3; // seed, sprout, bud, bloom

export default function PlantBloom({ stage }: { stage: PlantStage }) {
  return (
    <motion.div
      className="absolute -right-12 bottom-0 w-12 h-16 pointer-events-none"
      animate={{ scale: 1 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 64" width="100%" height="100%" overflow="visible">
        {/* Pot */}
        <path
          d="M10 50 L38 50 L34 62 L14 62 Z"
          fill="#9a5a3a"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1"
        />
        <ellipse cx="24" cy="50" rx="14" ry="2.5" fill="#7c4226" />

        {/* Soil */}
        <ellipse cx="24" cy="50" rx="12" ry="2" fill="#3d2415" />

        {/* Stage 0: tiny seed in soil */}
        {stage === 0 && (
          <ellipse cx="24" cy="49" rx="2" ry="1" fill="#3d2415" />
        )}

        {/* Stage 1: small sprout */}
        {stage >= 1 && (
          <motion.g
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ originY: "50px" }}
          >
            <path
              d="M24 50 L24 42"
              stroke="#5a8a3c"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <ellipse
              cx="20"
              cy="44"
              rx="3.5"
              ry="2"
              fill="#82bd5a"
              transform="rotate(-30 20 44)"
            />
          </motion.g>
        )}

        {/* Stage 2: bud */}
        {stage >= 2 && (
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ originX: "24px", originY: "42px" }}
          >
            <path
              d="M24 42 L24 32"
              stroke="#5a8a3c"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <ellipse cx="28" cy="38" rx="4" ry="2.3" fill="#82bd5a" transform="rotate(35 28 38)" />
            <ellipse cx="20" cy="36" rx="4" ry="2.3" fill="#82bd5a" transform="rotate(-35 20 36)" />
            {/* Bud */}
            <ellipse cx="24" cy="29" rx="3.5" ry="5" fill="#e85a8a" />
            <ellipse cx="24" cy="29" rx="2" ry="4" fill="#ff8fb1" />
          </motion.g>
        )}

        {/* Stage 3: full bloom */}
        {stage >= 3 && (
          <motion.g
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            style={{ originX: "24px", originY: "26px" }}
          >
            {/* Petals */}
            {[0, 72, 144, 216, 288].map((deg) => (
              <ellipse
                key={deg}
                cx="24"
                cy="20"
                rx="3.5"
                ry="6"
                fill="#ff8fb1"
                stroke="#c9446b"
                strokeWidth="0.6"
                transform={`rotate(${deg} 24 26)`}
              />
            ))}
            <circle cx="24" cy="26" r="2.6" fill="#fff58a" />
            <circle cx="24" cy="26" r="1.2" fill="#e8a92a" />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
}
