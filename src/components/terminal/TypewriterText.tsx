"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import CursorBlink from "./CursorBlink";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  enabled?: boolean;
  showCursor?: boolean;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  enabled = true,
  showCursor = true,
  className = "",
}: TypewriterTextProps) {
  const { displayedText, isComplete } = useTypewriter({
    text,
    speed,
    delay,
    onComplete,
    enabled,
  });

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && <CursorBlink />}
    </span>
  );
}
