import { identity } from "@/content/profile";
import { cn } from "@/lib/utils";

interface MonogramProps {
  className?: string;
  /**
   * Visually-hidden text appended after "MD." so assistive technologies hear
   * the full name while the visible label stays part of the accessible name.
   */
  srLabel?: string;
}

/** Typographic "MD." monogram — the period is always vermilion. */
export function Monogram({ className, srLabel = identity.fullName }: MonogramProps) {
  return (
    <span className={cn("font-sans font-semibold tracking-[-0.04em] select-none", className)}>
      MD<span className="text-vermilion">.</span>
      {srLabel && <span className="sr-only"> {srLabel}</span>}
    </span>
  );
}
