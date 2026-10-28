import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { contact, externalSocials, identity } from "@/content/profile";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

export function Contact() {
  const [title, period] = contact.title.endsWith(".")
    ? [contact.title.slice(0, -1), "."]
    : [contact.title, ""];

  return (
    <Section
      id="contact"
      tone="ink"
      className="min-h-[80svh] lg:flex lg:flex-col lg:justify-center"
    >
      <Reveal y={12}>
        <Eyebrow index="07" inverse>
          {contact.eyebrow}
        </Eyebrow>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 lg:mt-14">
        <h2 id="contact-title" className="text-display-xl font-semibold text-balance">
          {title}
          {period && <span className="text-vermilion">{period}</span>}
        </h2>
      </Reveal>

      <div className="mt-14 grid-editorial gap-y-12 lg:mt-20">
        <Reveal delay={0.2} className="col-span-12 lg:col-span-5">
          <p className="max-w-[44ch] text-lead text-pretty text-paper/70">{contact.description}</p>
          <Image
            src="/decorations/crane.svg"
            alt=""
            aria-hidden="true"
            width={160}
            height={140}
            className="pointer-events-none mt-16 hidden select-none lg:block"
          />
        </Reveal>

        <Reveal delay={0.3} className="col-span-12 lg:col-span-6 lg:col-start-7">
          <a
            href={`mailto:${identity.email}`}
            className="group inline-flex max-w-full flex-wrap items-baseline gap-x-3 text-display-sm font-semibold tracking-[-0.02em] break-all transition-colors duration-300 hover:text-vermilion sm:break-normal"
          >
            <span className="link-underline">{identity.email}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-6 shrink-0 self-center transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

          <ul className="mt-10 divide-y divide-line-inverse border-y border-line-inverse">
            {externalSocials.map((social) => {
              const Icon = socialIcons[social.id as keyof typeof socialIcons];
              return (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:text-vermilion"
                >
                  <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <span className="flex items-center gap-3">
                      {Icon && (
                        <Icon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-paper/70 transition-colors duration-300 group-hover:text-vermilion"
                        />
                      )}
                      <span className="text-lg font-semibold">{social.label}</span>
                    </span>
                    <span className="font-mono text-sm text-paper/65 group-hover:text-paper/85">
                      {social.display}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </li>
              );
            })}
            <li>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:text-vermilion"
              >
                <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="flex items-center gap-3">
                    <FileText
                      aria-hidden="true"
                      className="size-5 shrink-0 text-paper/70 transition-colors duration-300 group-hover:text-vermilion"
                    />
                    <span className="text-lg font-semibold">CV</span>
                  </span>
                  <span className="font-mono text-sm text-paper/65 group-hover:text-paper/85">
                    Télécharger le PDF
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
