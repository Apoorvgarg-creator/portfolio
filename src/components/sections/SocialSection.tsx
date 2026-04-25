"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import GlitchText from "@/components/effects/GlitchText";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function SocialSection() {
  return (
    <SectionWrapper id="social" className="min-h-0 py-20">
      <ScrollReveal>
        <GlitchText
          text="// connect"
          as="h2"
          className="text-2xl text-terminal-green text-glow mb-2"
        />
        <p className="text-terminal-dim text-sm mb-8">
          visitor@apoorv:~$ cat social.txt
        </p>
      </ScrollReveal>

      <div className="space-y-3 max-w-lg">
        {SOCIAL_LINKS.map((link, i) => (
          <ScrollReveal key={link.label} delay={i * 0.1}>
            <motion.a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-terminal-border p-3 hover:border-terminal-green/50 transition-colors group"
              whileHover={{ x: 4 }}
            >
              <span className="text-terminal-green text-glow text-sm">$</span>
              <span className="text-terminal-text text-sm group-hover:text-terminal-green transition-colors">
                {link.command}
              </span>
              <span className="text-terminal-dim text-xs ml-auto">
                [{link.icon}]
              </span>
            </motion.a>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
