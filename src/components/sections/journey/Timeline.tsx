"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";

interface TimelineProps {
  children: ReactNode;
  label: string;
}

/**
 * Ordered list with a thin vertical rule that draws itself as the user scrolls
 * through the entries. Purely decorative — the list is fully readable without it.
 * Direct children are expected to be `StaggerItem`s so they animate in sequence.
 */
export function Timeline({ children, label }: TimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <m.ol
      ref={ref}
      aria-label={label}
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.12 }}
    >
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-[3px] w-px bg-line" />
      <m.span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[3px] w-px origin-top bg-ink"
        style={{ scaleY }}
      />
      {children}
    </m.ol>
  );
}
