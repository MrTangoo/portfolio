import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  /** Switches to the dark (ink) theme and inverts text colours. */
  tone?: "paper" | "paper-deep" | "white" | "ink";
  children: ReactNode;
}

const tones = {
  paper: "bg-paper text-ink",
  "paper-deep": "bg-paper-deep text-ink",
  white: "bg-white text-ink",
  ink: "theme-dark bg-ink text-paper",
} as const;

export function Section({ id, tone = "paper", className, children, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-[calc(4rem_-_var(--spacing-section))] py-section", tones[tone], className)}
      {...rest}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
