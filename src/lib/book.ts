import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BookMeta, ChapterMeta, Chapter } from "@/types/content";

const BOOK_DIR = path.join(process.cwd(), "content/book");
const CHAPTERS_DIR = path.join(BOOK_DIR, "chapters");

export function getBookMeta(): BookMeta | null {
  const metaPath = path.join(BOOK_DIR, "book.json");
  if (!fs.existsSync(metaPath)) return null;

  const raw = fs.readFileSync(metaPath, "utf-8");
  return JSON.parse(raw) as BookMeta;
}

export function getChapters(): ChapterMeta[] {
  const meta = getBookMeta();
  if (!meta || !fs.existsSync(CHAPTERS_DIR)) return [];

  return meta.chapters.map((slug, index) => {
    const filePath = path.join(CHAPTERS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return { slug, title: slug, order: index + 1 };
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      order: data.order ?? index + 1,
    };
  });
}

export function getChapter(slug: string): Chapter | null {
  const filePath = path.join(CHAPTERS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = getBookMeta();
  const index = meta?.chapters.indexOf(slug) ?? 0;

  return {
    slug,
    title: data.title ?? slug,
    order: data.order ?? index + 1,
    content,
  };
}
