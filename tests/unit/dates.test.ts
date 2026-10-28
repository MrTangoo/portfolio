import { describe, expect, it } from "vitest";
import { formatYearMonth, toDateTime } from "@/lib/dates";

describe("dates", () => {
  it("formats a year/month in short and long French", () => {
    expect(formatYearMonth({ year: 2025, month: 9 })).toBe("sept. 2025");
    expect(formatYearMonth({ year: 2026, month: 2 }, "long")).toBe("février 2026");
  });

  it("throws on an invalid month", () => {
    expect(() => formatYearMonth({ year: 2025, month: 13 })).toThrow(RangeError);
  });

  it("produces machine-readable datetime values", () => {
    expect(toDateTime({ year: 2026, month: 4 })).toBe("2026-04");
  });
});
