import type { Metadata } from "next";
import CreatorHero from "@/components/creator/CreatorHero";
import StreamSection from "@/components/creator/StreamSection";
import SnowboardSection from "@/components/creator/SnowboardSection";
import CreatorFooter from "@/components/creator/CreatorFooter";

export const metadata: Metadata = {
  title: "NihonkRatos — Streamer · Snowboarder",
  description:
    "The creator side of Apoorv Garg. Twitch streams as NihonkRatos, YouTube edits, snowboard log, and a samurai-pirate aesthetic.",
  openGraph: {
    title: "NihonkRatos — Creator Mode",
    description:
      "Twitch · YouTube · Instagram · Snowboarding. The creator alter-ego.",
  },
};

export default function CreatorPage() {
  return (
    <div className="creator-surface relative">
      {/* Background grid + scanline drift */}
      <div className="absolute inset-0 creator-grid pointer-events-none opacity-50" />

      <CreatorHero />
      <StreamSection />
      <SnowboardSection />
      <CreatorFooter />
    </div>
  );
}
