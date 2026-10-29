"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { useRef, type RefObject } from "react";
import { useInView } from "motion/react";
import { StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { Timeline } from "../Timeline";
import type { Chapter } from "./chapters";
import { EntryIcon } from "./RedThread";

/** Square on the spine — turns vermilion while the chapter crosses the reading zone. */
function ChapterDot() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as RefObject<Element | null>, {
    margin: "-35% 0px -45% 0px",
  });
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "absolute top-12 -left-0.5 z-10 size-3 transition-all duration-500 ease-out-expo",
        inView ? "scale-110 bg-vermilion" : "bg-ink/40",
      )}
    />
  );
}

/**
 * Mobile / fallback rendering of THE RED THREAD — same chapters as the
 * desktop pinned version, stacked per year for small screens.
 */
interface MobileThreadProps {
  chapters: readonly Chapter[];
  timelineLabel: string;
  todayLabel: string;
}

export function MobileThread({ chapters, timelineLabel, todayLabel }: MobileThreadProps) {
  return (
    <div className="mt-14 xl:hidden">
      <Timeline label={timelineLabel}>
        {chapters.map((chapter) => (
          <StaggerItem
            as="li"
            key={chapter.id}
            className="relative border-b border-line last:border-b-0"
          >
            <ChapterDot />
            <article
              aria-label={`${chapter.kind} - ${chapter.year || todayLabel}`}
              className="py-10 pl-6"
            >
              {chapter.final ? (
                <>
                  <p className="label text-vermilion-deep">{chapter.final.label}</p>
                  <h3 className="mt-5 text-display-sm font-semibold tracking-[-0.02em]">
                    {chapter.final.title}
                  </h3>
                  <p className="mt-5 text-base">{chapter.final.text}</p>
                  <p className="mt-3 text-base text-pretty text-steel">{chapter.final.sub}</p>
                </>
              ) : (
                <>
                  {chapter.year && (
                    <p
                      aria-hidden="true"
                      className="text-6xl leading-none font-semibold tracking-[-0.035em]"
                    >
                      {chapter.year}
                    </p>
                  )}
                  <p className="label mt-5 text-vermilion-deep">
                    {chapter.index} / {chapter.kind}
                  </p>
                  <h3 className="mt-3 text-display-sm font-semibold tracking-[-0.02em]">
                    {chapter.editorial}
                  </h3>

                  {chapter.entries.map((entry, index) => (
                    <div
                      key={entry.title}
                      className={cn("mt-7", index > 0 && "border-t border-line pt-6")}
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <p
                            className={cn(
                              "flex items-center gap-2.5 font-semibold tracking-[-0.015em]",
                              index === 0 ? "text-xl" : "text-base",
                            )}
                          >
                            <EntryIcon
                              kind={entry.icon}
                              className={cn(
                                "shrink-0 text-vermilion",
                                index === 0 ? "size-5" : "size-4",
                              )}
                            />
                            {entry.title}
                          </p>
                          <p className="mt-1.5 text-base font-medium text-steel">{entry.org}</p>
                        </div>
                        {entry.logo && (
                          <Image
                            src={entry.logo.src}
                            alt={entry.logo.alt}
                            width={entry.logo.width}
                            height={entry.logo.height}
                            sizes="112px"
                            className="hidden h-10 w-28 shrink-0 object-contain object-right sm:block"
                          />
                        )}
                      </div>
                      <p className="label mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-steel tabular">
                        <span className="inline-flex items-center gap-2">
                          <Calendar aria-hidden="true" className="size-3.5 text-vermilion" />
                          {entry.period}
                        </span>
                        {entry.detail && (
                          <span className="inline-flex items-center gap-2">
                            <MapPin aria-hidden="true" className="size-3.5 text-vermilion" />
                            {entry.detail}
                          </span>
                        )}
                      </p>
                      {(entry.status || entry.badge) && (
                        <p className="label mt-3 inline-flex items-center gap-3 text-vermilion-deep">
                          <span aria-hidden="true" className="block size-1.5 bg-vermilion" />
                          {[entry.status, entry.badge].filter(Boolean).join(" - ")}
                        </p>
                      )}
                      {entry.summary && (
                        <p className="mt-3 text-base leading-relaxed text-pretty text-steel">
                          {entry.summary}
                        </p>
                      )}
                    </div>
                  ))}
                </>
              )}
            </article>
          </StaggerItem>
        ))}
      </Timeline>
    </div>
  );
}
