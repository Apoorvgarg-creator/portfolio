"use client";

export default function CursorBlink({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-2.5 h-5 bg-terminal-green animate-type-cursor align-middle ml-0.5 ${className}`}
      aria-hidden="true"
    />
  );
}
