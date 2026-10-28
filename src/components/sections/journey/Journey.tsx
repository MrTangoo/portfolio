import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MobileThread } from "./red-thread/MobileThread";
import { RedThread } from "./red-thread/RedThread";

export function Journey() {
  return (
    <Section id="parcours" tone="paper-deep">
      <Reveal>
        <SectionHeading
          sectionId="parcours"
          index="04"
          eyebrow="Parcours"
          title={
            <>
              Un parcours construit <span className="text-steel">étape par étape.</span>
            </>
          }
          description="De l'apprentissage aux CFF à mon poste actuel, en passant par le CFC et le brevet fédéral en préparation."
        />
      </Reveal>

      {/* Desktop — THE RED THREAD: pinned scroll-driven journey */}
      <RedThread />

      {/* Mobile / fallback — same chapters, stacked per year */}
      <MobileThread />
    </Section>
  );
}
