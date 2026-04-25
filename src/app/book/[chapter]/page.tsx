import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getChapter, getChapters, getBookMeta } from "@/lib/book";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

export function generateStaticParams() {
  return getChapters().map((ch) => ({ chapter: ch.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { chapter: string };
}) {
  const chapter = getChapter(params.chapter);
  if (!chapter) return {};
  const book = getBookMeta();
  return {
    title: `${chapter.title} — ${book?.title ?? "Book"} — Apoorv`,
  };
}

export default function ChapterPage({
  params,
}: {
  params: { chapter: string };
}) {
  const chapter = getChapter(params.chapter);
  if (!chapter) notFound();

  const chapters = getChapters();
  const currentIndex = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="min-h-screen py-20 px-4 max-w-3xl mx-auto">
      <Link
        href="/book"
        className="text-terminal-green text-sm hover:text-glow mb-8 inline-block"
      >
        &gt; cd ~/book
      </Link>

      <TerminalWindow title={`book/${chapter.slug}.mdx`}>
        <div className="mb-4">
          <p className="text-terminal-dim text-xs mb-1">
            Chapter {chapter.order}
          </p>
          <h1 className="text-xl text-terminal-green text-glow font-bold">
            {chapter.title}
          </h1>
        </div>

        <hr className="border-terminal-border mb-6" />

        <div className="prose prose-invert max-w-none">
          <MDXRemote
            source={chapter.content}
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

      {/* Prev / Next navigation */}
      <div className="flex justify-between mt-8 gap-4">
        {prev ? (
          <Link
            href={`/book/${prev.slug}`}
            className="text-terminal-green text-sm hover:text-glow"
          >
            &gt; prev chapter
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/book/${next.slug}`}
            className="text-terminal-green text-sm hover:text-glow"
          >
            &gt; next chapter
          </Link>
        ) : (
          <Link
            href="/book"
            className="text-terminal-green text-sm hover:text-glow"
          >
            &gt; back to contents
          </Link>
        )}
      </div>
    </div>
  );
}
