"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_ITEMS } from "@/lib/constants";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default function Navbar() {
  const active = useActiveSection();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-terminal-black/90 backdrop-blur-sm border-b border-terminal-border">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between gap-3">
        <Link
          href="/#hero"
          className="text-terminal-green text-glow font-bold text-sm"
        >
          apoorv@portfolio:~$
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("/#", "");
            const isActive = onHome && active === sectionId;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 text-xs transition-colors ${
                  isActive
                    ? "text-terminal-green text-glow"
                    : "text-terminal-dim hover:text-terminal-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <ThemeSwitcher variant="desktop" />

        {/* Mobile toggle */}
        <button
          className="md:hidden text-terminal-green text-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? "[x]" : "[=]"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-terminal-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-3">
              <div className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-xs text-terminal-dim hover:text-terminal-green py-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="pt-2 border-t border-terminal-border">
                <ThemeSwitcher variant="mobile" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
