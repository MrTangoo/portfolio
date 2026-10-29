import Image from "next/image";
import { ArrowUpRight, Award, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Portrait } from "@/components/ui/Portrait";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n";

const factIcons = {
  "map-pin": MapPin,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  award: Award,
} as const;

export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;

  return (
    <Section id="a-propos">
      <div className="grid-editorial gap-y-12">
        <div className="col-span-12 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <div>
            <Reveal y={12}>
              <Eyebrow index="01">{about.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="a-propos-title"
                className="mt-8 max-w-[14ch] text-display-md font-semibold text-balance"
              >
                {about.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-12">
              <div className="relative">
                <Portrait
                  source={dict.identity.portraitSecondary}
                  focal="50% 35%"
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="aspect-[6/5] w-full"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-px h-16 w-px bg-vermilion"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <Stagger className="flex flex-col gap-6 text-lead text-pretty" stagger={0.1}>
            {about.paragraphs.map((paragraph, index) => (
              <StaggerItem key={paragraph}>
                <p className={index === 0 ? "text-ink" : "text-steel"}>{paragraph}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-14">
            <dl className="divide-y divide-line border-y border-line">
              {about.facts.map((fact) => {
                const Icon = factIcons[fact.icon as keyof typeof factIcons];
                return (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 py-4 sm:grid-cols-[minmax(0,12rem)_1fr]"
                  >
                    <dt className="label flex items-center gap-2.5 pt-1 text-steel">
                      <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                      {fact.label}
                    </dt>
                    <dd className="text-sm font-medium sm:text-base">
                      {"href" in fact && fact.href ? (
                        <a
                          href={fact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 transition-colors hover:text-vermilion-deep hover:decoration-vermilion"
                        >
                          {fact.value}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      ) : (
                        fact.value
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <p className="label text-steel">{about.languagesLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              {dict.languages.map((language) => (
                <li key={language.name} className="flex items-baseline gap-2">
                  {language.flag && (
                    <Image
                      src={language.flag}
                      alt=""
                      aria-hidden="true"
                      width={18}
                      height={12}
                      className="self-center border border-line"
                    />
                  )}
                  <span className="font-medium">{language.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
