import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Monogram } from "@/components/ui/Monogram";
import { getDictionaryFor, type Dictionary } from "@/i18n";
import { fr } from "@/i18n/dictionaries/fr";
import { matchLocale } from "@/i18n/locales";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 - Maxime Derbigny",
  robots: { index: false },
};

function NotFoundContent({ dict }: { dict: Dictionary }) {
  const { notFound } = dict.errors;
  return (
    <main className="container-page flex min-h-svh flex-col justify-between py-8">
      <Monogram className="text-xl" />
      <div>
        <p className="label text-vermilion-deep">404 - {notFound.title}</p>
        <h1 className="mt-8 max-w-[14ch] text-display-lg font-semibold text-balance">
          {notFound.heading}
          <span className="text-vermilion">.</span>
        </h1>
        <p className="mt-6 max-w-[48ch] text-lead text-steel">{notFound.body}</p>
        <div className="mt-10">
          <a
            href={`/${dict.locale}`}
            className="inline-flex min-h-12 items-center border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:border-vermilion hover:bg-vermilion"
          >
            {notFound.cta}
          </a>
        </div>
      </div>
      <p className="label text-steel">Maxime Derbigny</p>
    </main>
  );
}

/** Picks the visitor's preferred language — request-time, inside Suspense. */
async function LocalizedNotFound() {
  const headerList = await headers();
  return (
    <NotFoundContent dict={getDictionaryFor(matchLocale(headerList.get("accept-language")))} />
  );
}

/**
 * Fallback for URLs that match no route at all (the root layout lives under
 * `app/[lang]`). Detects the preferred language from Accept-Language.
 */
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body>
        <Suspense fallback={<NotFoundContent dict={fr} />}>
          <LocalizedNotFound />
        </Suspense>
      </body>
    </html>
  );
}
