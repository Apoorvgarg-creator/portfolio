// Column-based snow pile model + renderer.
// The pile is a Float32Array of column heights (in CSS pixels).
// Snowflakes that hit the pile deposit a small amount of mass, with a slight
// spread to neighboring columns so the pile reads as smooth dunes, not stairs.

export const COL_W = 8;
export const MAX_PILE = 80;
export const DEPOSIT = 0.6;
export const NEIGHBOR_DEPOSIT = 0.2;

export function makeColumns(width: number): Float32Array {
  return new Float32Array(Math.max(1, Math.ceil(width / COL_W)));
}

export function depositAt(
  columns: Float32Array,
  x: number,
  amount = DEPOSIT
): void {
  const col = clamp(Math.floor(x / COL_W), 0, columns.length - 1);
  columns[col] = Math.min(MAX_PILE, columns[col] + amount);
  if (col > 0) {
    columns[col - 1] = Math.min(
      MAX_PILE,
      columns[col - 1] + NEIGHBOR_DEPOSIT
    );
  }
  if (col < columns.length - 1) {
    columns[col + 1] = Math.min(
      MAX_PILE,
      columns[col + 1] + NEIGHBOR_DEPOSIT
    );
  }
}

export function pileHeightAt(columns: Float32Array, x: number): number {
  const col = clamp(Math.floor(x / COL_W), 0, columns.length - 1);
  return columns[col];
}

export function drawPile(
  ctx: CanvasRenderingContext2D,
  columns: Float32Array,
  width: number,
  height: number,
  fill: string | CanvasGradient
): void {
  ctx.beginPath();
  ctx.moveTo(0, height);
  // Slight smoothing: average across a 3-wide window for the visual top.
  for (let i = 0; i < columns.length; i++) {
    const left = columns[Math.max(0, i - 1)];
    const cur = columns[i];
    const right = columns[Math.min(columns.length - 1, i + 1)];
    const smooth = (left + cur + right) / 3;
    const x = i * COL_W;
    ctx.lineTo(x, height - smooth);
  }
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

export function resampleColumns(
  prev: Float32Array,
  newWidth: number
): Float32Array {
  const next = makeColumns(newWidth);
  if (prev.length === 0) return next;
  for (let i = 0; i < next.length; i++) {
    const ratio = i / Math.max(1, next.length - 1);
    const sourceIndex = ratio * (prev.length - 1);
    const a = Math.floor(sourceIndex);
    const b = Math.min(prev.length - 1, a + 1);
    const t = sourceIndex - a;
    next[i] = prev[a] * (1 - t) + prev[b] * t;
  }
  return next;
}

function clamp(n: number, lo: number, hi: number): number {
  return n < lo ? lo : n > hi ? hi : n;
}
