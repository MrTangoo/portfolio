import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n";
import { StackExplorer } from "./StackExplorer";

export function Stack({ dict }: { dict: Dictionary }) {
  const { stack } = dict;

  return (
    <Section id="stack">
      <Reveal>
        <SectionHeading
          sectionId="stack"
          index="03"
          eyebrow={stack.eyebrow}
          title={
            <>
              {stack.titleA} <span className="text-steel">{stack.titleB}</span>
            </>
          }
          description={stack.description}
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-16 lg:mt-24">
        <StackExplorer categories={stack.categories} />
      </Reveal>

      <Reveal className="mt-20 lg:mt-28">
        <aside
          aria-labelledby="favorite-stack-title"
          className="grid-editorial items-center gap-y-6 border-l-2 border-vermilion py-2 pl-6 lg:pl-10"
        >
          <div className="col-span-12 lg:col-span-4">
            <p className="label text-steel">{stack.favoriteLabel}</p>
            <h3
              id="favorite-stack-title"
              className="mt-3 text-display-sm font-semibold tracking-[-0.02em]"
            >
              {stack.favoriteStack.title}
            </h3>
          </div>
          <p className="col-span-12 max-w-[56ch] text-base text-pretty text-steel lg:col-span-6 lg:text-lg">
            {stack.favoriteStack.description}
          </p>
          <Image
            src="/decorations/browser.svg"
            alt=""
            aria-hidden="true"
            width={140}
            height={98}
            className="pointer-events-none col-span-2 hidden justify-self-end select-none lg:block"
          />
        </aside>
      </Reveal>

      <Reveal className="mt-20 border-t border-line pt-8 lg:mt-24">
        <div className="grid-editorial gap-y-4">
          <p className="label col-span-12 text-steel lg:col-span-3">{stack.softSkillsLabel}</p>
          <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-3 lg:col-span-9">
            {stack.softSkills.map((skill) => (
              <li key={skill} className="text-sm font-medium">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
