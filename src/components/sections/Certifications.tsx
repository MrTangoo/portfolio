import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/content/profile";
import { formatYearMonth, toDateTime } from "@/lib/dates";

export function Certifications() {
  return (
    <Section id="certifications">
      <Reveal>
        <SectionHeading
          sectionId="certifications"
          index="05"
          eyebrow="Certifications"
          size="md"
          title={
            <>
              Des acquis <span className="text-steel">vérifiés.</span>
            </>
          }
        />
      </Reveal>

      <Stagger as="ol" className="mt-16 border-t border-line lg:mt-20" stagger={0.12}>
        {certifications.map((certification, index) => (
          <StaggerItem key={certification.id} as="li" className="group border-b border-line">
            <article className="grid-editorial items-start gap-y-5 py-8 lg:py-10">
              <p className="label col-span-6 text-steel tabular lg:col-span-2">
                <time dateTime={toDateTime(certification.obtained)}>
                  {formatYearMonth(certification.obtained, "long")}
                </time>
              </p>

              <div className="col-span-12 lg:col-span-6 lg:col-start-4">
                <h3 className="text-display-sm font-semibold tracking-[-0.02em]">
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
                    Vérifier la certification
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                )}
              </div>

              <div className="col-span-6 flex flex-col items-start gap-1 lg:col-span-2 lg:col-start-11 lg:items-end">
                {certification.logo && (
                  <Image
                    src={certification.logo.src}
                    alt={certification.logo.alt}
                    width={certification.logo.width}
                    height={certification.logo.height}
                    sizes="56px"
                    className="logo-mono mb-4 size-12 object-contain lg:size-14"
                  />
                )}
                {certification.score ? (
                  <>
                    <p className="text-display-md font-semibold tracking-[-0.03em] tabular transition-colors duration-300 group-hover:text-vermilion-deep">
                      {certification.score}
                    </p>
                    <p className="label text-steel">Résultat</p>
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
