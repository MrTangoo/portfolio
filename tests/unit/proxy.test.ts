// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "@/proxy";

const request = (path: string, acceptLanguage?: string) =>
  new NextRequest(`https://maxime-derbigny.ch${path}`, {
    headers: acceptLanguage ? { "accept-language": acceptLanguage } : {},
  });

describe("proxy", () => {
  it("redirects unprefixed paths to the default locale with a single hop", () => {
    const response = proxy(request("/applications"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://maxime-derbigny.ch/fr/applications");
    expect(response.headers.get("vary")).toBe("Accept-Language");
  });

  it("follows Accept-Language", () => {
    const response = proxy(request("/", "de-CH,de;q=0.9"));
    expect(response.headers.get("location")).toBe("https://maxime-derbigny.ch/de");
  });

  it("lets locale-prefixed paths through", () => {
    const response = proxy(request("/fr/applications"));
    expect(response.headers.get("location")).toBeNull();
    expect(response.status).toBe(200);
  });
});
