import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LegalSection } from "@/components/legal/LegalSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { GITHUB_REPO } from "@/content/site";
import type { Dictionary } from "@/i18n";

const arrowClasses =
  "size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5 group-hover:text-vermilion";

/**
 * Combined legal page: site owner, hosting, personal data, cookies,
 * external resources and intellectual property — fully dictionary-driven.
 */
export function LegalPage({ dict }: { dict: Dictionary }) {
  const { legal } = dict;
  const homeHref = `/${dict.locale}`;

  // Single root element: the router scroll-focuses every top-level child of
  // the page on navigation — a fragment would make it target the footer.
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main id="main" tabIndex={-1} className="flex-1">
        <Section id="legal" tone="white" className="pt-28 lg:pt-36">
          <Link
            href={homeHref}
            className="group label inline-flex w-fit items-center gap-2.5 text-steel transition-colors duration-300 ease-out-expo hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className={arrowClasses} />
            {legal.backHome}
          </Link>

          <Reveal y={12} className="mt-12">
            <Eyebrow>{legal.eyebrow}</Eyebrow>
            <h1
              id="legal-title"
              className="mt-10 text-display-lg font-semibold text-balance lg:mt-14"
            >
              {legal.title}
            </h1>
            <p className="mt-8 max-w-[52ch] text-lead text-pretty text-steel">{legal.intro}</p>
            <p className="label mt-10 text-steel">{legal.updatedLabel}</p>
          </Reveal>

          <div className="mt-14 flex flex-col gap-12 lg:mt-20 lg:gap-16">
            {legal.sections.map((section, index) => (
              <Reveal key={section.id} y={12}>
                <LegalSection
                  index={String(index + 1).padStart(2, "0")}
                  title={section.title}
                  paragraphs={section.paragraphs}
                  note={section.id === "external" && GITHUB_REPO ? legal.badgeNote : undefined}
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex justify-center border-t border-line pt-8 lg:mt-20 lg:pt-10">
            <Link
              href={homeHref}
              className="group label inline-flex w-fit items-center gap-2.5 border border-line px-3.5 py-2.5 text-steel transition-colors duration-300 ease-out-expo hover:border-ink hover:text-ink"
            >
              <ArrowLeft aria-hidden="true" className={arrowClasses} />
              {legal.backHome}
            </Link>
          </div>
        </Section>
      </main>
      <Footer dict={dict} />
    </div>
  );
}
