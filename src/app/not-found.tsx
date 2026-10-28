import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-svh flex-col justify-between py-8">
      <Monogram className="text-xl" />
      <div>
        <Eyebrow index="404">Page introuvable</Eyebrow>
        <h1 className="mt-8 max-w-[14ch] text-display-lg font-semibold text-balance">
          Cette page n&apos;existe pas<span className="text-vermilion">.</span>
        </h1>
        <p className="mt-6 max-w-[48ch] text-lead text-steel">
          Le lien est peut-être erroné ou la page a été déplacée.
        </p>
        <div className="mt-10">
          <ButtonLink href="/" icon="none">
            Retour à l&apos;accueil
          </ButtonLink>
        </div>
      </div>
      <p className="label text-steel">Maxime Derbigny</p>
    </main>
  );
}
