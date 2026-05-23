"use client";

import Link from "next/link";
import { CREATOR_LINKS } from "@/lib/creator";

export default function CreatorFooter() {
  return (
    <footer className="relative border-t border-[color:var(--c-border)] mt-10 bg-black/60">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="creator-stamp text-[color:var(--c-gold)] text-xs mb-2">
            {"// sign-off"}
          </div>
          <div className="text-2xl font-black text-[color:var(--c-red-bright)] glow-red leading-none">
            NIHONkRATOS
          </div>
          <div className="text-[color:var(--c-ink)]/60 text-sm mt-2">
            日本 × κράτος — eastern blade, greek strength.
          </div>
        </div>
        <div>
          <div className="creator-stamp text-[color:var(--c-gold)] text-xs mb-2">
            {"// channels"}
          </div>
          <ul className="space-y-1.5 text-sm">
            {CREATOR_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--c-ink)]/85 hover:text-[color:var(--c-gold-bright)] transition-colors"
                >
                  <span style={{ color: l.color }}>●</span> {l.label} ·{" "}
                  <span className="text-[color:var(--c-ink)]/60">
                    {l.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="creator-stamp text-[color:var(--c-gold)] text-xs mb-2">
            {"// exit door"}
          </div>
          <p className="text-[color:var(--c-ink)]/60 text-sm mb-3">
            The dev side is just a hammer-swing away.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[color:var(--c-gold)]/70 px-3 py-2 text-[10px] creator-stamp text-[color:var(--c-gold)] hover:bg-[color:var(--c-gold)]/10 transition-colors"
          >
            ← Back to /dev (no animation)
          </Link>
        </div>
      </div>
      <div className="border-t border-[color:var(--c-border)] py-3 text-center text-[10px] creator-stamp text-[color:var(--c-ink)]/40">
        © NIHONkRATOS · ronin build · v0.1
      </div>
    </footer>
  );
}
