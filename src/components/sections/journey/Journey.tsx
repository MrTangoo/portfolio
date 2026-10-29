import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n";
import { getChapters } from "./red-thread/chapters";
import { MobileThread } from "./red-thread/MobileThread";
import { RedThread } from "./red-thread/RedThread";

export function Journey({ dict }: { dict: Dictionary }) {
  const chapters = getChapters(dict);

  return (
    <Section id="parcours" tone="paper-deep">
      <Reveal>
        <SectionHeading
          sectionId="parcours"
          index="04"
          eyebrow={dict.journey.eyebrow}
          title={
            <>
              {dict.journey.titleA} <span className="text-steel">{dict.journey.titleB}</span>
            </>
          }
          description={dict.journey.description}
        />
      </Reveal>

      {/* Desktop — THE RED THREAD: pinned scroll-driven journey.
          key forces a remount on locale change: GSAP's pinned stage and
          scrubbed timeline keep DOM state that must be rebuilt from scratch. */}
      <RedThread
        key={`${dict.locale}-desktop`}
        chapters={chapters}
        threadLabel={dict.journey.redThreadLabel}
        todayLabel={dict.journey.statuses.today}
      />

      {/* Mobile / fallback — same chapters, stacked per year */}
      <MobileThread
        key={`${dict.locale}-mobile`}
        chapters={chapters}
        timelineLabel={dict.journey.timelineLabel}
        todayLabel={dict.journey.statuses.today}
      />
    </Section>
  );
}
