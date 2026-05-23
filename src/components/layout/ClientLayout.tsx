"use client";

import BootSequence from "@/components/terminal/BootSequence";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { PortalProvider } from "@/components/portal/PortalProvider";
import FreezeBreakOverlay from "@/components/portal/FreezeBreakOverlay";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <PortalProvider>
        <BootSequence>{children}</BootSequence>
        <FreezeBreakOverlay />
      </PortalProvider>
    </ThemeProvider>
  );
}
