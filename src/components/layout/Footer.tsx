import { cacheLife } from "next/cache";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Monogram } from "@/components/ui/Monogram";
import { externalSocials, identity } from "@/content/profile";

/**
 * The year is the only time-dependent value on the site. Caching it with a
 * daily lifetime keeps the page fully prerenderable with Cache Components.
 */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page grid-editorial items-start gap-y-8 py-10 lg:py-14">
        <div className="col-span-6 flex flex-col gap-3 lg:col-span-4">
          <Monogram className="text-2xl" />
          <p className="text-sm text-steel">
            {identity.fullName}
            <br />
            {identity.jobTitle}
          </p>
        </div>

        <nav aria-label="Liens externes" className="col-span-6 lg:col-span-4">
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

        <div className="col-span-12 flex flex-col gap-2 text-sm text-steel lg:col-span-4 lg:text-right">
          <p>
            © <CurrentYear /> {identity.fullName}
          </p>
          <p className="label text-steel">Next.js · TypeScript · Tailwind CSS · Vercel</p>
        </div>
      </div>
    </footer>
  );
}
