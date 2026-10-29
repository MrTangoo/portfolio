interface LegalSectionProps {
  /** Two-digit index, e.g. "01". */
  index: string;
  title: string;
  paragraphs: readonly string[];
  /** Optional trailing note, e.g. the conditional CI-badge disclosure. */
  note?: string;
}

/** One numbered block of the legal page — editorial split, index left. */
export function LegalSection({ index, title, paragraphs, note }: LegalSectionProps) {
  return (
    <section className="grid-editorial gap-y-5 border-t border-line pt-8 lg:pt-10">
      <div className="col-span-12 lg:col-span-3">
        <p className="label text-steel tabular">{index}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] lg:text-2xl">{title}</h2>
      </div>
      <div className="col-span-12 flex max-w-[65ch] flex-col gap-4 lg:col-span-9">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-base text-pretty text-steel">
            {paragraph}
          </p>
        ))}
        {note && <p className="text-base text-pretty text-steel">{note}</p>}
      </div>
    </section>
  );
}
