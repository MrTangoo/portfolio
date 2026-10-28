"use client";

import Image from "next/image";
import { useRef, type ReactNode, type RefObject } from "react";
import { useInView } from "motion/react";
import { StaggerItem } from "@/components/motion/Reveal";
import type { Logo, Period } from "@/content/profile";
import { formatYearMonth, toDateTime } from "@/lib/dates";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  period: Period;
  title: string;
  organisation: string;
  organisationDetail?: string;
  location?: string;
  status?: ReactNode;
  logo?: Logo;
  children: ReactNode;
  current?: boolean;
}

export function TimelineItem({
  period,
  title,
  organisation,
  organisationDetail,
  location,
  status,
  logo,
  children,
  current = false,
}: TimelineItemProps) {
  const ref = useRef<HTMLElement | null>(null);
  /** Hover look while the entry crosses the reading zone of the viewport. */
  const inView = useInView(ref as RefObject<Element | null>, {
    margin: "-35% 0px -45% 0px",
  });

  return (
    <StaggerItem ref={ref} as="li" className="group relative pb-14 pl-8 last:pb-0 lg:pl-12">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[0.45em] left-0 size-[7px] rounded-full ring-4 ring-paper-deep transition-colors duration-300",
          current || inView ? "bg-vermilion" : "bg-ink group-hover:bg-vermilion",
        )}
      />
      <article className="grid gap-y-4 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-10">
        <div className="flex flex-col gap-2">
          <p className="label text-steel tabular">
            <time dateTime={toDateTime(period.start)}>{formatYearMonth(period.start)}</time>
            <span aria-hidden="true"> — </span>
            {period.end ? (
              <time dateTime={toDateTime(period.end)}>{formatYearMonth(period.end)}</time>
            ) : (
              <span className="text-vermilion-deep">Aujourd&apos;hui</span>
            )}
          </p>
          {status && <p className="label text-vermilion-deep">{status}</p>}
          {location && <p className="text-meta text-steel">{location}</p>}
        </div>

        <div>
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h4 className="text-display-sm font-semibold tracking-[-0.02em]">{title}</h4>
              <p className="mt-1 text-base font-medium text-steel">
                {organisation}
                {organisationDetail && (
                  <span className="block text-sm font-normal text-steel">{organisationDetail}</span>
                )}
              </p>
            </div>
            {logo && (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="120px"
                className={cn(
                  "logo-mono mt-1 h-6 w-20 shrink-0 object-contain object-right lg:h-8 lg:w-28",
                  inView && "logo-mono-current",
                )}
              />
            )}
          </div>
          <div className="mt-5 max-w-[60ch]">{children}</div>
        </div>
      </article>
    </StaggerItem>
  );
}
