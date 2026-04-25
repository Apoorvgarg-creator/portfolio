"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  containerVariants,
  leftArmVariants,
  rightArmVariants,
  type MascotState,
} from "./poses";

type MascotProps = {
  state: MascotState;
  costume?: ReactNode;
  /** Rendered inside the SVG, behind the body — eg. plant pot, sand castle. */
  prop?: ReactNode;
  /** Rendered above the SVG in the same fixed container — eg. floating counter. */
  overlay?: ReactNode;
  /** CSS width (height auto from aspect ratio). Defaults to responsive 120px. */
  size?: number;
};

// Chibi-style One Piece Luffy. Iconic identifiers preserved:
// - Yellow straw hat with red band
// - Black messy hair under the brim
// - Stitched scar under the left eye (viewer's right)
// - Red sleeveless vest with X scar visible in the V opening
// - Blue shorts + sandals
export default function Mascot({
  state,
  costume,
  prop,
  overlay,
  size,
}: MascotProps) {
  return (
    <div
      className="seasonal-mascot"
      style={size ? { width: size } : undefined}
    >
      <motion.div
        className="seasonal-mascot__animated"
        animate={state}
        initial="idle"
        variants={containerVariants}
        style={{ width: size ?? "clamp(70px, 14vw, 130px)" }}
      >
        <svg
          viewBox="0 0 100 140"
          width="100%"
          height="100%"
          overflow="visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="luffySkin" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fce4c8" />
              <stop offset="100%" stopColor="#f3c89a" />
            </linearGradient>
            <linearGradient id="luffyHat" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f1d68d" />
              <stop offset="100%" stopColor="#d6a85a" />
            </linearGradient>
            <linearGradient id="luffyVest" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#d83a3a" />
              <stop offset="100%" stopColor="#a51d1d" />
            </linearGradient>
            <linearGradient id="luffyShorts" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3f6cb8" />
              <stop offset="100%" stopColor="#26468a" />
            </linearGradient>
            <radialGradient id="picoShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="50" cy="138" rx="30" ry="3.5" fill="url(#picoShadow)" />

          {prop}

          {/* Sandals */}
          <ellipse
            cx="40"
            cy="135"
            rx="6"
            ry="2.6"
            fill="#6a4020"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.7"
          />
          <ellipse
            cx="60"
            cy="135"
            rx="6"
            ry="2.6"
            fill="#6a4020"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.7"
          />

          {/* Bare legs */}
          <rect x="36" y="124" width="7" height="9" fill="url(#luffySkin)" />
          <rect x="57" y="124" width="7" height="9" fill="url(#luffySkin)" />

          {/* Blue shorts */}
          <path
            d="M28 110 L72 110 L70 124 L30 124 Z"
            fill="url(#luffyShorts)"
            stroke="rgba(20,30,60,0.5)"
            strokeWidth="0.9"
          />
          <line
            x1="50"
            y1="110"
            x2="50"
            y2="124"
            stroke="rgba(20,30,60,0.4)"
            strokeWidth="0.8"
          />
          {/* Belt */}
          <rect x="26" y="106" width="48" height="4" fill="#15244e" />
          <circle cx="50" cy="108" r="1.4" fill="#f1d68d" />

          {/* Red vest */}
          <path
            d="M22 74 Q26 68 32 68 L68 68 Q74 68 78 74 L82 108 Q50 114 18 108 Z"
            fill="url(#luffyVest)"
            stroke="rgba(70,15,15,0.5)"
            strokeWidth="1.1"
          />
          {/* Vest opening (V revealing chest skin) */}
          <path
            d="M44 68 L50 84 L56 68 Z"
            fill="url(#luffySkin)"
            stroke="rgba(70,15,15,0.45)"
            strokeWidth="0.7"
          />
          {/* X scar on chest */}
          <path
            d="M46 72 L52 80 M52 72 L46 80"
            stroke="#7a1818"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Right arm — viewer's left, mascot's right */}
          <motion.g
            animate={state}
            initial="idle"
            variants={rightArmVariants}
            style={{ originX: "24px", originY: "74px" }}
          >
            <path
              d="M22 74 Q14 78 14 92 Q14 100 22 100 Q26 96 24 84 Z"
              fill="url(#luffySkin)"
              stroke="rgba(150,90,40,0.4)"
              strokeWidth="0.9"
            />
          </motion.g>

          {/* Left arm — viewer's right, mascot's left */}
          <motion.g
            animate={state}
            initial="idle"
            variants={leftArmVariants}
            style={{ originX: "76px", originY: "74px" }}
          >
            <path
              d="M78 74 Q86 78 86 92 Q86 100 78 100 Q74 96 76 84 Z"
              fill="url(#luffySkin)"
              stroke="rgba(150,90,40,0.4)"
              strokeWidth="0.9"
            />
          </motion.g>

          {/* Neck */}
          <rect x="44" y="64" width="12" height="6" fill="#e6b885" />

          {/* Head */}
          <ellipse
            cx="50"
            cy="48"
            rx="24"
            ry="21"
            fill="url(#luffySkin)"
            stroke="rgba(150,90,40,0.4)"
            strokeWidth="1.1"
          />

          {/* Hair tufts under hat brim — sides */}
          <path
            d="M28 32 Q22 30 22 38 Q26 38 30 36 Z"
            fill="#1a1a1a"
          />
          <path
            d="M72 32 Q78 30 78 38 Q74 38 70 36 Z"
            fill="#1a1a1a"
          />
          {/* Hair forehead bangs */}
          <path
            d="M30 32 Q34 36 38 32 Q42 38 46 32 Q50 38 54 32 Q58 38 62 32 Q66 36 70 32 Q70 40 50 40 Q30 40 30 32 Z"
            fill="#1a1a1a"
          />

          {/* Cheeks */}
          <ellipse
            cx="30"
            cy="55"
            rx="5"
            ry="2.8"
            fill="rgba(255,140,140,0.6)"
          />
          <ellipse
            cx="70"
            cy="55"
            rx="5"
            ry="2.8"
            fill="rgba(255,140,140,0.6)"
          />

          {/* Iconic stitched scar under viewer's right (Luffy's left) eye */}
          <g>
            <path
              d="M62 53 L67 53"
              stroke="#7a3a30"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M63 51.6 L63 54.4 M65 51.6 L65 54.4"
              stroke="#7a3a30"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
          </g>

          {/* Eyes — independent gentle blink loop, NOT tied to per-state animation */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1, 1, 0.1, 1, 1, 1] }}
            transition={{
              duration: 7,
              times: [0, 0.4, 0.42, 0.44, 0.6, 0.7, 0.72, 0.74, 0.9, 1],
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          >
            <circle cx="42" cy="48" r="4.2" fill="#1a1209" />
            <circle cx="58" cy="48" r="4.2" fill="#1a1209" />
            <circle cx="43.5" cy="46.5" r="1.4" fill="#ffffff" />
            <circle cx="59.5" cy="46.5" r="1.4" fill="#ffffff" />
          </motion.g>

          {/* Big smile */}
          <path
            d="M40 56 Q50 67 60 56"
            fill="#3a1a0e"
            stroke="#1a1209"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Tongue/lip highlight */}
          <path
            d="M42 57 Q50 64 58 57"
            fill="#c33a4a"
          />

          {/* Straw hat — drawn AFTER head so it sits on top */}
          {/* Brim */}
          <ellipse
            cx="50"
            cy="27"
            rx="42"
            ry="4.5"
            fill="url(#luffyHat)"
            stroke="rgba(110,80,30,0.7)"
            strokeWidth="0.9"
          />
          {/* Brim underside shadow */}
          <path
            d="M8 27 Q50 32 92 27 L92 28.5 Q50 33.5 8 28.5 Z"
            fill="rgba(110,80,30,0.35)"
          />
          {/* Dome */}
          <ellipse
            cx="50"
            cy="14"
            rx="22"
            ry="13"
            fill="url(#luffyHat)"
            stroke="rgba(110,80,30,0.7)"
            strokeWidth="0.9"
          />
          {/* Red hatband */}
          <path
            d="M28 19 Q50 24 72 19 L73.5 24 Q50 29 26.5 24 Z"
            fill="#c93030"
            stroke="rgba(80,15,15,0.55)"
            strokeWidth="0.7"
          />
          {/* Straw weave texture */}
          <path
            d="M30 14 Q50 17 70 14 M28 9 Q50 12 72 9 M34 5 Q50 7 66 5"
            stroke="rgba(110,75,30,0.4)"
            strokeWidth="0.4"
            fill="none"
          />

          {/* Costume layer renders ABOVE hat so accessories tuck into the hatband, etc. */}
          {costume}
        </svg>
      </motion.div>
      {overlay}
    </div>
  );
}
