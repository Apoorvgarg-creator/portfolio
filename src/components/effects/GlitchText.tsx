"use client";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export default function GlitchText({
  text,
  className = "",
  as: Tag = "span",
}: GlitchTextProps) {
  return (
    <Tag className={`glitch-container inline-block ${className}`}>
      {text}
      <span className="glitch-clone-1" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-clone-2" aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}
