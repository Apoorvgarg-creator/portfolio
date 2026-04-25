"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import GlitchText from "@/components/effects/GlitchText";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { BookMeta } from "@/types/content";

const ASCII_BOOK = `
    ___________
   /          /|
  /          / |
 /_________ /  |
|  ______  | | |
| |      | | | |
| |      | | | |
| | BOOK | | | |
| |      | | | /
| |______| | |/
|__________|/
`.trim();

export default function BookSection({ book }: { book: BookMeta | null }) {
  if (!book) return null;

  return (
    <SectionWrapper id="book">
      <ScrollReveal>
        <GlitchText
          text="// book"
          as="h2"
          className="text-2xl text-terminal-green text-glow mb-2"
        />
        <p className="text-terminal-dim text-sm mb-8">
          visitor@apoorv:~$ cat ~/book/README.md
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <motion.div
          className="border border-terminal-border p-6 max-w-2xl"
          whileHover={{ borderColor: "rgba(0, 255, 65, 0.3)" }}
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <pre className="text-terminal-green text-xs leading-tight shrink-0 text-glow">
              {ASCII_BOOK}
            </pre>

            <div>
              <h3 className="text-terminal-green text-lg font-bold mb-2">
                {book.title}
              </h3>
              <p className="text-terminal-text/70 text-sm mb-4 leading-relaxed">
                {book.description}
              </p>
              <p className="text-terminal-dim text-xs mb-4">
                {book.chapters.length} chapters
              </p>

              <div className="flex gap-3">
                <Link
                  href="/book"
                  className="text-terminal-green text-sm hover:text-glow border border-terminal-green/50 px-3 py-1 hover:bg-terminal-green/10 transition-colors"
                >
                  &gt; read book
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
