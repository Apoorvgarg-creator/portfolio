import fs from "fs";
import path from "path";
import { Event } from "@/types/content";

const EVENTS_PATH = path.join(process.cwd(), "content/events/events.json");

export function getEvents(): Event[] {
  if (!fs.existsSync(EVENTS_PATH)) return [];
  const raw = fs.readFileSync(EVENTS_PATH, "utf-8");
  return JSON.parse(raw) as Event[];
}
