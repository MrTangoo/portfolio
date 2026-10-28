import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, experiences } from "@/content/profile";
import { Timeline } from "./Timeline";
import { TimelineItem } from "./TimelineItem";

function GroupTitle({ children }: { children: string }) {
  return (
    <h3 className="label mb-10 flex items-center gap-3 text-steel">
      <span aria-hidden="true" className="block size-2 bg-ink" />
      {children}
    </h3>
  );
}

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

      <div className="mt-16 grid gap-y-20 lg:mt-24 lg:gap-y-28">
        <div className="grid-editorial gap-y-10">
          <div className="col-span-12 lg:col-span-3">
            <Reveal y={8}>
              <GroupTitle>Expérience</GroupTitle>
            </Reveal>
            <Reveal y={8} delay={0.15} className="mt-16 hidden lg:block">
              <Image
                src="/decorations/badge.svg"
                alt=""
                aria-hidden="true"
                width={150}
                height={105}
                className="pointer-events-none select-none"
              />
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <Timeline label="Expériences professionnelles">
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
                  <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
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
            </Timeline>
          </div>
        </div>

        <div className="grid-editorial gap-y-10">
          <div className="col-span-12 lg:col-span-3">
            <Reveal y={8}>
              <GroupTitle>Formation</GroupTitle>
            </Reveal>
            <Reveal y={8} delay={0.15} className="mt-16 hidden lg:block">
              <Image
                src="/decorations/route.svg"
                alt=""
                aria-hidden="true"
                width={180}
                height={108}
                className="pointer-events-none select-none"
              />
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <Timeline label="Formations">
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
                    <p className="mt-5 inline-flex items-center gap-3 border-t border-line pt-4 text-sm font-medium">
                      <span aria-hidden="true" className="block size-1.5 bg-vermilion" />
                      {item.note}
                    </p>
                  )}
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>
      </div>
    </Section>
  );
}
