import { certifications, education, experiences } from "@/content/profile";
import type { Logo, Period } from "@/content/profile";
import { formatYearMonth } from "@/lib/dates";

export type EntryKind = "work" | "education" | "certification";

export interface ChapterEntry {
  title: string;
  org: string;
  period: string;
  detail?: string;
  status?: string;
  badge?: string;
  /** One-sentence editorial description. */
  summary?: string;
  logo?: Logo;
  icon: EntryKind;
}

export interface Chapter {
  id: string;
  index: string;
  year: string;
  /** Chapter name shown in the vermilion eyebrow. */
  kind: string;
  /** Editorial title — the narrative, not the CV data. */
  editorial?: string;
  /** First entry = primary event, the rest render as compact secondaries. */
  entries: readonly ChapterEntry[];
  final?: { label: string; title: string; text: string; sub: string };
}

const sbb = experiences.find((e) => e.id === "sbb")!;
const gri = experiences.find((e) => e.id === "gri")!;
const micro = experiences.find((e) => e.id === "micro")!;
const epsic = education.find((e) => e.id === "epsic")!;
const iseig = education.find((e) => e.id === "iseig")!;
const psm = certifications[0]!;

function range(period: Period): string {
  const start = formatYearMonth(period.start, "long");
  const end = period.end ? formatYearMonth(period.end, "long") : "Aujourd'hui";
  return `${start} — ${end}`;
}

export const CHAPTERS: readonly Chapter[] = [
  {
    id: "2021",
    index: "01",
    year: "2021",
    kind: "Les fondations",
    editorial: "Poser les fondations.",
    entries: [
      {
        icon: "work",
        title: sbb.role,
        org: sbb.company,
        period: range(sbb.period),
        detail: `${sbb.location}, Suisse`,
        summary: sbb.summary,
        logo: sbb.logo,
      },
    ],
  },
  {
    id: "2024",
    index: "02",
    year: "2024",
    kind: "L'évolution",
    editorial: "Consolider la pratique.",
    entries: [
      {
        icon: "work",
        title: gri.role,
        org: gri.company,
        period: range(gri.period),
        detail: `${gri.location}, Suisse`,
        summary: gri.summary,
        logo: gri.logo,
      },
    ],
  },
  {
    id: "2025",
    index: "03",
    year: "2025",
    kind: "Le tournant",
    editorial: "Un nouveau chapitre.",
    entries: [
      {
        icon: "work",
        title: micro.role,
        org: micro.company,
        period: range(micro.period),
        detail: `${micro.location}, Suisse`,
        status: "Poste actuel",
        summary:
          "Développement et évolution d'applications métier, du frontend aux bases de données SQL.",
        logo: micro.logo,
      },
      {
        icon: "education",
        title: epsic.degree,
        org: epsic.institution,
        period: formatYearMonth(epsic.period.end!, "long"),
        detail: `${epsic.location}, Suisse`,
        status: "Diplôme obtenu",
        logo: epsic.logo,
      },
    ],
  },
  {
    id: "2026",
    index: "04",
    year: "2026",
    kind: "Élargir les perspectives",
    editorial: "Élargir les perspectives.",
    entries: [
      {
        icon: "education",
        title: iseig.degree,
        org: iseig.institution,
        period: range(iseig.period),
        detail: `${iseig.location}, Suisse`,
        status: "En cours",
        summary:
          "Formation orientée gestion de projet, analyse des exigences et compréhension des besoins métier.",
        logo: iseig.logo,
      },
      {
        icon: "certification",
        title: psm.name,
        org: psm.issuer,
        period: formatYearMonth(psm.obtained, "long"),
        logo: psm.logo,
      },
    ],
  },
  {
    id: "final",
    index: "05",
    year: "",
    kind: "Next chapter",
    entries: [],
    final: {
      label: "NEXT CHAPTER_",
      title: "La suite reste à écrire...",
      text: "Continuer à apprendre. Construire avec exigence. Évoluer.",
      sub: "Aujourd'hui, je poursuis mon évolution dans le développement logiciel, avec un intérêt croissant pour l'architecture, la qualité et les responsabilités techniques.",
    },
  },
];
