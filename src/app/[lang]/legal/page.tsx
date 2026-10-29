import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { getDictionaryFor } from "@/i18n";
import { hasLocale, LOCALES } from "@/i18n/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/legal">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionaryFor(lang);

  return {
    title: dict.legal.meta.title,
    description: dict.legal.meta.description,
    alternates: {
      canonical: `/${lang}/legal`,
      languages: Object.fromEntries([
        ...LOCALES.map((locale) => [locale, `/${locale}/legal`]),
        ["x-default", "/fr/legal"],
      ]),
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/legal">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionaryFor(lang);
  return <LegalPage dict={dict} />;
}
