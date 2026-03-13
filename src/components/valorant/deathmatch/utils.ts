export function calcKD(k: number | null | undefined, d: number | null | undefined) {
  if (k == null || d == null) return null;
  if (d === 0) return k > 0 ? Infinity : null;
  return k / d;
}

export function kdDisplay(k: number | null | undefined, d: number | null | undefined) {
  const r = calcKD(k, d);
  if (r === null) return "—";
  if (r === Infinity) return "∞";
  return r.toFixed(2);
}

export function kdClass(k: number | null | undefined, d: number | null | undefined) {
  const r = calcKD(k, d);
  if (r === null || r === Infinity) return "text-secondary/40";
  return r >= 1 ? "text-emerald-500" : "text-red-500";
}

export function fmtDate(ts: string) {
  return new Date(ts).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

export const INPUT =
  "w-full px-3 py-2 bg-secondary/10 border border-secondary/20 rounded-md text-foreground text-sm focus:outline-none focus:border-primary/50 focus:bg-secondary/15 transition-all placeholder:text-secondary/40";

export const NUM_INPUT =
  INPUT +
  " text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

export const SELECT_INPUT =
  "w-full px-3 py-2 bg-[var(--background)] border border-secondary/20 rounded-md text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all [&>option]:bg-[var(--background)] [&>option]:text-foreground";
