import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n";
import { formatYearMonth, toDateTime } from "@/lib/dates";

export function Certifications({ dict }: { dict: Dictionary }) {
  const { certifications } = dict;

  return (
    <Section id="certifications">
      <Reveal>
        <SectionHeading
          sectionId="certifications"
          index="05"
          eyebrow={certifications.eyebrow}
          size="md"
          title={
            <>
              {certifications.titleA} <span className="text-steel">{certifications.titleB}</span>
            </>
          }
        />
      </Reveal>

      <Stagger as="ol" className="mt-16 border-t border-line lg:mt-20" stagger={0.12}>
        {certifications.items.map((certification, index) => (
          <StaggerItem key={certification.id} as="li" className="group border-b border-line">
            <article className="grid-editorial items-start gap-y-5 py-8 lg:py-10">
              {certification.logo && (
                <Image
                  src={certification.logo.src}
                  alt={certification.logo.alt}
                  width={certification.logo.width}
                  height={certification.logo.height}
                  sizes="112px"
                  className="col-span-3 mt-1 size-20 object-contain sm:col-span-2 sm:size-24 lg:size-28"
                />
              )}

              <div className="col-span-9 lg:col-span-7 lg:col-start-4">
                <p className="label text-steel tabular">
                  <time dateTime={toDateTime(certification.obtained)}>
                    {formatYearMonth(certification.obtained, "long", dict.locale)}
                  </time>
                </p>
                <h3 className="mt-3 text-display-sm font-semibold tracking-[-0.02em]">
                  {certification.name}
                  {certification.shortName && (
                    <span className="ml-3 align-middle font-mono text-sm font-medium tracking-[0.08em] text-steel uppercase">
                      {certification.shortName}
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-sm font-medium text-steel">{certification.issuer}</p>
                <p className="mt-4 max-w-[56ch] text-base text-pretty text-steel">
                  {certification.description}
                </p>
                {certification.verificationUrl && (
                  <a
                    href={certification.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-reveal mt-5 inline-flex items-center gap-1 text-sm font-medium"
                  >
                    {certifications.verifyLabel}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                )}
              </div>

              <div className="col-span-9 col-start-4 flex flex-col gap-1 lg:col-span-2 lg:col-start-11 lg:items-end">
                {certification.score ? (
                  <>
                    <p className="text-display-md font-semibold tracking-[-0.03em] tabular transition-colors duration-300 group-hover:text-vermilion-deep">
                      {certification.score}
                    </p>
                    <p className="label text-steel">{certifications.resultLabel}</p>
                  </>
                ) : (
                  <p aria-hidden="true" className="label text-steel tabular">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                )}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.15} className="mt-14 flex justify-end lg:mt-16">
        <Image
          src="/decorations/seal.svg"
          alt=""
          aria-hidden="true"
          width={150}
          height={131}
          className="pointer-events-none select-none"
        />
      </Reveal>
    </Section>
  );
}
