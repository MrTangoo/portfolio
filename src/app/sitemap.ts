import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { identity } from "@/content/profile";
import { SITE_URL } from "@/content/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  // `lastModified` reflects the deploy date and refreshes daily at most.
  cacheLife("days");
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [identity.portrait.src, identity.portraitSecondary.src].map(
        (src) => `${SITE_URL}${src}`,
      ),
    },
  ];
}
