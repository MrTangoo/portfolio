import type { YearMonth } from "@/content/profile";

const MONTHS_FR = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
] as const;

const MONTHS_FR_LONG = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
] as const;

export function formatYearMonth({ year, month }: YearMonth, style: "short" | "long" = "short") {
  const months = style === "long" ? MONTHS_FR_LONG : MONTHS_FR;
  const name = months[month - 1];
  if (!name) throw new RangeError(`Invalid month: ${month}`);
  return `${name} ${year}`;
}

/** ISO-like `YYYY-MM` string, used for `<time dateTime>`. */
export function toDateTime({ year, month }: YearMonth) {
  return `${year}-${String(month).padStart(2, "0")}`;
}
