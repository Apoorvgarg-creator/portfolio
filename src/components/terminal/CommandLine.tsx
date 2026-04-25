"use client";

import { ReactNode } from "react";

interface CommandLineProps {
  command: string;
  children?: ReactNode;
  prompt?: string;
}

export default function CommandLine({
  command,
  children,
  prompt = "visitor@apoorv:~$",
}: CommandLineProps) {
  return (
    <div className="mb-2">
      <div className="flex gap-2">
        <span className="text-terminal-green text-glow shrink-0">{prompt}</span>
        <span className="text-terminal-text">{command}</span>
      </div>
      {children && (
        <div className="mt-1 text-terminal-text/90 pl-0">{children}</div>
      )}
    </div>
  );
}
