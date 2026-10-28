type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Minimal class-name joiner (no runtime dependency needed). */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      const inner = cn(...value);
      if (inner) out.push(inner);
    } else {
      out.push(String(value));
    }
  }
  return out.join(" ");
}
