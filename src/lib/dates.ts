import type { YearMonth } from "@/content/profile";
import type { Locale } from "@/i18n/locales";

const MONTHS: Record<Locale, { short: readonly string[]; long: readonly string[] }> = {
  fr: {
    short: [
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
    ],
    long: [
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
    ],
  },
  en: {
    short: [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ],
    long: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  de: {
    short: [
      "Jan.",
      "Feb.",
      "März",
      "Apr.",
      "Mai",
      "Juni",
      "Juli",
      "Aug.",
      "Sept.",
      "Okt.",
      "Nov.",
      "Dez.",
    ],
    long: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
  },
};

export function formatYearMonth(
  { year, month }: YearMonth,
  style: "short" | "long" = "short",
  locale: Locale = "fr",
) {
  const months = MONTHS[locale][style];
  const name = months[month - 1];
  if (!name) throw new RangeError(`Invalid month: ${month}`);
  return `${name} ${year}`;
}

/** ISO-like `YYYY-MM` string, used for `<time dateTime>`. */
export function toDateTime({ year, month }: YearMonth) {
  return `${year}-${String(month).padStart(2, "0")}`;
}
