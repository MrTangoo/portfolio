import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, experiences } from "@/content/profile";
import { RedThread } from "./red-thread/RedThread";
import { Timeline } from "./Timeline";
import { TimelineItem } from "./TimelineItem";

export function Journey() {
  return (
    <Section id="parcours" tone="paper-deep">
      <Reveal>
        <SectionHeading
          sectionId="parcours"
          index="04"
          eyebrow="Parcours"
          title={
            <>
              Un parcours construit <span className="text-steel">étape par étape.</span>
            </>
          }
          description="De l'apprentissage aux CFF à mon poste actuel, en passant par le CFC et le brevet fédéral en préparation."
        />
      </Reveal>

      {/* Desktop — THE RED THREAD: pinned scroll-driven journey */}
      <RedThread />

      {/* Mobile / fallback — classic stacked timeline */}
      <div className="mt-14 lg:hidden">
        <Timeline label="Parcours">
          {experiences.map((experience) => (
            <TimelineItem
              key={experience.id}
              period={experience.period}
              title={experience.role}
              organisation={experience.company}
              location={experience.location}
              logo={experience.logo}
              current={experience.period.end === null}
            >
              <p className="text-base text-pretty text-steel">{experience.summary}</p>
              <ul className="mt-5 grid gap-2 text-base sm:grid-cols-2">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] block h-px w-3 shrink-0 bg-steel-soft"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </TimelineItem>
          ))}
          {education.map((item) => (
            <TimelineItem
              key={item.id}
              period={item.period}
              title={item.degree}
              organisation={item.institution}
              organisationDetail={item.institutionFull}
              logo={item.logo}
              status={item.status === "ongoing" ? "En cours" : "Diplôme obtenu"}
              current={item.status === "ongoing"}
            >
              <p className="text-base text-pretty text-steel">{item.summary}</p>
              {item.topics.length > 0 && (
                <ul
                  className="mt-5 flex flex-wrap gap-x-4 gap-y-2"
                  aria-label="Domaines étudiés"
                >
                  {item.topics.map((topic) => (
                    <li key={topic} className="label text-steel">
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
              {item.note && (
                <p className="mt-5 inline-flex items-center gap-3 border-t border-line pt-4 text-base font-medium">
                  <span aria-hidden="true" className="block size-1.5 bg-vermilion" />
                  {item.note}
                </p>
              )}
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </Section>
  );
}
