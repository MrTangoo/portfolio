import type { MetadataRoute } from "next";
import { fr } from "@/i18n/dictionaries/fr";
import { LOCALES } from "@/i18n/locales";
import { SITE_URL } from "@/content/site";

const IMAGES = [fr.identity.portrait.src, fr.identity.portraitSecondary.src].map(
  (src) => `${SITE_URL}${src}`,
);

const languagesFor = (path: string) =>
  Object.fromEntries([
    ...LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
    ["x-default", `${SITE_URL}/fr${path}`],
  ]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "monthly" as const,
      priority: 1,
      images: IMAGES,
      alternates: { languages: languagesFor("") },
    })),
    ...LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/applications`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: languagesFor("/applications") },
    })),
    ...LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/legal`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: languagesFor("/legal") },
    })),
  ];
}
