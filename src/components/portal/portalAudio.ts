// Lightweight Web Audio synthesis for the freeze/break sequence.
// No asset files — all sounds are built from a noise buffer + a few oscillators.
// Triggered from a user click so the AudioContext starts in "running" state.

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  ctx = new Ctx();
  masterGain = ctx.createGain();
  masterGain.gain.value = 0.6;
  masterGain.connect(ctx.destination);
  return ctx;
}

function makeNoiseBuffer(c: AudioContext, dur: number) {
  const len = Math.max(1, Math.floor(c.sampleRate * dur));
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    // exponential decay so it sounds like a transient crack, not steady noise
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.4);
  }
  return buf;
}

function playNoiseBurst(
  c: AudioContext,
  startAt: number,
  dur: number,
  level: number,
  cutoff: number
) {
  const src = c.createBufferSource();
  src.buffer = makeNoiseBuffer(c, dur);

  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = cutoff;
  hp.Q.value = 1.2;

  const g = c.createGain();
  g.gain.setValueAtTime(level, startAt);
  g.gain.exponentialRampToValueAtTime(0.001, startAt + dur);

  src.connect(hp).connect(g).connect(masterGain!);
  src.start(startAt);
  src.stop(startAt + dur + 0.02);
}

function playTinkle(c: AudioContext, startAt: number) {
  const osc = c.createOscillator();
  osc.type = "triangle";
  const f0 = 2400 + Math.random() * 3400;
  osc.frequency.setValueAtTime(f0, startAt);
  osc.frequency.exponentialRampToValueAtTime(f0 * 0.45, startAt + 0.18);

  const g = c.createGain();
  const peak = 0.05 + Math.random() * 0.06;
  g.gain.setValueAtTime(0.0001, startAt);
  g.gain.exponentialRampToValueAtTime(peak, startAt + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.18);

  osc.connect(g).connect(masterGain!);
  osc.start(startAt);
  osc.stop(startAt + 0.2);
}

function playSubThud(c: AudioContext, startAt: number) {
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, startAt);
  osc.frequency.exponentialRampToValueAtTime(34, startAt + 0.35);

  const g = c.createGain();
  g.gain.setValueAtTime(0.45, startAt);
  g.gain.exponentialRampToValueAtTime(0.001, startAt + 0.35);

  osc.connect(g).connect(masterGain!);
  osc.start(startAt);
  osc.stop(startAt + 0.36);
}

/** A single short "tap" crack — used for the pre-hit. */
export function playIceTap() {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const now = c.currentTime;
  playNoiseBurst(c, now, 0.16, 0.45, 2200);
  playTinkle(c, now + 0.005);
  playTinkle(c, now + 0.04);
}

/** The big shatter — long crack + sub-thud + cascading tinkles. */
export function playIceShatter() {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const now = c.currentTime;

  // Big crack body — two stacked noise bursts with different cutoffs
  playNoiseBurst(c, now, 0.42, 0.7, 1800);
  playNoiseBurst(c, now + 0.005, 0.32, 0.55, 4200);
  // Bass impact
  playSubThud(c, now);
  // Glass shards raining — 14 tinkles spread across 450ms
  for (let i = 0; i < 14; i++) {
    const t = now + 0.05 + i * 0.028 + Math.random() * 0.04;
    playTinkle(c, t);
  }
}

/** Frost crystallisation — a soft, breathy ascending whoosh. */
export function playFrost() {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const now = c.currentTime;
  // long low-level noise with rising highpass — sounds like ice forming
  const dur = 0.6;
  const src = c.createBufferSource();
  src.buffer = makeNoiseBuffer(c, dur);

  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.setValueAtTime(400, now);
  hp.frequency.exponentialRampToValueAtTime(3800, now + dur);
  hp.Q.value = 0.7;

  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.18, now + 0.15);
  g.gain.exponentialRampToValueAtTime(0.001, now + dur);

  src.connect(hp).connect(g).connect(masterGain!);
  src.start(now);
  src.stop(now + dur + 0.02);
}
