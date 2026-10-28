"use client";

import Image from "next/image";
import { Award, Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react";
import { useRef } from "react";
import { CHAPTERS } from "./chapters";
import type { EntryKind } from "./chapters";
import { DevScreen } from "./DevScreen";
import { useRedThread } from "./useRedThread";

const ENTRY_ICONS: Record<EntryKind, typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
  certification: Award,
};

export function EntryIcon({ kind, className }: { kind: EntryKind; className: string }) {
  const Icon = ENTRY_ICONS[kind];
  return <Icon aria-hidden="true" className={className} />;
}

/**
 * THE RED THREAD — scroll-driven journey.
 * Wide screens (xl+): the stage pins while a scrubbed timeline plays the five
 * chapters — monumental year + chapter title on top, events left-aligned
 * across both columns below.
 * Fallback: scenes render as a static stacked list — readable without JS.
 */
export function RedThread() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useRedThread(scopeRef);

  return (
    <div ref={scopeRef} className="mt-14 hidden xl:mt-20 xl:block">
      <div data-rt-stage className="relative">
        {/* Zone A — meta + progression, kept clear of the fixed header */}
        <div className="pointer-events-none absolute top-24 left-[5%] z-30">
          <p className="label text-steel">Parcours — le fil conducteur</p>
          <p className="label mt-4 flex items-baseline gap-2 tabular">
            <span data-rt-counter className="text-2xl font-semibold text-ink">
              01
            </span>
            <span className="text-steel">/ {String(CHAPTERS.length).padStart(2, "0")}</span>
          </p>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[24%] left-[5%] z-30 w-px bg-line"
        >
          <span
            data-rt-fill
            className="absolute inset-0 origin-top bg-vermilion"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {CHAPTERS.map((chapter) => {
          const [primary, ...secondary] = chapter.entries;
          return (
            <section
              key={chapter.id}
              data-rt-scene={chapter.id}
              aria-label={`${chapter.kind} — ${chapter.year || "Aujourd'hui"}`}
              className="relative min-h-[90svh] border-b border-line py-24 last:border-b-0"
            >
              {chapter.final ? (
                /* Final scene — the title is the graphic subject itself */
                <div className="absolute top-[30%] left-[7%] w-[min(44rem,54vw)]">
                  <p data-rt-content className="label text-vermilion-deep">
                    {chapter.final.label}
                  </p>
                  <h3
                    data-rt-content
                    className="mt-8 text-display-lg font-semibold tracking-[-0.03em] text-pretty"
                  >
                    {chapter.final.title}
                  </h3>
                  <div data-rt-content className="mt-10 flex items-center gap-4">
                    <span aria-hidden="true" className="block h-px w-16 bg-steel-soft" />
                    <span aria-hidden="true" className="block size-1.5 bg-vermilion" />
                  </div>
                  <p data-rt-content className="mt-8 text-lg">
                    {chapter.final.text}
                  </p>
                  <p data-rt-content className="mt-4 max-w-[52ch] text-base text-pretty text-steel">
                    {chapter.final.sub}
                  </p>
                </div>
              ) : (
                <>
                  {/* Chapter title — right column, top aligned with the year */}
                  <div className="absolute top-[20%] right-[6%] w-[min(32rem,44vw)]">
                    <p data-rt-content className="label text-vermilion-deep">
                      {chapter.index} / {chapter.kind}
                    </p>
                    <h3
                      data-rt-content
                      className="mt-5 text-display-md font-semibold tracking-[-0.02em]"
                    >
                      {chapter.editorial}
                    </h3>
                  </div>

                  {/* Year + events — stacked directly below, events span both columns */}
                  <div className="absolute top-[19%] right-[6%] left-[7%]">
                    {chapter.year && (
                      <p
                        aria-hidden="true"
                        data-rt-year
                        className="text-[clamp(6rem,15vw,14rem)] leading-none font-semibold tracking-[-0.035em]"
                      >
                        {chapter.year}
                      </p>
                    )}

                    {primary && (
                      <>
                        <div data-rt-content className="mt-6 flex items-center gap-4">
                          <span aria-hidden="true" className="block h-px w-14 bg-steel-soft" />
                          <span aria-hidden="true" className="block size-1.5 bg-vermilion" />
                        </div>
                        <div data-rt-content className="mt-6">
                          <div className="flex items-center gap-10">
                            <div className="min-w-0">
                              <p className="flex items-center gap-3.5 text-2xl font-semibold tracking-[-0.015em] xl:text-3xl">
                                <EntryIcon
                                  kind={primary.icon}
                                  className="size-6 shrink-0 text-vermilion"
                                />
                                {primary.title}
                              </p>
                              <p className="mt-2 text-lg font-medium text-steel">{primary.org}</p>
                            </div>
                            {primary.logo && (
                              <Image
                                src={primary.logo.src}
                                alt={primary.logo.alt}
                                width={primary.logo.width}
                                height={primary.logo.height}
                                sizes="176px"
                                className="h-14 w-44 shrink-0 object-contain object-left"
                              />
                            )}
                          </div>
                          <p className="label mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-steel tabular">
                            <span className="inline-flex items-center gap-2">
                              <Calendar aria-hidden="true" className="size-3.5 text-vermilion" />
                              {primary.period}
                            </span>
                            {primary.detail && (
                              <span className="inline-flex items-center gap-2">
                                <MapPin aria-hidden="true" className="size-3.5 text-vermilion" />
                                {primary.detail}
                              </span>
                            )}
                          </p>
                          {(primary.status || primary.badge) && (
                            <p className="label mt-3 text-vermilion-deep">
                              {[primary.status, primary.badge].filter(Boolean).join(" — ")}
                            </p>
                          )}
                          {primary.summary && (
                            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-pretty text-steel">
                              {primary.summary}
                            </p>
                          )}
                        </div>

                        {secondary.map((entry) => (
                          <div
                            key={entry.title}
                            data-rt-content
                            className="mt-6 border-t border-line pt-5"
                          >
                            <div className="flex items-baseline justify-between gap-6">
                              <p className="flex items-center gap-2.5 text-base font-medium">
                                <EntryIcon
                                  kind={entry.icon}
                                  className="size-4 shrink-0 self-center text-vermilion"
                                />
                                {entry.title}
                                <span className="font-normal text-steel"> — {entry.org}</span>
                              </p>
                              {entry.logo && (
                                <Image
                                  src={entry.logo.src}
                                  alt={entry.logo.alt}
                                  width={entry.logo.width}
                                  height={entry.logo.height}
                                  sizes="128px"
                                  className="h-9 w-32 shrink-0 object-contain object-right"
                                />
                              )}
                            </div>
                            <p className="label mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                              {(entry.status || entry.badge) && (
                                <span className="inline-flex items-center gap-3 text-vermilion-deep">
                                  <span
                                    aria-hidden="true"
                                    className="block size-1.5 bg-vermilion"
                                  />
                                  {[entry.status, entry.badge].filter(Boolean).join(" — ")}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-2 text-steel">
                                <Calendar aria-hidden="true" className="size-3.5 text-vermilion" />
                                {entry.period}
                              </span>
                              {entry.detail && (
                                <span className="inline-flex items-center gap-2 text-steel">
                                  <MapPin aria-hidden="true" className="size-3.5 text-vermilion" />
                                  {entry.detail}
                                </span>
                              )}
                            </p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </>
              )}

              {chapter.final && (
                <div
                  data-rt-screen
                  aria-hidden="true"
                  className="absolute top-[30%] right-[7%] w-[min(320px,24vw)]"
                >
                  <DevScreen />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
