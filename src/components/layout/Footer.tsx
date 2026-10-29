import { cacheLife } from "next/cache";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Monogram } from "@/components/ui/Monogram";
import { externalSocials, identity } from "@/content/profile";
import type { Dictionary } from "@/i18n";

/**
 * The year is the only time-dependent value on the site. Caching it with a
 * daily lifetime keeps the page fully prerenderable with Cache Components.
 */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page grid-editorial items-start gap-y-8 py-10 lg:py-14">
        <div className="col-span-6 flex flex-col gap-3 lg:col-span-4">
          <Monogram className="text-2xl" />
          <p className="text-sm text-steel">
            {identity.fullName}
            <br />
            {dict.identity.jobTitle}
          </p>
        </div>

        <nav aria-label={dict.footer.externalAriaLabel} className="col-span-6 lg:col-span-4">
          <ul className="flex flex-col gap-2">
            {externalSocials.map((social) => (
              <li key={social.id}>
                <ExternalLink href={social.href} variant="link">
                  {social.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-12 flex flex-col gap-3 text-sm text-steel lg:col-span-4 lg:items-end lg:text-right">
          <a
            href="#main"
            className="group label inline-flex w-fit items-center gap-2.5 border border-line px-3.5 py-2.5 text-steel transition-colors duration-300 ease-out-expo hover:border-ink hover:text-ink"
          >
            {dict.footer.backToTop}
            <ArrowUp
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:text-vermilion"
            />
          </a>
          <p>
            © <CurrentYear /> {identity.fullName}
          </p>
          <Link
            href={`/${dict.locale}/legal`}
            className="label w-fit text-steel transition-colors duration-150 hover:text-ink"
          >
            {dict.footer.legalLabel}
          </Link>
          <p className="label text-steel">Next.js · TypeScript · Tailwind CSS · Vercel</p>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none overflow-hidden select-none">
        <p className="container-page translate-y-[0.16em] bg-gradient-to-b from-ink/25 via-ink/10 to-ink/0 bg-clip-text text-center font-sans text-[clamp(2rem,9vw,8.3rem)] leading-[0.85] font-semibold tracking-[-0.045em] whitespace-nowrap text-transparent">
          {identity.fullName.toUpperCase()}
          <span className="text-vermilion">.</span>
        </p>
      </div>
    </footer>
  );
}
