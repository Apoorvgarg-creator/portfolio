"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import GlitchText from "@/components/effects/GlitchText";
import ScrollReveal from "@/components/effects/ScrollReveal";
import EventCard from "./EventCard";
import { Event } from "@/types/content";

export default function EventsSection({ events }: { events: Event[] }) {
  return (
    <SectionWrapper id="events">
      <ScrollReveal>
        <GlitchText
          text="// talks & events"
          as="h2"
          className="text-2xl text-terminal-green text-glow mb-2"
        />
        <p className="text-terminal-dim text-sm mb-8">
          visitor@apoorv:~$ cat events.log | sort -r
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="max-w-2xl">
          {events.length === 0 ? (
            <p className="text-terminal-dim text-sm">
              No talks logged yet. Check back soon — currently organizing
              Grafana Friends &amp; Meetup events.
            </p>
          ) : (
            events.map((event, i) => (
              <EventCard
                key={event.title}
                event={event}
                isLast={i === events.length - 1}
              />
            ))
          )}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
