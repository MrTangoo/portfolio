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
    <StaggerItem ref={ref} as="li" className="group relative border-b border-line">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-11 -left-0.5 z-10 size-3 transition-all duration-500 ease-out-expo lg:top-15",
          current || inView ? "scale-110 bg-vermilion" : "bg-ink/40",
        )}
      />
      <article className="grid-editorial items-start gap-y-4 py-10 pl-5 lg:py-14 lg:pl-6">
        <div className="col-span-12 flex flex-col gap-2 lg:col-span-3">
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

        <div className="col-span-12 lg:col-span-9">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h4 className="text-display-md font-semibold tracking-[-0.02em]">{title}</h4>
              <p className="mt-1 text-base font-medium text-steel">
                {organisation}
                {organisationDetail && (
                  <span className="block text-base font-normal text-steel">
                    {organisationDetail}
                  </span>
                )}
              </p>
            </div>
            {logo && (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="160px"
                className={cn(
                  "logo-mono mt-1 h-9 w-28 shrink-0 object-contain object-right lg:h-12 lg:w-40",
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
