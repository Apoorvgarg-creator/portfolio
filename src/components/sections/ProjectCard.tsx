"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/content";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-terminal-border bg-terminal-black hover:border-terminal-green/50 transition-colors group"
      whileHover={{ y: -2 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-terminal-border bg-terminal-black">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-green-500/60" />
        <span className="text-xs text-terminal-dim ml-1 truncate">
          {project.name}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-terminal-green text-sm font-bold mb-2 group-hover:text-glow transition-all">
          {project.name}
        </h3>
        <p className="text-terminal-text/70 text-xs mb-3 leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="text-terminal-amber">{project.language}</span>
            {project.stars !== undefined && (
              <span className="text-terminal-dim">* {project.stars}</span>
            )}
          </div>
          <div className="flex gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-terminal-dim border border-terminal-border text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}
