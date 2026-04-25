export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  stars?: number;
  language: string;
  tags: string[];
}

export interface Event {
  title: string;
  event: string;
  date: string;
  type: "talk" | "workshop" | "panel" | "meetup";
  slidesUrl?: string;
  videoUrl?: string;
  description: string;
}

export interface BookMeta {
  title: string;
  description: string;
  chapters: string[];
}

export interface ChapterMeta {
  slug: string;
  title: string;
  order: number;
}

export interface Chapter extends ChapterMeta {
  content: string;
}

export interface SocialLink {
  label: string;
  command: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}
