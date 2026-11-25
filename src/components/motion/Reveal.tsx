"use client";

import type { ReactNode, Ref } from "react";
import * as m from "motion/react-m";
import { useRevealTrigger } from "./useRevealTrigger";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Vertical offset in px. */
  y?: number;
  as?: "div" | "li" | "article" | "span";
  /** Trigger once (default) or every time it enters the viewport. */
  once?: boolean;
}

/** Fades and lifts content into place when it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  once = true,
}: RevealProps) {
  const Component = m[as];
  const trigger = useRevealTrigger({ opacity: 1, y: 0 }, once);
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Delay between children in seconds. */
  stagger?: number;
  as?: "div" | "ul" | "ol";
}

/** Container whose direct `StaggerItem` children animate one after the other. */
export function Stagger({ children, className, stagger = 0.08, as = "div" }: StaggerProps) {
  const Component = m[as];
  const trigger = useRevealTrigger("visible");
  return (
    <Component
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </Component>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
  as = "div",
  ref,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  ref?: Ref<HTMLElement>;
}) {
  const Component = m[as] as typeof m.div;
  return (
    <Component ref={ref as Ref<HTMLDivElement>} className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
