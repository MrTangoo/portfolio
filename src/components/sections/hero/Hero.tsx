import { ArrowDown, Briefcase, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Portrait } from "@/components/ui/Portrait";
import { externalSocials, hero, identity } from "@/content/profile";
import { HeroTitle } from "./HeroTitle";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col justify-end bg-paper pt-28 pb-8 lg:pt-36 lg:pb-10"
    >
      <div className="container-page">
        <div className="grid-editorial gap-y-12">
          <div className="col-span-12 flex flex-col lg:col-span-7 xl:col-span-8">
            <Reveal y={12}>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </Reveal>

            <div className="mt-8 lg:mt-12">
              <HeroTitle lines={hero.title} />
            </div>

            <Reveal delay={0.55} className="mt-10 max-w-[52ch] lg:mt-14">
              <p className="text-lead text-pretty text-steel">{hero.intro}</p>
            </Reveal>

            <Reveal delay={0.7} className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href={hero.primaryCta.href} icon="down">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary" icon="none">
                {hero.secondaryCta.label}
              </ButtonLink>
              <ButtonLink
                href="/cv.pdf"
                variant="ghost"
                icon="download"
                target="_blank"
                rel="noopener noreferrer"
              >
                Télécharger mon CV
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal
            delay={0.35}
            y={32}
            className="col-span-12 lg:col-span-5 lg:col-start-8 lg:self-end xl:col-span-4 xl:col-start-9"
          >
            <div className="relative">
              <Portrait
                source={identity.portrait}
                preload
                focal="68% 28%"
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 80vw, 100vw"
                className="aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-[4/5]"
              />
              <span aria-hidden="true" className="absolute top-0 -left-px h-16 w-px bg-vermilion" />
              <dl className="mt-4 grid grid-cols-2 gap-4 text-meta">
                <div>
                  <dt className="label flex items-center gap-2.5 text-steel">
                    <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                    Basé à
                  </dt>
                  <dd className="mt-1 font-medium">
                    {identity.location.city}, {identity.location.region}
                  </dd>
                </div>
                <div>
                  <dt className="label flex items-center gap-2.5 text-steel">
                    <Briefcase aria-hidden="true" className="size-3.5 shrink-0" />
                    Actuellement
                  </dt>
                  <dd className="mt-1 font-medium">{identity.employer}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.9}
          y={0}
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 lg:mt-20"
        >
          <p className="label text-steel">CFC Informaticien · Brevet fédéral en cours</p>
          <ul className="flex items-center gap-6">
            {externalSocials.map((social) => (
              <li key={social.id}>
                <ExternalLink href={social.href}>{social.label}</ExternalLink>
              </li>
            ))}
          </ul>
          <a
            href="#a-propos"
            className="label group hidden items-center gap-2 text-steel transition-colors hover:text-ink sm:inline-flex"
          >
            Défiler
            <ArrowDown
              aria-hidden="true"
              className="size-3 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
