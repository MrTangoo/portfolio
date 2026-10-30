import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Reveal } from "@/components/motion/Reveal";
import { HeroTitle } from "@/components/sections/hero/HeroTitle";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE_URL } from "@/content/site";
import { getDictionaryFor } from "@/i18n";
import { hasLocale, LOCALES } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/applications">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { applications } = getDictionaryFor(lang);
  const description = `${applications.title.join(" ")} ${applications.description}`;

  return {
    title: applications.label,
    description,
    alternates: {
      canonical: `/${lang}/applications`,
      languages: Object.fromEntries([
        ...LOCALES.map((locale) => [locale, `/${locale}/applications`]),
        ["x-default", "/fr/applications"],
      ]),
    },
    openGraph: {
      type: "website",
      title: applications.label,
      description,
      url: `${SITE_URL}/${lang}/applications`,
    },
    twitter: { card: "summary_large_image", title: applications.label, description },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/applications">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionaryFor(lang);
  const { applications } = dict;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="container-page flex min-h-svh flex-1 items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-20"
      >
        <div className="flex w-full max-w-6xl flex-col items-center text-center">
          <Reveal y={12}>
            <Eyebrow>{applications.label}</Eyebrow>
          </Reveal>
          <div className="mt-8 w-full lg:mt-12">
            <HeroTitle lines={applications.title} />
          </div>
          <Reveal delay={0.6} className="mt-8 max-w-[44ch] lg:mt-10">
            <p className="text-lead text-pretty text-steel">{applications.description}</p>
          </Reveal>
          <Reveal delay={0.7} className="mt-10 flex justify-center lg:mt-12">
            <Image
              src="/decorations/blueprint.svg"
              alt=""
              aria-hidden="true"
              width={240}
              height={180}
              className="pointer-events-none h-auto w-52 select-none sm:w-60 lg:w-72"
            />
          </Reveal>
          <Reveal delay={0.8} className="mt-10 lg:mt-12">
            <Link
              href={`/${lang}`}
              className="group label inline-flex min-h-12 items-center gap-2.5 border border-line px-5 py-3 text-steel transition-colors duration-300 ease-out-expo hover:border-ink hover:text-ink"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5 group-hover:text-vermilion"
              />
              {applications.backHome}
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer dict={dict} />
    </div>
  );
}
