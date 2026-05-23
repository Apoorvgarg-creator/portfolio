"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { usePortal } from "./PortalProvider";

export default function PortalButton({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const { trigger, state } = usePortal();
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const onCreator = pathname?.startsWith("/creator");
  const target = onCreator ? "portfolio" : "creator";
  const label = onCreator ? "EXIT CREATOR" : "ENTER CREATOR";
  const icon = onCreator ? "⌘" : "⚔";

  // NihonkRatos red — pops on both dark terminal and light seasonal themes
  const accent = "#d62828";
  const accentBright = "#ff3b3b";
  const ink = onCreator ? "#ffd16a" : accent;

  const handleClick = () => {
    if (state.phase === "active") return;
    const rect = btnRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : undefined;
    trigger(target, origin);
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileTap={{ scale: 0.96 }}
      aria-label={onCreator ? "Return to portfolio" : "Enter creator mode"}
      className={`relative group inline-flex items-center gap-2 px-3 py-1.5 text-[10px] tracking-[0.22em] font-bold whitespace-nowrap select-none overflow-hidden transition-colors ${
        variant === "mobile" ? "self-start" : ""
      }`}
      style={{
        color: ink,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)",
        border: `1px solid ${accent}`,
        boxShadow: `0 0 0 1px rgba(0,0,0,0.35) inset, 0 0 16px ${accent}40, 0 0 0 0 ${accent}`,
        textShadow: `0 0 8px ${accent}80`,
      }}
    >
      {/* corner brackets */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t"
        style={{ borderColor: accentBright }}
      />
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t"
        style={{ borderColor: accentBright }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b"
        style={{ borderColor: accentBright }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b"
        style={{ borderColor: accentBright }}
      />

      {/* slash light sweep on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
          transform: hover ? "translateX(60%)" : "translateX(-100%)",
          transition: "transform 0.6s ease",
        }}
      />

      {/* pulsing dot */}
      <span
        className="relative inline-flex w-1.5 h-1.5"
        aria-hidden="true"
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: accentBright, boxShadow: `0 0 8px ${accentBright}` }}
        />
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: accentBright }}
        />
      </span>

      <span className="text-base leading-none" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>

      <span
        className="inline-block transition-transform"
        aria-hidden="true"
        style={{
          transform: hover ? "translateX(2px)" : "translateX(0)",
          color: accentBright,
        }}
      >
        →
      </span>
    </motion.button>
  );
}
