import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBookMeta, getChapters } from "@/lib/book";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import CommandLine from "@/components/terminal/CommandLine";

export function generateMetadata(): Metadata {
  const book = getBookMeta();
  if (!book) return {};
  return {
    title: book.title,
    description: book.description,
    alternates: { canonical: "/book" },
    openGraph: {
      type: "book",
      title: book.title,
      description: book.description,
      siteName: "Apoorv Garg",
    },
    twitter: {
      card: "summary",
      title: book.title,
      description: book.description,
    },
  };
}

export default function BookPage() {
  const book = getBookMeta();
  if (!book) notFound();

  const chapters = getChapters();

  return (
    <div className="min-h-screen py-20 px-4 max-w-3xl mx-auto">
      <Link
        href="/#book"
        className="text-terminal-green text-sm hover:text-glow mb-8 inline-block"
      >
        &gt; cd ~
      </Link>

      <TerminalWindow title="book — table of contents">
        <CommandLine command={`cat "${book.title}/README.md"`}>
          <div className="mt-2">
            <h1 className="text-xl text-terminal-green text-glow font-bold mb-2">
              {book.title}
            </h1>
            <p className="text-terminal-text/70 text-sm mb-6 leading-relaxed">
              {book.description}
            </p>
          </div>
        </CommandLine>

        <CommandLine command="ls chapters/">
          <div className="mt-2 space-y-2">
            {chapters.map((chapter, i) => (
              <Link
                key={chapter.slug}
                href={`/book/${chapter.slug}`}
                className="flex items-center gap-3 text-sm hover:text-terminal-green transition-colors group py-1"
              >
                <span className="text-terminal-dim w-6 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-terminal-green opacity-50 group-hover:opacity-100">
                  ›
                </span>
                <span className="text-terminal-text group-hover:text-terminal-green group-hover:text-glow transition-all">
                  {chapter.title}
                </span>
              </Link>
            ))}
          </div>
        </CommandLine>
      </TerminalWindow>
    </div>
  );
}
