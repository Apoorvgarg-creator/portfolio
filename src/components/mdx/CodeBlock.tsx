"use client";

import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className = "" }: CodeBlockProps) {
  return (
    <div className="relative group">
      <pre
        className={`bg-terminal-black border border-terminal-border p-4 overflow-x-auto text-sm ${className}`}
      >
        {children}
      </pre>
    </div>
  );
}
