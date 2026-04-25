"use client";

import { Event } from "@/types/content";

const TYPE_COLORS: Record<string, string> = {
  talk: "text-terminal-green",
  workshop: "text-terminal-amber",
  panel: "text-blue-400",
  meetup: "text-purple-400",
};

export default function EventCard({
  event,
  isLast,
}: {
  event: Event;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-4">
      {/* Timeline connector */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-3 h-3 border border-terminal-green bg-terminal-black rounded-full mt-1" />
        {!isLast && (
          <div className="w-px flex-1 bg-terminal-border" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3 className="text-terminal-text text-sm font-bold">
            {event.title}
          </h3>
          <span
            className={`text-xs ${TYPE_COLORS[event.type] || "text-terminal-dim"}`}
          >
            [{event.type}]
          </span>
        </div>

        <p className="text-terminal-dim text-xs mt-0.5">
          {event.event} — {event.date}
        </p>

        <p className="text-terminal-text/70 text-xs mt-2 leading-relaxed">
          {event.description}
        </p>

        <div className="flex gap-3 mt-2">
          {event.slidesUrl && (
            <a
              href={event.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green text-xs hover:text-glow"
            >
              [slides]
            </a>
          )}
          {event.videoUrl && (
            <a
              href={event.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green text-xs hover:text-glow"
            >
              [video]
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
