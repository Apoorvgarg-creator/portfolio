"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/creator")) return null;

  return (
    <footer className="border-t border-terminal-border py-8 px-4 text-center">
      <pre className="text-terminal-dim text-xs leading-tight mb-4 hidden sm:block">
{`╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   Built with Next.js, Tailwind, and too much caffeine.   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝`}
      </pre>
      <p className="text-terminal-dim text-xs">
        &copy; {new Date().getFullYear()} Apoorv. All rights reserved.
      </p>
      <p className="text-terminal-dim/50 text-xs mt-1">
        visitor@apoorv:~$ exit
      </p>
    </footer>
  );
}
