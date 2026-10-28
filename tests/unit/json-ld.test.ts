import { describe, expect, it } from "vitest";
import { buildPersonJsonLd } from "@/components/seo/JsonLd";

describe("buildPersonJsonLd", () => {
  const data = buildPersonJsonLd();

  it("describes a schema.org Person", () => {
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Maxime Derbigny");
  });

  it("links to the real social profiles only", () => {
    expect(data.sameAs).toEqual([
      "https://github.com/MrTangoo",
      "https://www.linkedin.com/in/maxime-derbigny",
    ]);
  });

  it("only lists completed education as alumniOf", () => {
    expect(data.alumniOf.map((item) => item.name)).toEqual(["EPSIC"]);
  });
});
