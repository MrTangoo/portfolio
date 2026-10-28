"use client";

import { useEffect } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-page flex min-h-svh flex-col justify-between py-8">
      <Monogram className="text-xl" />
      <div>
        <Eyebrow index="500">Une erreur est survenue</Eyebrow>
        <h1 className="mt-8 max-w-[14ch] text-display-lg font-semibold text-balance">
          Quelque chose s&apos;est mal passé<span className="text-vermilion">.</span>
        </h1>
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-flex min-h-12 items-center border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:border-vermilion hover:bg-vermilion"
        >
          Réessayer
        </button>
      </div>
      <p className="label text-steel">Maxime Derbigny</p>
    </main>
  );
}
