import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins truthy class names and ignores falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("flattens nested arrays", () => {
    expect(cn("a", ["b", ["c", false]], "d")).toBe("a b c d");
  });

  it("returns an empty string when nothing is provided", () => {
    expect(cn()).toBe("");
  });
});
