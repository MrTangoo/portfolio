import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { expertise } from "@/content/profile";

export function Expertise() {
  return (
    <Section id="expertise" tone="ink">
      <Reveal>
        <SectionHeading
          sectionId="expertise"
          index="02"
          eyebrow="Expertise"
          inverse
          title={
            <>
              Quatre domaines, <span className="text-paper/50">une même exigence.</span>
            </>
          }
        />
      </Reveal>

      <Stagger as="ol" className="mt-16 border-t border-line-inverse lg:mt-24" stagger={0.1}>
        {expertise.map((area) => (
          <StaggerItem key={area.id} as="li" className="group border-b border-line-inverse">
            <article className="grid-editorial items-start gap-y-4 py-8 lg:py-12">
              <p
                aria-hidden="true"
                className="label col-span-2 text-paper/65 tabular transition-colors duration-300 group-hover:text-vermilion lg:col-span-1"
              >
                {area.index}
              </p>
              <h3 className="col-span-10 text-display-sm font-semibold lg:col-span-4">
                {area.title}
              </h3>
              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <p className="max-w-[56ch] text-base text-pretty text-paper/70 lg:text-lg">
                  {area.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label="Mots-clés">
                  {area.keywords.map((keyword) => (
                    <li key={keyword} className="label text-paper/65">
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
