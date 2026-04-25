"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import GlitchText from "@/components/effects/GlitchText";
import ScrollReveal from "@/components/effects/ScrollReveal";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/content";

export default function ProjectsSection({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <SectionWrapper id="projects">
      <ScrollReveal>
        <GlitchText
          text="// projects"
          as="h2"
          className="text-2xl text-terminal-green text-glow mb-2"
        />
        <p className="text-terminal-dim text-sm mb-8">
          visitor@apoorv:~$ ls ~/projects
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <ScrollReveal key={project.name} delay={i * 0.1}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
