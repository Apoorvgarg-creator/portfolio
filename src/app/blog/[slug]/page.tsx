import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import { SITE_CONFIG } from "@/lib/constants";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  const url = `${SITE_CONFIG.url.replace(/\/$/, "")}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: "Apoorv Garg",
      publishedTime: post.date || undefined,
      authors: ["Apoorv Garg"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@apoorv_garg",
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Apoorv Garg",
      url: SITE_CONFIG.url,
    },
    keywords: post.tags.join(", "),
    url: `${SITE_CONFIG.url.replace(/\/$/, "")}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url.replace(/\/$/, "")}/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen py-20 px-4 max-w-3xl mx-auto">
      <Script
        id={`ld-article-${post.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(articleJsonLd)}
      </Script>
      <Link
        href="/#blog"
        className="text-terminal-green text-sm hover:text-glow mb-8 inline-block"
      >
        &gt; cd ~/blog
      </Link>

      <TerminalWindow title={`blog/${post.slug}.mdx`}>
        <div className="mb-4">
          <h1 className="text-xl text-terminal-green text-glow font-bold mb-2">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-xs text-terminal-dim">
            <span>{post.date}</span>
            <span>|</span>
            <div className="flex gap-1">
              {post.tags.map((tag) => (
                <span key={tag} className="text-terminal-amber">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-terminal-border mb-6" />

        <div className="prose prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </TerminalWindow>

      <Link
        href="/#blog"
        className="text-terminal-green text-sm hover:text-glow mt-8 inline-block"
      >
        &gt; cd ..
      </Link>
    </div>
  );
}
