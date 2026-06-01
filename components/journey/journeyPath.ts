export type PathPoint = { x: number; y: number };

/** Smooth cubic path through milestone centres */
export function buildWavyPath(points: PathPoint[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
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

/** Schedule path measurement after layout + motion settle */
export function schedulePathMeasure(measure: () => void): () => void {
  let raf1 = 0;
  let raf2 = 0;
  const timers: ReturnType<typeof setTimeout>[] = [];

  raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(measure);
  });

  for (const ms of [50, 200, 450, 750]) {
    timers.push(setTimeout(measure, ms));
  }

  return () => {
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
    timers.forEach(clearTimeout);
  };
}
