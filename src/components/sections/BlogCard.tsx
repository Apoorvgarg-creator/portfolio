"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPostMeta } from "@/types/content";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <motion.div whileHover={{ y: -2 }}>
      <Link
        href={`/blog/${post.slug}`}
        className="block border border-terminal-border p-4 hover:border-terminal-green/50 transition-colors group"
      >
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="text-terminal-green text-sm font-bold group-hover:text-glow truncate">
            {post.title}
          </h3>
          <span className="text-terminal-dim text-xs shrink-0">
            {post.date}
          </span>
        </div>

        <p className="text-terminal-text/70 text-xs mb-3 line-clamp-2">
          {post.description}
        </p>

        <div className="flex gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-terminal-amber border border-terminal-border text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
