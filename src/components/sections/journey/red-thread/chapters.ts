import type { Dictionary } from "@/i18n";
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

/** Assembles the Red Thread chapters for the active locale. */
export function getChapters(dict: Dictionary): readonly Chapter[] {
  const { experiences, education, certifications, journey } = dict;

  const sbb = experiences.find((e) => e.id === "sbb")!;
  const gri = experiences.find((e) => e.id === "gri")!;
  const micro = experiences.find((e) => e.id === "micro")!;
  const epsic = education.find((e) => e.id === "epsic")!;
  const iseig = education.find((e) => e.id === "iseig")!;
  const psm = certifications.items[0]!;

  const range = (period: Period): string => {
    const start = formatYearMonth(period.start, "long", dict.locale);
    const end = period.end
      ? formatYearMonth(period.end, "long", dict.locale)
      : journey.statuses.today;
    return `${start} — ${end}`;
  };

  const detail = (location: string) => `${location}, ${dict.identity.location.country}`;

  const narratives = new Map(journey.chapters.map((chapter) => [chapter.id, chapter]));
  const narrative = (id: string) => narratives.get(id)!;

  return [
    {
      id: "2021",
      index: narrative("2021").index,
      year: "2021",
      kind: narrative("2021").kind,
      editorial: narrative("2021").editorial,
      entries: [
        {
          icon: "work",
          title: sbb.role,
          org: sbb.company,
          period: range(sbb.period),
          detail: detail(sbb.location),
          summary: sbb.summary,
          logo: sbb.logo,
        },
      ],
    },
    {
      id: "2024",
      index: narrative("2024").index,
      year: "2024",
      kind: narrative("2024").kind,
      editorial: narrative("2024").editorial,
      entries: [
        {
          icon: "work",
          title: gri.role,
          org: gri.company,
          period: range(gri.period),
          detail: detail(gri.location),
          summary: gri.summary,
          logo: gri.logo,
        },
      ],
    },
    {
      id: "2025",
      index: narrative("2025").index,
      year: "2025",
      kind: narrative("2025").kind,
      editorial: narrative("2025").editorial,
      entries: [
        {
          icon: "work",
          title: micro.role,
          org: micro.company,
          period: range(micro.period),
          detail: detail(micro.location),
          status: journey.statuses.current,
          summary: journey.chapterSummaries.micro,
          logo: micro.logo,
        },
        {
          icon: "education",
          title: epsic.degree,
          org: epsic.institution,
          period: formatYearMonth(epsic.period.end!, "long", dict.locale),
          detail: detail(epsic.location),
          status: journey.statuses.completed,
          logo: epsic.logo,
        },
      ],
    },
    {
      id: "2026",
      index: narrative("2026").index,
      year: "2026",
      kind: narrative("2026").kind,
      editorial: narrative("2026").editorial,
      entries: [
        {
          icon: "education",
          title: iseig.degree,
          org: iseig.institution,
          period: range(iseig.period),
          detail: detail(iseig.location),
          status: journey.statuses.ongoing,
          summary: journey.chapterSummaries.iseig,
          logo: iseig.logo,
        },
        {
          icon: "certification",
          title: psm.name,
          org: psm.issuer,
          period: formatYearMonth(psm.obtained, "long", dict.locale),
          logo: psm.logo,
        },
      ],
    },
    {
      id: "final",
      index: narrative("final").index,
      year: "",
      kind: narrative("final").kind,
      entries: [],
      final: journey.final,
    },
  ];
}
