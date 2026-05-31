export type PathPoint = { x: number; y: number };

/** Smooth cubic path through milestone centres with a gentle horizontal weave */
export function buildWavyPath(points: PathPoint[], weave = 6): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  const woven = points.map((p, i) => ({
    x: p.x + (i % 2 === 0 ? -weave : weave),
    y: p.y,
  }));

  let d = `M ${woven[0].x} ${woven[0].y}`;

  for (let i = 1; i < woven.length; i++) {
    const prev = woven[i - 1];
    const curr = woven[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }

  return d;
}

/** Dot scale grows slightly from first to last stop */
export function milestoneDotSize(
  index: number,
  total: number,
  isHere: boolean
): number {
  if (isHere) return 14;
  const t = total <= 1 ? 1 : index / (total - 1);
  return 8 + t * 4;
}
