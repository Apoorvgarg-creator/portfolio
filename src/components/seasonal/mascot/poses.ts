import type { Variants } from "framer-motion";

export type MascotState =
  | "idle"
  | "shiver"
  | "jump"
  | "sunbathe"
  | "patSand"
  | "water"
  | "chase";

// Whole-body container — handles "big" motion (jump, chase, sunbathe lean).
export const containerVariants: Variants = {
  idle: { x: 0, y: 0, rotate: 0, transition: { duration: 0.4 } },
  shiver: {
    x: [0, -1.2, 1.2, -1.2, 1.2, 0],
    y: [0, 0.8, -0.4, 0.8, 0],
    rotate: [-0.4, 0.4, -0.4, 0.4, -0.4],
    transition: { duration: 0.45, repeat: Infinity, ease: "linear" },
  },
  jump: {
    y: [0, -42, 0],
    rotate: [0, -3, 0],
    transition: {
      duration: 0.6,
      times: [0, 0.45, 1],
      ease: ["easeOut", "easeIn"],
    },
  },
  sunbathe: {
    y: 2,
    rotate: -8,
    transition: { duration: 0.6 },
  },
  patSand: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.4 },
  },
  water: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.4 },
  },
  chase: {
    x: [0, 60, 80, 60, 0],
    rotate: [0, 6, 0, -6, 0],
    transition: { duration: 4, ease: "easeInOut" },
  },
};

// Left arm (mascot's left = viewer's right)
export const leftArmVariants: Variants = {
  idle: { rotate: 0, transition: { duration: 0.3 } },
  shiver: {
    rotate: [-3, 3, -3],
    transition: { duration: 0.3, repeat: Infinity },
  },
  jump: {
    rotate: [-30, -55, -25],
    transition: { duration: 0.6, times: [0, 0.45, 1] },
  },
  sunbathe: { rotate: -90, transition: { duration: 0.5 } },
  patSand: {
    rotate: [10, -20, 10],
    transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
  },
  water: { rotate: 0, transition: { duration: 0.3 } },
  chase: { rotate: [10, -10, 10], transition: { duration: 0.5, repeat: Infinity } },
};

// Right arm (mascot's right = viewer's left)
export const rightArmVariants: Variants = {
  idle: { rotate: 0, transition: { duration: 0.3 } },
  shiver: {
    rotate: [3, -3, 3],
    transition: { duration: 0.3, repeat: Infinity },
  },
  jump: {
    rotate: [30, 55, 25],
    transition: { duration: 0.6, times: [0, 0.45, 1] },
  },
  sunbathe: { rotate: 60, transition: { duration: 0.5 } },
  patSand: { rotate: 0, transition: { duration: 0.4 } },
  water: { rotate: 35, transition: { duration: 0.4 } },
  chase: { rotate: [-10, 10, -10], transition: { duration: 0.5, repeat: Infinity } },
};

// Face is intentionally not animated per state — eye blinks happen on their
// own gentle timer inside the mascot SVG. Per-state face squishing reads as
// "weird" and disrupts character identity, so we keep the face stable.
export const faceVariants: Variants = {
  idle: {},
  shiver: {},
  jump: {},
  sunbathe: {},
  patSand: {},
  water: {},
  chase: {},
};
