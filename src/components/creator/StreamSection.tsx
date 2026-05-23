"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CREATOR_LINKS, CREATOR_QUESTS } from "@/lib/creator";
import { usePortal } from "@/components/portal/PortalProvider";

const CHAT_LINES: { user: string; msg: string; tone?: "sub" | "host" | "spam" | "mod" }[] = [
  { user: "shorukenji",   msg: "POG that crit was insane",    tone: "sub" },
  { user: "kratos_main",  msg: "yo green hair zoro arc??",    tone: "mod" },
  { user: "saltyramen",   msg: "no way that landed lmaooo" },
  { user: "powderhunter", msg: "snowboard stream when ❄️" },
  { user: "katana_dad",   msg: "blade tier list incoming?" },
  { user: "luffy_was_here", msg: "GOMU GOMU NO" },
  { user: "anon_4828",    msg: "first time catching live, hi!" },
  { user: "darkr1der",    msg: "subbed. that intro card slaps", tone: "sub" },
  { user: "tokyolofi",    msg: "BGM track id pls?" },
  { user: "rin_chan",     msg: "the edit timing… chef's kiss" },
  { user: "mochabot",     msg: "+10 hype tokens",              tone: "mod" },
  { user: "scrub_lord",   msg: "we vibing" },
  { user: "moss_runner",  msg: "tonight's run was clean fr" },
  { user: "weeb_dev",     msg: "kratos build > sora build, fight me" },
  { user: "neo_kage",     msg: "5/5 needed for raid" },
];

function ToneStyle(tone?: "sub" | "host" | "spam" | "mod") {
  switch (tone) {
    case "sub": return "text-[color:var(--c-gold-bright)]";
    case "mod": return "text-[color:var(--c-jade)]";
    case "host": return "text-[color:var(--c-red-bright)]";
    default: return "text-[color:var(--c-ink)]/85";
  }
}

type ChatItem = (typeof CHAT_LINES)[number] & { id: number };

const CHAT_WINDOW = 10;
const CHAT_INTERVAL_MS = 1800;

export default function StreamSection() {
  const [feed, setFeed] = useState<ChatItem[]>([]);
  const idxRef = useRef(0);
  const { isActive: portalActive } = usePortal();

  useEffect(() => {
    // Don't start the chat tick while the portal transition is animating —
    // each new message causes a layout/animation pass that competes for
    // frames with the freeze/break overlay.
    if (portalActive) return;
    const tick = () => {
      idxRef.current += 1;
      const i = idxRef.current;
      const next: ChatItem = {
        ...CHAT_LINES[i % CHAT_LINES.length],
        id: i,
      };
      setFeed((f) => {
        const out = [...f, next];
        if (out.length > CHAT_WINDOW) out.shift();
        return out;
      });
    };
    tick();
    const t = setInterval(tick, CHAT_INTERVAL_MS);
    return () => clearInterval(t);
  }, [portalActive]);

  return (
    <section className="relative px-4 py-20 max-w-6xl mx-auto">
      <Divider label="// ch.1 — streams & socials" />

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mt-8">
        {/* LEFT: Stream window mock */}
        <div className="relative border border-[color:var(--c-border)] bg-black/60 rounded-sm overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[color:var(--c-border)] bg-black/70">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full bg-[color:var(--c-red-bright)]"
                style={{ animation: "pulse-live 1.2s ease-in-out infinite" }}
              />
              <span className="text-[color:var(--c-red-bright)] text-xs creator-stamp tracking-[0.2em]">
                LIVE
              </span>
              <span className="text-[color:var(--c-ink)]/60 text-xs ml-2">
                NihonkRatos · just chatting → ronin run
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] creator-stamp text-[color:var(--c-gold)]/80">
              <span>1080p60</span>
              <span>·</span>
              <span>04:23:11</span>
            </div>
          </div>

          {/* Viewport */}
          <div className="relative aspect-video">
            {/* Background — stylised sky/sea */}
            <div className="absolute inset-0 creator-grid" style={{
              background:
                "linear-gradient(180deg, #6fb6ff 0%, #b4d9fb 60%, #f3e3c0 100%)",
            }} />
            {/* Mast silhouette */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1a3a5b" />
                  <stop offset="1" stopColor="#08182b" />
                </linearGradient>
              </defs>
              <path d="M0 320 Q 200 305 400 318 T 800 320 L 800 450 L 0 450 Z" fill="url(#sea)" opacity="0.85" />
              <path d="M0 340 Q 200 325 400 338 T 800 340 L 800 450 L 0 450 Z" fill="#020a14" opacity="0.7" />
              {/* sun */}
              <circle cx="640" cy="140" r="60" fill="#ffd16a" opacity="0.85" />
              <circle cx="640" cy="140" r="100" fill="#ffd16a" opacity="0.18" />
              {/* mast + sail */}
              <rect x="200" y="60" width="6" height="260" fill="#3a2418" />
              <path d="M 206 80 Q 320 150 206 240 Z" fill="#f5e6c8" stroke="#3a2418" strokeWidth="2" opacity="0.95" />
              <path d="M 206 100 L 280 130 L 206 160 Z" fill="#d62828" opacity="0.85" />
              {/* katana glint streak */}
              <line x1="80" y1="380" x2="540" y2="80" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
            </svg>

            {/* Character marker (avatar PiP) */}
            <div className="absolute bottom-3 left-3 w-24 h-24 rounded-sm overflow-hidden border-2 border-[color:var(--c-gold)] bg-black/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nihonkratos-avatar.png"
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* HUD overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-[10px] creator-stamp">
              <div className="space-y-1">
                <div className="px-2 py-1 bg-black/60 text-[color:var(--c-gold)] inline-block">
                  WORLD 1-1 · GRAND LINE
                </div>
                <div className="px-2 py-1 bg-black/60 text-[color:var(--c-ink)]/80 inline-block">
                  WIND ↗ · TIDE +2 · CALM
                </div>
              </div>
              <div className="text-right">
                <div className="px-2 py-1 bg-black/60 text-[color:var(--c-red-bright)] inline-block">
                  HP 84/100
                </div>
              </div>
            </div>

            {/* Click-to-follow CTA bar */}
            <a
              href="https://www.twitch.tv/nihonkratos"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-3 bottom-3 ml-28 group block"
            >
              <div className="bg-[color:var(--c-red)] text-white px-3 py-2 text-[11px] creator-stamp tracking-[0.2em] flex items-center justify-between border border-black/40 group-hover:bg-[color:var(--c-red-bright)] transition-colors">
                <span>▶ JOIN THE RAID · twitch.tv/nihonkratos</span>
                <span className="text-white/80">↗</span>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT: live chat */}
        <div className="relative border border-[color:var(--c-border)] bg-black/60 rounded-sm flex flex-col min-h-[360px]">
          <div className="px-4 py-2.5 border-b border-[color:var(--c-border)] text-xs creator-stamp text-[color:var(--c-gold)] flex items-center justify-between">
            <span>{"// chat"}</span>
            <span className="text-[color:var(--c-ink)]/60 normal-case text-[10px]">
              {feed.length > 0 ? `${feed.length} active` : "connecting..."}
            </span>
          </div>
          <div
            className="flex-1 overflow-hidden px-3 py-2 text-[12px] leading-relaxed font-mono flex flex-col justify-end"
            style={{
              maskImage:
                "linear-gradient(180deg, transparent 0, #000 24px, #000 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0, #000 24px, #000 100%)",
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {feed.map((c) => (
                <motion.div
                  key={c.id}
                  layout="position"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="flex gap-1.5 py-0.5"
                >
                  <span className={`${ToneStyle(c.tone)} font-bold shrink-0`}>
                    {c.user}
                    <span className="text-[color:var(--c-ink)]/40">:</span>
                  </span>
                  <span className="text-[color:var(--c-ink)]/80">{c.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="px-3 py-2 border-t border-[color:var(--c-border)] flex items-center gap-2 text-[12px]">
            <span className="text-[color:var(--c-gold)] creator-stamp text-[10px]">
              SAY:
            </span>
            <span className="text-[color:var(--c-ink)]/40 italic">
              chat is open on the real stream →
            </span>
          </div>
        </div>
      </div>

      {/* Channel cards */}
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {CREATOR_LINKS.map((l) => (
          <ChannelCard key={l.id} link={l} />
        ))}
      </div>

      {/* Quest log */}
      <div className="mt-12">
        <Divider label="// quest log" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {CREATOR_QUESTS.map((q, i) => (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative border border-[color:var(--c-border)] creator-paper p-4"
            >
              <div className="text-3xl mb-2">{q.icon}</div>
              <div className="text-[color:var(--c-gold-bright)] creator-stamp text-xs mb-1">
                {q.title}
              </div>
              <div className="text-[color:var(--c-ink)]/75 text-sm">
                {q.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelCard({ link }: { link: (typeof CREATOR_LINKS)[number] }) {
  const [hovering, setHovering] = useState(false);
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative group block border border-[color:var(--c-border)] bg-black/55 p-5 overflow-hidden transition-colors hover:border-[color:var(--c-gold)]"
    >
      {/* Hover slash */}
      <div
        className="absolute -inset-4 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
          transform: hovering ? "translateX(60%)" : "translateX(-100%)",
          transition: "transform 0.7s ease",
        }}
      />
      <div className="flex items-start justify-between">
        <div>
          <div className="creator-stamp text-[10px] tracking-[0.25em]" style={{ color: link.color }}>
            {link.label}
          </div>
          <div className="text-[color:var(--c-ink)] text-xl mt-1 font-bold">
            {link.handle}
          </div>
          <div className="text-[color:var(--c-ink)]/60 text-xs mt-1">
            {link.subtitle}
          </div>
        </div>
        <span
          className="text-2xl"
          style={{ color: link.color, textShadow: `0 0 16px ${link.color}80` }}
        >
          ↗
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="creator-stamp text-[10px] text-[color:var(--c-gold)]">
          {link.cta}
        </span>
        <span
          className="h-px flex-1 mx-3"
          style={{ background: `linear-gradient(90deg, transparent, ${link.color}aa, transparent)` }}
        />
        <span className="creator-stamp text-[10px] text-[color:var(--c-ink)]/60">
          ENTER →
        </span>
      </div>
    </a>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[color:var(--c-gold)] creator-stamp text-xs">
        {label}
      </span>
      <span className="flex-1 h-px bg-gradient-to-r from-[color:var(--c-gold)] via-[color:var(--c-gold)]/30 to-transparent" />
    </div>
  );
}
