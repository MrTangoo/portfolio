"use client";

import { useEffect } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { useDictionary } from "@/i18n/provider";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dict = useDictionary();
  const { error: strings } = dict.errors;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-page flex min-h-svh flex-col justify-between py-8">
      <Monogram className="text-xl" />
      <div>
        <Eyebrow index="500">{strings.eyebrow}</Eyebrow>
        <h1 className="mt-8 max-w-[14ch] text-display-lg font-semibold text-balance">
          {strings.heading}
          <span className="text-vermilion">.</span>
        </h1>
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-flex min-h-12 items-center border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:border-vermilion hover:bg-vermilion"
        >
          {strings.retry}
        </button>
      </div>
      <p className="label text-steel">Maxime Derbigny</p>
    </main>
  );
}
