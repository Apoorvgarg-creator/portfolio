import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EventsSection from "@/components/sections/EventsSection";
import BlogSection from "@/components/sections/BlogSection";
import BookSection from "@/components/sections/BookSection";
import SocialSection from "@/components/sections/SocialSection";
import AsciiDivider from "@/components/effects/AsciiDivider";
import { getProjects } from "@/lib/projects";
import { getEvents } from "@/lib/events";
import { getBlogPosts } from "@/lib/mdx";
import { getBookMeta } from "@/lib/book";

export default function Home() {
  const projects = getProjects();
  const events = getEvents();
  const posts = getBlogPosts();
  const book = getBookMeta();

  return (
    <>
      <HeroSection />
      <AsciiDivider variant={0} />
      <AboutSection />
      <AsciiDivider variant={1} />
      <ProjectsSection projects={projects} />
      <AsciiDivider variant={2} />
      <EventsSection events={events} />
      <AsciiDivider variant={3} />
      <BlogSection posts={posts} />
      <AsciiDivider variant={4} />
      <BookSection book={book} />
      <AsciiDivider variant={0} />
      <SocialSection />
    </>
  );
}
