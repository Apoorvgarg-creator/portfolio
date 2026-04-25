import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`min-h-screen py-20 px-4 max-w-6xl mx-auto ${className}`}
    >
      {children}
    </section>
  );
}
