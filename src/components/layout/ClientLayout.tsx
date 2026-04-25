"use client";

import BootSequence from "@/components/terminal/BootSequence";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <BootSequence>{children}</BootSequence>
    </ThemeProvider>
  );
}
