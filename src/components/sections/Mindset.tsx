import {
  ArrowUpRight,
  BookOpen,
  Bot,
  FlaskConical,
  Layers,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n";
import { GITHUB_REPO } from "@/content/site";

const principleIcons = {
  "book-open": BookOpen,
  wrench: Wrench,
  layers: Layers,
  bot: Bot,
  "flask-conical": FlaskConical,
  "trending-up": TrendingUp,
} as const;

export function Mindset({ dict }: { dict: Dictionary }) {
  const { mindset } = dict;

  return (
    <Section id="approche" tone="white">
      <Reveal>
        <SectionHeading
          sectionId="approche"
          index="06"
          eyebrow={mindset.eyebrow}
          size="md"
          title={
            <>
              {mindset.titleA} <span className="text-steel">{mindset.titleB}</span>
            </>
          }
          description={mindset.description}
        />
      </Reveal>

      <Stagger
        as="ol"
        className="mt-16 grid gap-x-10 gap-y-12 border-t border-line pt-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        stagger={0.08}
      >
        {mindset.principles.map((principle, index) => {
          const Icon = principle.icon
            ? principleIcons[principle.icon as keyof typeof principleIcons]
            : null;
          return (
            <StaggerItem key={principle.title} as="li" className="group flex flex-col gap-4">
              <p
                aria-hidden="true"
                className="label text-steel tabular transition-colors duration-300 group-hover:text-vermilion-deep"
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="flex items-center gap-3 text-xl font-semibold tracking-[-0.02em] lg:text-2xl">
                {Icon && <Icon aria-hidden="true" className="size-6 shrink-0 text-vermilion" />}
                {principle.title}
              </h3>
              <p className="max-w-[40ch] text-base text-pretty text-steel">
                {principle.description}
              </p>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="mt-20 border-t border-line pt-8 lg:mt-24">
        <div className="grid-editorial gap-y-4">
          <p className="label col-span-12 text-steel lg:col-span-3">{mindset.practicesLabel}</p>
          <div className="col-span-12 flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-9">
            {mindset.practices.map((practice) => (
              <span key={practice} className="text-sm font-medium text-ink">
                {practice}
              </span>
            ))}
            {GITHUB_REPO && (
              <a
                href={`https://github.com/${GITHUB_REPO}/actions/workflows/ci.yml`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/ci inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-vermilion-deep"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- external status badge, intentionally unoptimised */}
                <img
                  src={`https://github.com/${GITHUB_REPO}/actions/workflows/ci.yml/badge.svg`}
                  alt={mindset.ciBadgeAlt}
                  height={20}
                  width={90}
                  loading="lazy"
                  className="h-5 w-auto"
                />
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
