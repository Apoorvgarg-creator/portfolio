"use client";

import BootSequence from "@/components/terminal/BootSequence";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BootSequence>{children}</BootSequence>;
}
