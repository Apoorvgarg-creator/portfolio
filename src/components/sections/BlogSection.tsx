"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import GlitchText from "@/components/effects/GlitchText";
import ScrollReveal from "@/components/effects/ScrollReveal";
import BlogCard from "./BlogCard";
import { BlogPostMeta } from "@/types/content";

export default function BlogSection({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <SectionWrapper id="blog">
      <ScrollReveal>
        <GlitchText
          text="// blog"
          as="h2"
          className="text-2xl text-terminal-green text-glow mb-2"
        />
        <p className="text-terminal-dim text-sm mb-8">
          visitor@apoorv:~$ ls ~/blog/*.mdx
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-4">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.1}>
            <BlogCard post={post} />
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
