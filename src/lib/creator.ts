export const CREATOR = {
  handle: "NihonkRatos",
  tagline: "Streamer • Snowboarder • Story-driven gamer",
  motto: "Nihon (日本) × Kratos (κράτος) — Eastern blade, Greek strength.",
  avatar: "/nihonkratos-avatar.png",
};

export const CREATOR_LINKS = [
  {
    id: "twitch",
    label: "Twitch",
    handle: "nihonkratos",
    url: "https://www.twitch.tv/nihonkratos",
    color: "#9146FF",
    cta: "FOLLOW LIVE",
    subtitle: "Live gameplay & first-runs",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@NihonkRatos",
    url: "https://www.youtube.com/@NihonkRatos",
    color: "#FF0033",
    cta: "SUBSCRIBE",
    subtitle: "Edits, breakdowns, snow runs",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "nihonkratos",
    url: "https://www.instagram.com/nihonkratos/",
    color: "#E1306C",
    cta: "FOLLOW",
    subtitle: "Behind the helmet — daily",
  },
] as const;

export const CREATOR_QUESTS = [
  {
    icon: "⚔️",
    title: "Story-driven runs",
    desc: "Pirate, samurai, mythology — if it tells a story, it's on stream.",
  },
  {
    icon: "🎮",
    title: "Co-op nights",
    desc: "Drop in, pick a class, no judgement, full chaos.",
  },
  {
    icon: "🎬",
    title: "YouTube edits",
    desc: "Cinematic clips, breakdowns, and montages weekly.",
  },
  {
    icon: "🏂",
    title: "Snow chapters",
    desc: "Off-platform: powder days, board reviews, mountain logs.",
  },
];

export const SNOW_TRICKS = [
  { name: "180 Indy", difficulty: 2 },
  { name: "Frontside 360", difficulty: 3 },
  { name: "Cab 540", difficulty: 4 },
  { name: "Method Air", difficulty: 3 },
  { name: "Backside Rodeo", difficulty: 5 },
  { name: "Powder Carve", difficulty: 1 },
];

export const SNOW_LOG = [
  { mountain: "Niseko", country: "JP", days: 9, vibe: "Knee-deep, mid-storm" },
  { mountain: "Hakuba", country: "JP", days: 5, vibe: "Bluebird, long lines" },
  { mountain: "Whistler", country: "CA", days: 7, vibe: "Park laps + alpine" },
  { mountain: "Gulmarg", country: "IN", days: 4, vibe: "Untracked, surreal" },
];
