"use client";

import { motion } from "framer-motion";

const DIVIDERS = [
  "═══════════════════════════════════════════════════════════════",
  "───────────────────────────────────────────────────────────────",
  "╔═══════════════════════════════════════════════════════════╗",
  "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
  "┌─────────────────────────────────────────────────────────────┐",
];

interface AsciiDividerProps {
  variant?: number;
  className?: string;
}

export default function AsciiDivider({
  variant = 0,
  className = "",
}: AsciiDividerProps) {
  const line = DIVIDERS[variant % DIVIDERS.length];

  return (
    <motion.div
      className={`text-terminal-dim text-xs overflow-hidden text-center py-8 select-none ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <motion.span
        className="inline-block"
        initial={{ width: 0 }}
        whileInView={{ width: "auto" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {line}
      </motion.span>
    </motion.div>
  );
}
