import type { MetadataRoute } from "next";
import { fr } from "@/i18n/dictionaries/fr";
import { SITE_NAME } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: fr.meta.title,
    short_name: SITE_NAME,
    description: fr.meta.description,
    lang: "fr-CH",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F5F4F0",
    theme_color: "#F5F4F0",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
