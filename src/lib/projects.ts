import fs from "fs";
import path from "path";
import { Project } from "@/types/content";

const PROJECTS_PATH = path.join(process.cwd(), "content/projects/projects.json");

export function getProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_PATH)) return [];
  const raw = fs.readFileSync(PROJECTS_PATH, "utf-8");
  return JSON.parse(raw) as Project[];
}
