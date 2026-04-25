"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBootSequence } from "@/hooks/useBootSequence";
import { BOOT_LINES } from "@/lib/constants";

export default function BootSequence({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBooting, bootComplete } = useBootSequence();
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (!isBooting) return;

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, i + 1));
      }, line.delay);
    });
  }, [isBooting]);

  return (
    <>
      <AnimatePresence>
        {isBooting && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-terminal-black flex items-start justify-start p-8 overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-sm">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${
                    line.text.includes("OK")
                      ? "text-terminal-green"
                      : line.text.includes("ready")
                        ? "text-terminal-green text-glow-strong"
                        : "text-terminal-text/80"
                  }`}
                >
                  {line.text || "\u00A0"}
                </motion.div>
              ))}
              {visibleLines > 0 && visibleLines < BOOT_LINES.length && (
                <span className="inline-block w-2 h-4 bg-terminal-green animate-blink" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {bootComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
