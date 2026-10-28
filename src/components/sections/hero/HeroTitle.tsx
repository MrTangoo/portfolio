"use client";

import * as m from "motion/react-m";

const EASE = [0.16, 1, 0.3, 1] as const;

interface HeroTitleProps {
  lines: readonly string[];
}

/**
 * Each line slides up from behind a clipping mask, then the final period
 * stamps in vermilion — a nod to the Swiss poster tradition.
 */
export function HeroTitle({ lines }: HeroTitleProps) {
  return (
    <h1 className="text-display-xl font-semibold text-balance">
      {lines.map((line, index) => {
        const isLast = index === lines.length - 1;
        const endsWithPeriod = line.endsWith(".");
        const text = endsWithPeriod ? line.slice(0, -1) : line;
        return (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <m.span
              className="block will-change-transform"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 + index * 0.12 }}
            >
              {text}
              {endsWithPeriod && (
                <m.span
                  className={isLast ? "text-vermilion" : undefined}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: 0.15 + lines.length * 0.12 + 0.45,
                  }}
                  style={{ display: "inline-block", transformOrigin: "center 70%" }}
                >
                  .
                </m.span>
              )}
            </m.span>
          </span>
        );
      })}
    </h1>
  );
}
