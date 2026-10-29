import type { Metadata } from "next";
import { headers } from "next/headers";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { getDictionaryFor } from "@/i18n";
import { matchLocale } from "@/i18n/locales";

export const metadata: Metadata = {
  title: "Page introuvable — Page not found",
  robots: { index: false },
};

export default async function NotFound() {
  const headerList = await headers();
  const dict = getDictionaryFor(matchLocale(headerList.get("accept-language")));
  const { notFound } = dict.errors;

  return (
    <main id="main" className="container-page flex min-h-svh flex-col justify-between py-8">
      <Monogram className="text-xl" />
      <div>
        <Eyebrow index="404">{notFound.title}</Eyebrow>
        <h1 className="mt-8 max-w-[14ch] text-display-lg font-semibold text-balance">
          {notFound.heading}
          <span className="text-vermilion">.</span>
        </h1>
        <p className="mt-6 max-w-[48ch] text-lead text-steel">{notFound.body}</p>
        <div className="mt-10">
          <ButtonLink href={`/${dict.locale}`} icon="none">
            {notFound.cta}
          </ButtonLink>
        </div>
      </div>
      <p className="label text-steel">Maxime Derbigny</p>
    </main>
  );
}
