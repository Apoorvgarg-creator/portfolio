"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import TypewriterText from "@/components/terminal/TypewriterText";
import CursorBlink from "@/components/terminal/CursorBlink";
import { ASCII_LOGO } from "@/lib/constants";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function HeroSection() {
  const { mode, mounted } = useTheme();
  const showAscii = !mounted || mode === "terminal";
  const [step, setStep] = useState(0);

  const onStep0 = useCallback(() => setStep(1), []);
  const onStep1 = useCallback(() => setStep(2), []);
  const onStep2 = useCallback(() => setStep(3), []);
  const onStep3 = useCallback(() => setStep(4), []);

  return (
    <SectionWrapper id="hero" className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <TerminalWindow title="apoorv — bash">
          {/* Line 1: whoami */}
          <div className="mb-2">
            <span className="text-terminal-green text-glow">
              visitor@apoorv:~${" "}
            </span>
            <TypewriterText
              text="whoami"
              speed={80}
              delay={500}
              onComplete={onStep0}
            />
          </div>

          {/* Output 1 */}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              {showAscii ? (
                <pre className="text-terminal-green text-glow-strong text-xs leading-tight mb-2">
                  {ASCII_LOGO}
                </pre>
              ) : (
                <h1
                  className="font-mono font-black text-terminal-green my-3 select-none"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <span className="inline-block">APOORV</span>
                  <span className="ml-1 text-terminal-amber">_</span>
                </h1>
              )}
              <p className="text-terminal-text">
                Software Engineer / Django Software Foundation Member / OSS Contributor
              </p>
            </motion.div>
          )}

          {/* Line 2: cat role.txt */}
          {step >= 1 && (
            <div className="mb-2">
              <span className="text-terminal-green text-glow">
                visitor@apoorv:~${" "}
              </span>
              <TypewriterText
                text="cat role.txt"
                speed={60}
                delay={300}
                onComplete={onStep1}
                enabled={step >= 1}
              />
            </div>
          )}

          {/* Output 2 */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-terminal-text/80"
            >
              <p>3+ years building products at startups and MNCs.</p>
              <p>Founding engineer, microservices, mobile, and developer tools.</p>
              <p>Open source advocate. Always contributing or volunteering.</p>
            </motion.div>
          )}

          {/* Line 3: cat skills.txt */}
          {step >= 2 && (
            <div className="mb-2">
              <span className="text-terminal-green text-glow">
                visitor@apoorv:~${" "}
              </span>
              <TypewriterText
                text="cat skills.txt"
                speed={60}
                delay={300}
                onComplete={onStep2}
                enabled={step >= 2}
              />
            </div>
          )}

          {/* Output 3 */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-terminal-text/80"
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                <span>
                  <span className="text-terminal-green">›</span> Python / Django
                </span>
                <span>
                  <span className="text-terminal-green">›</span> Golang / Hono
                </span>
                <span>
                  <span className="text-terminal-green">›</span> Flutter / React
                </span>
                <span>
                  <span className="text-terminal-green">›</span> Kafka / Microservices
                </span>
                <span>
                  <span className="text-terminal-green">›</span> Postgres / MongoDB / DuckDB
                </span>
                <span>
                  <span className="text-terminal-green">›</span> Docker / AWS / IaC
                </span>
              </div>
            </motion.div>
          )}

          {/* Line 4: ready prompt */}
          {step >= 3 && (
            <div>
              <span className="text-terminal-green text-glow">
                visitor@apoorv:~${" "}
              </span>
              <TypewriterText
                text="scroll down to explore"
                speed={40}
                delay={200}
                onComplete={onStep3}
                enabled={step >= 3}
                showCursor={false}
              />
              {step >= 4 && <CursorBlink />}
            </div>
          )}
        </TerminalWindow>
      </motion.div>
    </SectionWrapper>
  );
}
